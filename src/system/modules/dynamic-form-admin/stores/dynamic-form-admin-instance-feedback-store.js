import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { toTimeline } from '../../../stores/animation-store';
import { saveData, dataSaved, formSaved } from './dynamic-form-admin-instance-store';

saveData.log('1')
dataSaved.log('2')
formSaved.log('3')


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

//show saving, then hide when saved.
saveData.map({ display: true }).onValue(publish("SavingNotificationVisibility"));
const savingNotificationAnimation = saveData.map(toAnimateSaving("SavingNotificationAnimation")).flatMap(toTimeline);

const formSaveAndAnimated = Bacon.when([formSaved.toEventStream(), savingNotificationAnimation.toEventStream()], x => x).delay(600);
formSaveAndAnimated.map({ display: false }).onValue(publish("SavingNotificationVisibility"))

//show saved.
formSaveAndAnimated.map({ display: true }).onValue(publish("SavedNotificationVisibility"))
//animate showing s
const savedNotificationAnimation = formSaveAndAnimated.map(toAnimateSaved("SavedNotificationAnimation")).flatMap(toTimeline)

//hide saved.
savedNotificationAnimation.map({ display: false }).onValue(publish("SavedNotificationVisibility"));
