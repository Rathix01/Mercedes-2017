import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const toUpdateListenerActions = (state) => state.component === "DynamicFormAdminSingleItemUpdateListener" && state.componentEvent === "component-update";
const isDelete = R.curry((shouldBe, state) => (state.delete === true) === shouldBe); 
const hasUpdate = (state) => state.nextUpdate !== undefined;
const toNextUpdate = (state) => R.merge(state.nextUpdate, { page: state.page })

const singleItemUpdate = Actions.filter(toUpdateListenerActions).filter(isDelete(false)).filter(hasUpdate).map(toNextUpdate)
const singleItemDelete = Actions.filter(toUpdateListenerActions).filter(isDelete(true));

module.exports = {
	singleItemUpdate, singleItemDelete
};
