import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';

import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';
import InputTextArea from '../../input-textarea';
import InputRadioList from '../../input-radio-list';

import { countryList } from './example-regions';


export default { items: [ 
	{ 
		sectionId: "Page1-1", 
	  	itemComponent: DynamicFormHeader,
	  	title: "St Trevor's Hospital",
	  	text: "Emergency Department. \n \n Please read and fill in the following form carefully.",
	  	page: 1,
	},
	{ 
		sectionId: "Page1-2", 
	  	itemComponent: DynamicFormText,
	  	title: "Personal Information",
	  	text: "Please provide your personal details",
	  	page: 1,
	},
	{ 
		sectionId: "Page1-3", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	itemState: { placeholder: "Your surname" },
	  	title: "Family name",
	  	page: 1,
	},
	{ 
		sectionId: "Page1-4", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "First and middle names",
	  	itemState: { placeholder: "Given names" },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-5", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "Date of Birth",
	  	itemState: { placeholder: "Example: 04 Jun 1980" },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-6", 
	  	itemComponent: DynamicFormText,
	  	title: "Address",
	  	text: "Please provide your address detail below",
	  	page: 1,
	},
	{ 
		sectionId: "Page1-7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "Street number and name",
	  	itemState: { placeholder: "Example: 44 Darling Street" },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "Suburb",
	  	itemState: { placeholder: "Example: Balmain" },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "City",
	  	itemState: { placeholder: "Example: Sydney" },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputSelectList,
	  	title: "Country",
	  	itemState: { items: countryList },
	  	page: 1,
	},
	{ 
		sectionId: "Page1-7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputRadioList,
	  	itemState: { items: [{ label: "Yes", checked: true }, { label: "No", checked: false }] },
	  	title: "Is the above your current country of residence?",
	  	page: 1,
	},


	// page 2
	{ 
		sectionId: "Test5", 
	  	itemComponent: DynamicFormHeader,
	  	title: "St Trevor's Hospital",
	  	text: "Emergency Department. \n \n Please read and fill in the following form carefully.",
	  	page: 2,
	},
	{ 
		sectionId: "Test2", 
	  	itemComponent: DynamicFormText,
	  	title: "Details",
	  	text: "What is the reason for your visit today?",
	  	page: 2,
	},
	{ 
		sectionId: "Test7", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputTextArea,
	  	title: "Please describe your symptoms",
	  	page: 2,
	},
	{ 
		sectionId: "Test8", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputTextArea,
	  	title: "Any extra details",
	  	page: 2,
	},
] };