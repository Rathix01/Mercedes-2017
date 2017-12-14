import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

const toMenuItems = (template) => ({ items: R.map((i) => ({ text: i, selected: i === template.s.value }), template.m) });
const isMenuSelectionAction = (state) => state.component === "MercedesBenzWebsiteFrontPageMenuItem";
const toTextValue = (state) => ({ value: state.text });

// listen for menu events, extract the text property of the event object.
const menuSelections = Actions.filter(isMenuSelectionAction).map(toTextValue).toEventStream();

// when these services complete their work fire the initial menu state.
const initMenuState = Bacon.combineTemplate({ m: Services.modelTypes, s: Services.selectedMenuItem }).toEventStream();

// when the menuSelections stream fires an event update the menu items with the newly selected 
const updateMenuState = Bacon.when([ Services.modelTypes.toProperty(), menuSelections ], (m,s) => ({m,s})).toEventStream();

// merge the init and update streams and publish the changes.
initMenuState.merge(updateMenuState).map(toMenuItems).onValue(publish("MenuOptions"));
