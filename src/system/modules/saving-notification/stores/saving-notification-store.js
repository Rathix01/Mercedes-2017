import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { toTimeline } from '../../../stores/animation-store';

const toAnimateSaving = R.curry((state) => {
	return ({
		tweenProps: [{
			time: 0.01,
			fn: "fromTo", 
			label: 'NotificationUpdate1', 
			target: `${state.id}SavingNotificationAnimation`,
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		}, {
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate2',
			target: `${state.id}SavingNotificationAnimation`,
			from: { scale: 0.9, opacity: 0  }, 
			to: { scale: 1, opacity: 1 }
		}]
	})
});

const toAnimateSaved = (state) => {
	return ({
		tweenProps: [{
			time: 0.01,
			fn: "fromTo", 
			label: 'NotificationUpdate1', 
			target: `${state.id}SavedNotificationAnimation`,
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		}, {
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate2',
			target: `${state.id}SavedNotificationAnimation`,
			from: { scale: 0.97, opacity: 0  }, 
			to: { scale: 1, opacity: 1, delay: 0.3 }
		},{
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate3',
			target: `${state.id}SavedNotificationAnimation`,
			from: { scale: 1, opacity: 1  }, 
			to: { scale: 0.97, opacity: 0, delay: 1.5 }
		}]
	})
};

const isSavingUpdate = (state) => state.component === "SavingNotification";
const isSaving = (state) => state.step === "Updating";
const isSaved = (state) => state.step === "Updated";
const showSaving = (state) => publish(`${state.id}SavingNotificationVisibility`, {display: true })
const hideSaving = (state) => publish(`${state.id}SavingNotificationVisibility`, {display: false })
const showSaved = (state) => publish(`${state.id}SavedNotificationVisibility`, {display: true })
const hideSaved = (state) => publish(`${state.id}SavedNotificationVisibility`, {display: false })

const savingUpdate = Actions.filter(isSavingUpdate);
const saving = savingUpdate.filter(isSaving);
const saved = savingUpdate.filter(isSaved).debounce(500);

saving.onValue(showSaving)
const savingAnimated = saving.map(toAnimateSaving).flatMap(toTimeline);
savingAnimated.onValue(() =>{}); //no op so there is always a listener.

saving.onValue(() => {
	const readyForSaved = Bacon.when([ saved.toEventStream(), savingAnimated.toProperty() ], x => x);
	readyForSaved.onValue(hideSaving);
	readyForSaved.onValue(showSaved);
	readyForSaved.map(toAnimateSaved).flatMap(toTimeline).onValue(hideSaved);
});