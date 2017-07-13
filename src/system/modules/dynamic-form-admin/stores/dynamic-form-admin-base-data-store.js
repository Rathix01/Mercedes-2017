import Bacon from 'baconjs';
import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';

import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';


const baseFormData = { items: [ 
	{ 
		uniqueID: 1,
		sectionId: "Test1", 
	  	dataComponent: DynamicFormHeader,
	  	title: "St Trevor's Hospital",
	  	text: "General Admittance. \n \n Please read and fill in the following form carefully.",
	  	page: 1,
	  	componentType: "header",
	},
	{ 
		uniqueID: 2,
		sectionId: "Test1a", 
	  	dataComponent: DynamicFormText,
	  	title: "Personal Details",
	  	text: "Please provide your xxxxx",
	  	//itemState: { items: [ 'Mr', 'Ms', 'Mrs', 'Miss', 'Dr', '' ] },
	  	page: 1,
	  	componentType: "text",
	},
	{ 
		uniqueID: 3,
		sectionId: "Test2", 
	  	dataComponent: DynamicFormText,
	  	title: "Personal Details",
	  	text: "Please provide your personal details",
	  	page: 1,
	  	componentType: "text",
	},
	{ 
		uniqueID: 4,
		sectionId: "Test3", 
	  	dataComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	itemState: { value: "example" },
	  	title: "Family Name",
	  	page: 1,
	  	componentType: "question",
	  	inputType: "text",
	},
	{ 
		uniqueID: 5,
		sectionId: "Test4", 
	  	dataComponent: DynamicFormQuestion,
	  	itemInput: InputSelectList,
	  	title: "Given Names",
	  	page: 1,
	  	componentType: "question",
	  	inputType: "select",
	},
] }

module.exports = { baseForm: new Bacon.Bus().toProperty(baseFormData) }