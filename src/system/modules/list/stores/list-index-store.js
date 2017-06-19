import R from 'ramda';
import Actions from '../../../../actions/actions';

const mapIndexed = R.addIndex(R.map);
const toIndexValue = (parentIdx, idx) => parentIdx !== -1 ? (parentIdx + "_" + idx) : idx.toString();
const toIndexedItem = R.curry((parentIdx, item, idx) => R.merge(item, { index: toIndexValue(parentIdx, idx), children: toIndexedItems(item.children, toIndexValue(parentIdx, idx)) }));
const toIndexedItems = (items, i) => mapIndexed(toIndexedItem(i), items || []);
const includeIndexes = (listState) => R.merge( listState, { items: toIndexedItems(listState.items, -1), indexed: true });
const toLists = (state) => state.component === "ListContainer" && state.items !== undefined;

const listWithIndex = Actions.filter(toLists).map(includeIndexes);

export default listWithIndex
