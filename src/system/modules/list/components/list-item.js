import React from 'react';
import R from 'ramda';

const renderChild = (state) => {
    return React.cloneElement(R.head(React.Children.toArray(state.children)), { id: `${state.rootId}Item${state.index}`, key: state.index, rootId: state.rootId });
}

const ListItem = (state) => {
	return <div className={` ${state.className}`}>{renderChild(state)}</div>
};

export default ListItem;
