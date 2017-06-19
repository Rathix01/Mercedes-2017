import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';

import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';

export default { items: [ 
	{ 
		sectionId: "Test1", 
	  	itemComponent: DynamicFormHeader,
	  	title: "St Trevor's Hospital",
	  	text: "General Admittance. \n \n Please read and fill in the following form carefully.",
	  	page: 1,
	},
	{ 
		sectionId: "Test1a", 
	  	itemComponent: DynamicFormText,
	  	title: "Personal Details",
	  	text: "Please provide your personal details",
	  	itemState: { items: [ 'Mr', 'Ms', 'Mrs', 'Miss', 'Dr', '' ] },
	  	page: 1,
	},
	{ 
		sectionId: "Test2", 
	  	itemComponent: DynamicFormText,
	  	title: "Personal Details",
	  	text: "Please provide your personal details",
	  	page: 1,
	},
	{ 
		sectionId: "Test3", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	itemState: { value: "example" },
	  	title: "Family Name",
	  	page: 1,
	},
	{ 
		sectionId: "Test4", 
	  	itemComponent: DynamicFormQuestion,
	  	itemInput: InputSelectList,
	  	title: "Given Names",
	  	page: 1,
	},
] }