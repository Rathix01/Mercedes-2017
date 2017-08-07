import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const toUpdateListenerActions = (state) => state.component === "DynamicFormAdminSingleItemUpdateListener" && state.componentEvent === "component-update";
const isDelete = R.curry((shouldBe, state) => (state.delete === true) === shouldBe); 
const hasUpdate = (state) => state.nextUpdate !== undefined;

const singleItemUpdate = Actions.filter(toUpdateListenerActions).filter(isDelete(false)).filter(hasUpdate).map(R.prop("nextUpdate"))
const singleItemDelete = Actions.filter(toUpdateListenerActions).filter(isDelete(true));

module.exports = {
	singleItemUpdate, singleItemDelete
};
