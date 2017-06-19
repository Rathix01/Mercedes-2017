import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

import form1 from './example-form-1';
import form2 from './example-form-2';

const isFormOptionUpdate = (state) => state.id === "DataFormName"
const isDataUpdate = (state) => state.component === "DynamicFormDataControls" && state.componentEvent === "component-update";
const isPageChange = (state) => state.component === "DynamicFormNavButtons" && state.componentEvent === "component-update";
const isEventType = R.curry((shouldBe, state) => state.event.target.innerText === shouldBe);
const toFormData = (state) => state.event.target.value === "form1" ? form1 : form2;
const toFormPage = (template) => ({ items: R.filter( (i) => i.page === template.page.value, template.update.items) });
const toNextPage = (prev, next) => {
	const nextPage = prev + next;
	return nextPage < 1 ? 1 : nextPage > 2 ? 2 : nextPage; 
};
const toValue = (pageNumber) => ({ value: pageNumber });

const formOptionUpdate = Actions.filter(isFormOptionUpdate);
const formDataUpdate = Actions.filter(isDataUpdate);
const isLoad = formDataUpdate.filter(isEventType("Load"));
const isClose = formDataUpdate.filter(isEventType("close"));
const navButtons = Actions.filter(isPageChange);

const isNext = formDataUpdate.toEventStream().merge(navButtons).filter(isEventType("Next")).map(1);
const isBack = formDataUpdate.toEventStream().merge(navButtons).filter(isEventType("Back")).map(-1);

const pageUpdate = isNext.toEventStream().merge(isBack.toEventStream())
						 .scan(1, toNextPage)
						 .map(toValue)

const formData = formOptionUpdate.map(toFormData).toProperty(form1);

const initData = new Bacon.Bus();
const updateData = Bacon.when([ formData, isLoad.toEventStream() ], (data, load) => data);
const update = initData.toEventStream().merge(updateData);

const pageBus = new Bacon.Bus();
const page = pageUpdate.toEventStream().merge(pageBus.toEventStream());

const formPage = Bacon.combineTemplate({ page, update }).map(toFormPage)
isClose.delay(100).onValue(() => closePanel.push(""));

setTimeout(() => {

	// kick off demo
	initData.push(form1);
	pageBus.push({ value: 1 });

}, 600);

module.exports = {
	update, page, formPage
}