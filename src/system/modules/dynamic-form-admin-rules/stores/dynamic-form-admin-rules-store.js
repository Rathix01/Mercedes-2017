import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const showBus = Bacon.Bus();
const validationBus = Bacon.Bus();

const renderChanges = (renderState) => {
	Bacon.once(renderState)
		.map((state) => ({ 
			isRuleUpdate: true, 
			componentState: R.omit(["ruleValues", "rules", "id"], state), 
			ruleValues: state.ruleValues 
		}))
		.delay(0.01)
		.onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
};

const isDuplicate = (prev, next) => {
	return ({ next, 
			  isDuplicate: next.state.uniqueId === prev.next.state.uniqueId && 
			  next.state.value === prev.next.state.value &&
			  next.target.uniqueId === prev.next.target.uniqueId })
}
const filterDuplicates = (state) => state.isDuplicate !== true;

showBus.scan({ next:{state:{}} }, isDuplicate)
		.filter(filterDuplicates)
		.onValue((state) => {
		 	if(state.next.target !== undefined) {
		  		renderChanges({  ...R.omit("visible", state.next.target), ruleValues: { ...state.next.update, targetID: state.next.target.uniqueId }});
		 	}
		 })

const showNotValidError = (target, rule, action, state) => {
	rules.show(target, rule, action, state);
	return false;
}

const rules = {
	show: (target, rule, action, state) => {
		showBus.push({ target, state, update: { visible: true } });
		return true;
	},
	hide: (target, rule, action, state) => {
		showBus.push({ target, state, update: { visible: false } });
		return true;
	},
	showIf: (target, rule, action, state) => {
		rule.valueIs === (action.value || action.text) ? rules.show(target, rule, action, state) 
													   : rules.hide(target, rule, action, state);
		return true;
	},
	validate: (target, rule, action, state) => {
		//console.log(target, rule, action, state)
		validationBus.push({ state:{ ...state, message: rule.message }, rule });
		return true;
	},
	add: (target,rule, action, state) => {
		console.log("add -->", state);
		return true;
	},
	save: (target, rule, action) => {
		publish("SaveWithRules", { save: true });
		return true;
	},
	submitIfValid: (target, rule, action, state) => {
		console.log(state.values)
		return R.filter((i) => i.valid === false, state.values).length === 0 &&
			   R.filter((i) => i.valid === true, state.values).length > 8
			? rules.save(target, rule, action)
			: showNotValidError(target, rule, action, state);
	},
};

const mapIndexed = R.addIndex(R.map);
const isRulesAction = (state) => state.id === "RulesListener" && state.componentEvent === "component-update";
const hasRules = (state) => state.rules !== undefined && state.rules.length > 0;
const isAdminSections = (state) => state.id === "NextFormListener" && state.componentEvent === "component-update";
const isFormValues = (state) => state.id === "ValidatedValues";

const toRuleAndForm = (form, values, rule) => ({ form, values, rule });
const toRuleAndTargets = (state) => {
	const x = R.map((rule) => R.reduce((prev, next) => {
		const ruleTargets = next !== undefined && next.keywords !== undefined 
								?  R.filter((k) => R.contains(k, rule.targets), next.keywords) 
								: [];

		return ruleTargets.length > 0 ? prev.concat(next) : prev;
	}, [], state.form.items), state.rule.rules);

	return ({ ...state.rule, targets: x, all: state.form.items, sources: x, values: state.values.items });
}

const applyRules = (state) => {
	let keepApplyingRules = true;
	mapIndexed((r, idx) => {
		return mapIndexed((t) => { 
			if (keepApplyingRules === true ) {
				keepApplyingRules = rules[r.ruleName](t, r, state.action, state);
			}
		}, state.targets[idx]);
	}, state.rules)
};

const toRuleTargetAndAction = (action, ruleAndTargets) => ({ ...ruleAndTargets, action: action });

const ruleAction = Actions.filter(isRulesAction).filter(hasRules);
const formData = Actions.filter(isAdminSections);
const formValues = Actions.filter(isFormValues);

const ruleAndForm = Bacon.when([ formData, formValues.toProperty(), ruleAction ], toRuleAndForm, 
							   [ formData.toProperty(), formValues.toProperty(), ruleAction ], toRuleAndForm);

const ruleAndTargets = ruleAndForm.map(toRuleAndTargets)

Bacon.when([ ruleAction.toProperty(), ruleAndTargets.toEventStream()], toRuleTargetAndAction).onValue(applyRules);

module.exports = {
	validationBus
}