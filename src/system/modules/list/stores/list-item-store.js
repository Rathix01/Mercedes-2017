import Bacon from 'baconjs';
import R from 'ramda';
import ListWithIndex from './list-index-store';

const itemHasChildren = (item) => item.children && item.children.length > 0;
const concatChildren = (item) => R.concat([item], R.map(toFlattened, item.children));
const toFlattened = (item) => itemHasChildren(item) ? R.flatten(concatChildren(item)) : item;
const toFlattendItemList = (listState) => R.flatten(R.map(toFlattened, listState.items));
const includeKey = R.curry((listState, item) => R.merge(item, { key: listState.id }));
const flattenWithKeys = (listState) => R.map( includeKey( listState ), toFlattendItemList(listState) );
const mergeFlattenedList = (listState, flattenedList) => R.merge( listState, { items:flattenedList, itemTree: listState.items });
const isUnderScoreChar = (string) => string === '_';
const getDepth = (state) => R.filter(isUnderScoreChar, state.index.split('')).length;
const toItemDepth = (state) => R.merge(state, { depth: getDepth(state) });
const toItemDepths = (state) => R.merge(state, { items: R.map(toItemDepth, state.items) });
const removeChildReferences = R.map( R.omit("children") )

const flattenedList = ListWithIndex.map(flattenWithKeys).map(removeChildReferences);
const individualItems = flattenedList.flatMap(Bacon.fromArray);
const items = Bacon.when([ListWithIndex.toProperty(), flattenedList], mergeFlattenedList).map(toItemDepths);

module.exports = {
  items, individualItems
};
