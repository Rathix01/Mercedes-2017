import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toNavigationUpdates = (state) => state.component === "DynamicFormAdminNavButtons";
const isPageUp = (state) => state.event.target.id === "next";
const isPageDown = (state) => state.event.target.id === "back";
const changePage = (prev, next) => next.force === true 
										? next.change 
										: prev + next.change === 0 ? 1 : prev + next.change;

const navUpdates = Actions.filter(toNavigationUpdates);

const pageUp = navUpdates.filter(isPageUp).map({ change: 1 }).toEventStream()
const pageDown = navUpdates.filter(isPageDown).map({ change:-1 }).toEventStream();

const pageChange = pageUp.merge(pageDown);
const page = pageChange.scan(1, changePage);

module.exports = {
	page
}