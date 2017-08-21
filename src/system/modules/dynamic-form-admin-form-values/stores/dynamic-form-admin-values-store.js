import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toNextFormListenerActions = (state) => state.component === "DynamicFormAdminNextFormListener" && state.componentEvent === "component-update";
const toFormInputActions = (state) => state.id.startsWith("AdminSections") && (state.label !== undefined || (state.event && state.event.target));
const toFormQuestions = (state) => R.filter( (i) => i.componentType === "question", state.items )
const toFormAnswers = (prev, next) => R.merge(prev, { [next.uniqueId]: { value: next.label || next.event.target.value  } });
const toValue = (template, item) =>  template.formAnswers[item.uniqueId] === undefined ? "" : template.formAnswers[item.uniqueId].value
const toLabelAndValue = R.curry((template, item) => ({ label: item.title, value: toValue(template, item), inputId: item.uniqueId }));
const toQuestionsAndAnswers = (template) => ({ items: R.map(toLabelAndValue(template), template.formQuestions) });
const mapToNextValue = (state) => ({ ...state, value: state.event.targetValue });

const formInputActions = Actions.filter(toFormInputActions);
const nextFormActions = Actions.filter(toNextFormListenerActions);
const formQuestions = nextFormActions.map(toFormQuestions);
const formAnswers = formInputActions.scan({}, toFormAnswers);

formInputActions.map(mapToNextValue).onValue((state) => {
	if(state.isQuestion) {
		console.log('???')
		publish(state.id, { value: state.event.targetValue })
	}
});

Bacon.combineTemplate({formQuestions, formAnswers}).map(toQuestionsAndAnswers).onValue(publish("AdminFormDisplayValues"));
