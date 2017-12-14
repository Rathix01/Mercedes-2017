import React from 'react';
import R from 'ramda';

const ListItem = (state) => {
	return React.cloneElement(R.head(React.Children.toArray(state.children)), 
	{ id: `${state.rootId}Item${state.index}`, key: state.index, rootId: state.rootId, className: state.className });
}

export default ListItem;
