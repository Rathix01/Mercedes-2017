import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { formSaved, formCreated, saveForm, newForm, deleteForm, formDeleted } from './dynamic-form-admin-save-form-store';
import { toTimeline } from '../../../stores/animation-store';

const toAnimateSaving = R.curry((key, state) => {
	return ({
		tweenProps: [{
			time: 0.01,
			fn: "fromTo", 
			label: 'NotificationUpdate1', 
			target: key,
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		}, {
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate2',
			target: key,
			from: { scale: 0.9, opacity: 0  }, 
			to: { scale: 1, opacity: 1 }
		}]
	})
});

const toAnimateSaved = R.curry((key, state) => {
	return ({
		tweenProps: [{
			time: 0.01,
			fn: "fromTo", 
			label: 'NotificationUpdate1', 
			target: key,
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		}, {
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate2',
			target: key,
			from: { scale: 0.97, opacity: 0  }, 
			to: { scale: 1, opacity: 1, delay: 0.3 }
		},{
			time: 0.2,
			fn: "fromTo", 
			label: 'NotificationUpdate3',
			target: key,
			from: { scale: 1, opacity: 1  }, 
			to: { scale: 0.97, opacity: 0, delay: 1.5 }
		}]
	})
});

formSaved.log('Form was saved...')

//show saving, then hide when saved.
saveForm.map({ display: true }).onValue(publish("SavingNotificationVisibility"));
const savingNotificationAnimation = saveForm.map(toAnimateSaving("SavingNotificationAnimation")).flatMap(toTimeline);
const formSaveAndAnimated = Bacon.when([formSaved.toEventStream(), savingNotificationAnimation.toEventStream()], x => x).delay(600);
formSaveAndAnimated.map({ display: false }).onValue(publish("SavingNotificationVisibility"))
formSaveAndAnimated.map({ display: true }).onValue(publish("SavedNotificationVisibility"))
const savedNotificationAnimation = formSaveAndAnimated.map(toAnimateSaved("SavedNotificationAnimation")).flatMap(toTimeline)
savedNotificationAnimation.map({ display: false }).onValue(publish("SavedNotificationVisibility"));

//delete forms
deleteForm.map({ display: true }).onValue(publish("DeletingNotificationVisibility"));
const deletingNotificationAnimation = deleteForm.map(toAnimateSaving("DeletingNotificationAnimation")).flatMap(toTimeline);
const formDeletedAndAnimated = Bacon.when([formDeleted.toEventStream(), deletingNotificationAnimation.toEventStream()], x => x).delay(600);
formDeletedAndAnimated.map({ display: false }).onValue(publish("DeletingNotificationVisibility"))
formDeletedAndAnimated.map({ display: true }).onValue(publish("DeletedNotificationVisibility"))
const deletedNotificationAnimation = formDeletedAndAnimated.map(toAnimateSaved("DeletedNotificationAnimation")).flatMap(toTimeline)
deletedNotificationAnimation.map({ display: false }).onValue(publish("DeletedNotificationVisibility"));

// new form.
formCreated.map({ display: false }).onValue(publish("NewFormVisibility"));
formCreated.map({ display: true }).onValue(publish("OrgAndFormVisibility"));