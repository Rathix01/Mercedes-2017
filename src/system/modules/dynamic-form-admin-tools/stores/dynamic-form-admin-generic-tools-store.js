import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

import DynamicFormQuestion from '../../dynamic-form-question';
import InputText from '../../input-text';

const toGenericToolsAction = (state) => state.component === "DynamicFormAdminGenericTools";
const toNewQuestionAction = (state) => state.event.target.id === "new-form";
const toSaveFormAction = (state) => state.event.target.id === "save-form";
const toLightboxClose = (state) => state.id === "SaveFormLightbox";

const toNewQuestion	= (state) => ({
		uniqueID: new Date().getTime(),
		sectionId: "Test" + new Date().getTime(), 
	  	dataComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	itemState: { value: "example" },
	  	title: "New Question",
	  	page: 1,
	  	componentType: "question",
	  	type: "question",
	  	inputType: "text",
	});

const genericToolsAction = Actions.filter(toGenericToolsAction);
const newQuestionAction = genericToolsAction.filter(toNewQuestionAction);
const saveFormAction = genericToolsAction.filter(toSaveFormAction);

const newQuestion = newQuestionAction.map(toNewQuestion)//.log('eh?');
const saveForm = saveFormAction.map({ display: true }).onValue(publish("SaveForm"))

Actions.filter(toLightboxClose).map({ display: false }).log('this?').onValue(publish("SaveForm"))

module.exports = {
	newQuestion
};