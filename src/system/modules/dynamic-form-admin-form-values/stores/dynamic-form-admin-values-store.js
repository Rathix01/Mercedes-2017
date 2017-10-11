import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toValueByType = (state) => {
	//console.log(state.formInputType || state.component, state)
	return {
		"InputText": state.event ? state.event.targetValue : " ",
		"InputTextArea": state.event ? state.event.targetValue : " ",
		"InputCheckboxList": state.value,
		"InputRadioButton": state.value,
		"InputRadioList": state.value,
		"InputDatePicker": state.value,
		"InputSelect": state.event ? state.event.targetValue : " ",
		default: " ",
	}[state.formInputType || state.component]
};

const toNextFormListenerActions = (state) => state.component === "DynamicFormAdminNextFormListener" && state.componentEvent === "component-update";
const toFormInputActions = (state) => state.id.startsWith("AdminSections") && (state.label !== undefined || (state.event && state.event.target));
const toFormQuestions = (state) => R.filter( (i) => i.componentType === "question", state.items )
const toFormAnswers = (prev, next) => R.merge(prev, { [next.uniqueId]: { value: toValueByType(next), updated: true  } });

const toValue = (template, item) =>  template.formAnswers[item.uniqueId] === undefined ? "" : template.formAnswers[item.uniqueId].value
const isUpdated = (answers, item) => answers[item.uniqueId] !== undefined && answers[item.uniqueId].updated === true ? true : false; 
const toLabelAndValue = R.curry((template, item) => {
	return ({ label: item.title, value: toValue(template, item), inputId: item.uniqueId, updated: isUpdated(template.formAnswers, item) })
});
const toQuestionsAndAnswers = (template) => ({ items: R.map(toLabelAndValue(template), template.formQuestions) });
const mapToNextValue = (state) => ({ ...state, value: state.event ? state.event.targetValue : state.value });

const formInputActions = Actions.filter(toFormInputActions);
const nextFormActions = Actions.filter(toNextFormListenerActions);
const formQuestions = nextFormActions.map(toFormQuestions);

const formAnswers = formInputActions.filter(R.prop("isQuestion")).scan({}, toFormAnswers);

formInputActions.map(mapToNextValue).onValue((state) => {
	if(state.isQuestion) {
		//hacky whacky
		//needs to be more flexible.
		if(state.formInputType === "InputDatePicker" || 
		   state.formInputType === "InputCheckboxList" ||
		   state.formInputType === "InputRadioList") {
			// something happens here...
			//console.log(state.formInputType);
		} else if(state.component === "InputCheckbox" || state.component === "InputRadio") {
			//publish(state.id, { value: state.text });
		} else {
			publish(state.id, { value: state.event.targetValue })
		}
	}
});

Bacon.combineTemplate({formQuestions, formAnswers}).map(toQuestionsAndAnswers).onValue(publish("AdminFormDisplayValues"));
