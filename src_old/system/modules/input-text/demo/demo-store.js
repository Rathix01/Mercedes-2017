import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toDemoTextEvents = (state) => state.id === "BasicDemoInputText";
const toValue = (state) => ({ value: state.event.target.value });

const demoTextEvents = Actions.filter(toDemoTextEvents)
demoTextEvents.map(toValue).onValue(publish("BasicDemoTextValue"))