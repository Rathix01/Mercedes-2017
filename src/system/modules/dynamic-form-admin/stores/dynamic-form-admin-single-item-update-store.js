import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const toUpdateListenerActions = (state) => state.component === "DynamicFormAdminSingleItemUpdateListener" && state.componentEvent === "component-update";
const isDelete = R.curry((shouldBe, state) => (state.delete === true) === shouldBe);
const isRuleUpdate = (state) => state.isRuleUpdate === true;
const hasUpdate = (state) => state.nextUpdate !== undefined;
const toNextUpdate = (state) => R.merge(state.nextUpdate, { page: state.page })

const singleItemInputUpdate = Actions.filter(toUpdateListenerActions).filter(isDelete(false)).filter(hasUpdate).map(toNextUpdate)
const singleItemDelete = Actions.filter(toUpdateListenerActions).filter(isDelete(true));
const singleItemRuleUpdate = Actions.filter(toUpdateListenerActions)
									.filter(R.prop("isRuleUpdate"))
									.map((state) => ({ ...state.ruleValues, ...state.componentState }));

const singleItemUpdate = singleItemRuleUpdate.merge(singleItemInputUpdate);

module.exports = {
	singleItemUpdate, singleItemDelete
};
