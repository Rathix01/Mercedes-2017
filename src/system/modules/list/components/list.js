import React from 'react';
import R from 'ramda';
import read from '../../../components/read-and-write-state';
import ListItem from './list-item';
import { getClassName } from '../../../stores/component-helper-store';

const toListItem = R.curry(( listState, listItemState, i) => {
    return <ListItem
      key={`list-item-${listItemState.index || i}`}
      index={listItemState.index || i}
      rootId={listState.id}
      id={`${listState.id}Row${i}`}
      className={listState.itemClass}
    >
      {listState.children}
    </ListItem>
});

const mapIndexed = R.addIndex(R.map);
const toItems = (state) => state.items !== undefined ? mapIndexed(toListItem( state ), state.items) : "";
const List = (state) => (<div className={`list ${getClassName(state)}`}> { toItems(state) } </div>);

export default read(List);
