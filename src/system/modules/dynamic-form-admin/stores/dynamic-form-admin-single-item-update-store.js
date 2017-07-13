import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const toUpdateListenerActions = (state) => state.component === "DynamicFormAdminSingleItemUpdateListener" && state.componentEvent === "component-update";
const singleItemUpdate = Actions.filter(toUpdateListenerActions).map(R.prop("nextUpdate"));

//singleItemUpdate.log('wingl')

module.exports = {
	singleItemUpdate
};
