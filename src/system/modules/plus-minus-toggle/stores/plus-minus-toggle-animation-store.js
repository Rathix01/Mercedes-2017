import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { plusMinusClick, plusMinusUpdate } from './plus-minus-toggle-store';
import { toTimeline } from '../../../stores/animation-store';

const toNextPosition = (existing, next) => existing[next.id] ? !existing[next.id].open : true;
const togglePositions = (existing, next) => R.merge( existing, { [next.id]: { open: toNextPosition(existing, next) }});
const toPositionForTween = (positions, click) => R.merge(click, { open: positions[click.id].open });
const endsWith = (str, suffix) => str.indexOf(suffix, str.length - suffix.length) !== -1;
const toAnimId = (state) => endsWith(state.id, "Button") ? state.id + "ArmAnimation" : state.id + "ButtonArmAnimation";

const toTweens = (state) => ({
	tweenProps: [{ 
			time: 0.3,
			fn: "fromTo", 
			label: "detailOpen", 
			target: toAnimId(state), 
			from: { rotateZ: state.open ? 0 : 90 }, 
			to: { rotateZ: state.open ? 90 : 180 }
		}
	]
});

const nextUpdate = plusMinusClick.merge(plusMinusUpdate);
const positions = nextUpdate.scan({}, togglePositions);
const nextPosition = Bacon.when([positions.toProperty(), nextUpdate.toEventStream()], toPositionForTween);

nextPosition.map(toTweens).onValue(toTimeline);
