import R from 'ramda';
import publish from '../../../stores/state-store';
import ListItemStore from './list-item-store';

const publishToListComponent = (state) => publish(state.id + "List", R.omit("version", state));
const publishToItem = (state) => publish((state.key + 'ListItem' + state.index), state);
const publishToVisible = (state) => publish((state.key + 'ListAnimation' + state.index), { opacity: 1 });

ListItemStore.items.onValue(publishToListComponent);

const item = ListItemStore.individualItems;
item.onValue(publishToItem);
item.onValue(publishToVisible);

module.exports = {
  item
};
