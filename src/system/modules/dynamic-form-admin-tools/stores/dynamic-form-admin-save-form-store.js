import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { orgAndForm } from './dynamic-form-admin-org-names-store';

const toFormListener = (state) => state.component === "DynamicFormAdminActiveFormUpdateListener" 
								&& state.componentEvent === "component-update"
								&& state.id === "AdminSections";

const toActiveForm = (state) => state.id === "ActiveFormListener";

const toGenericToolsAction = (state) => state.component === "DynamicFormAdminGenericTools";
const toSaveFormAction = (state) => state.event.target.id === "save-form";
const toNewFormAction = (state) => state.event.target.id === "new-form";
const toNewFormSaveAction = (state) => state.event && state.event.target && state.event.target.id === "new-form-save";
const toNewFormNameAction = (state) => state.id === "NewFormName"
const itemIsPresent = (form, item) => R.filter((i) => i.uniqueId === item.uniqueId, form.items).length !== 0;
const prepareFormForSave = (form, formDefinition, orgAndForm, saveEvent) => {

	const all = R.concat(form.items, formDefinition.items);

	const nextSet = R.filter((item) => {
		if(form.items[0].page === item.page ) {
			return itemIsPresent(form, item)
		}
		return true;
	}, all);

	const nextData = R.reduce( (items, next) => {
		const z = R.filter((i) => i.uniqueId === next.uniqueId, items)
		return z.length > 0 ? items : R.concat(items, next);
	}, [], nextSet );

	const data = R.map(R.omit(["dataComponent", "itemInput"]), nextData);
	return ({ data, orgAndForm });
}
const toNewFormDefinition = (formName, orgAndForm, event) => ({ formName, orgAndForm, event })

const genericToolsAction = Actions.filter(toGenericToolsAction);
const formAction = Actions.filter(toFormListener).toProperty();
const saveFormAction = genericToolsAction.filter(toSaveFormAction);
const newFormAction = genericToolsAction.filter(toNewFormAction);
const newFormNameAction = Actions.filter(toNewFormNameAction);
const newFormSaveAction = Actions.filter(toNewFormSaveAction);
const formUpdate = Actions.filter(toActiveForm)

const saveForm = Bacon.when([ formAction,
							  formUpdate.toProperty(),
							  orgAndForm.toProperty(),
							  saveFormAction.toEventStream() ], prepareFormForSave);

const newForm = Bacon.when([ newFormNameAction.toProperty(), 
							 orgAndForm.toProperty(),
							 newFormSaveAction.toEventStream() ], toNewFormDefinition);


const formSaved = saveForm.flatMap((state) => {
	const p = Firebase.db.ref(`/FormDefinitions/${state.orgAndForm.org}/${state.orgAndForm.form}`)
			.set(state.data);
	return Bacon.fromPromise(p);
})

const formCreated = newForm.flatMap((state) => {
	const p = Firebase.db.ref(`/FormDefinitions/${state.orgAndForm.org}/${state.formName.event.target.value}`).set([{
			uniqueId: new Date().getTime() + 1,
			sectionId: "Test" + new Date().getTime(),
		  	itemState: { value: "example" },
		  	title: "New Form",
		  	page: 1,
		  	componentType: "header",
		  	inputType: "",
		  	type: "header",
		  	text: "This is a header, you can customize the text for this component",
		},
		{
			uniqueId: new Date().getTime() + 2,
			sectionId: "Test" + new Date().getTime(),
		  	itemState: { value: "example" },
		  	title: "A text area",
		  	page: 1,
		  	componentType: "text",
		  	inputType: "text",
		  	type: "text",
		  	text: "This is a text component, it is for longer messages or instructions",
		},
		{
			uniqueId: new Date().getTime() + 4,
			sectionId: "Test" + new Date().getTime(),
		  	title: "A question for page 1",
		  	page: 1,
		  	componentType: "question",
		  	inputType: "text",
		  	type: "question",
		  	text: "A text field. Use for the collection of free text",
		  	itemState: { items: [ { text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' } ] },
		},
		{
			uniqueId: new Date().getTime() + 3,
			sectionId: "Test" + new Date().getTime(),
		  	itemState: { value: "example" },
		  	title: "New Form",
		  	page: 2,
		  	componentType: "header",
		  	type: "header",
		  	text: "This is a header, you can customize the text for this component",
		},
		{
			uniqueId: new Date().getTime() + 4,
			sectionId: "Test" + new Date().getTime(),
		  	itemState: { value: "example" },
		  	title: "A question for page 2",
		  	page: 2,
		  	componentType: "question",
		  	inputType: "select",
		  	type: "question",
		  	text: "A selection field. Use for the collection of free text",
		  	itemState: { items: [ { text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' } ] },
		},
	]);

	return Bacon.fromPromise(p);
});

module.exports = {
	formSaved, formCreated, saveForm, newForm
}
