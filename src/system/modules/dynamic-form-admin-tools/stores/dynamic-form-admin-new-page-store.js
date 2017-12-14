import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormHeader from '../../dynamic-form-header';
import InputText from '../../input-text';

const toGenericToolsAction = (state) => state.component === "DynamicFormAdminOrgAndFormTools" || state.component === "DynamicFormAdminGenericTools";
const toNewPageAction = (state) => state.event.target.id === "new-page";
const toActiveForm = (state) => state.id === "ActiveFormListener";
const toNextPage = (form) => R.reduce(R.max, -Infinity,  R.map((i) => i.page, form.items));

const toNextPageItems	= (nextPage) => ({
		uniqueId: new Date().getTime(),
		sectionId: "Test" + new Date().getTime(), 
	  	dataComponent: DynamicFormHeader,
	  	title: "New Page",
	  	page: (nextPage + 1),
	  	componentType: "header",
	  	inputType: "text",
	  	type: "header",
	  	inputType: "text",
	  	keywords: [`page${(nextPage + 1)}`],
	  	itemState: { items: [ { text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' } ] },
	  	isNew: true,
	  	isNewPage: true,
	});

const genericToolsAction = Actions.filter(toGenericToolsAction);
const newPageAction = genericToolsAction.filter(toNewPageAction);
const formUpdate = Actions.filter(toActiveForm)
const nextPage = Bacon.when([ formUpdate.toProperty(), newPageAction.toEventStream() ], toNextPage).map(toNextPageItems)

module.exports = {
	nextPage
};