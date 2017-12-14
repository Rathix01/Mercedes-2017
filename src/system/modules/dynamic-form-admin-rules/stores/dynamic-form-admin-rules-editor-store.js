import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const testKeywords = Bacon.once({ items: [ { value: "page1" }, { value: "page2" }, { value: "page3" } ] });

const toItemToEdit = (state) => state.component === "DynamicFormAdminItemToEdit" && state.componentEvent === "component-update";
const toKeywordValues = (state) => R.map((k) => ({ value: k }), state.keywords || [])

const itemToEditAction = Actions.filter(toItemToEdit);
const toKeywordsForList = (state) => ({ items: state });

testKeywords.onValue(publish("KeywordsForForm"))
itemToEditAction.map(toKeywordValues).map(toKeywordsForList).onValue(publish("KeywordsForEditItem"));

