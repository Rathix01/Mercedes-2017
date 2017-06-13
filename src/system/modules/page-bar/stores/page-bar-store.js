import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { pageChanges } from './page-bar-button-update-store';

const filterIndexed = R.addIndex(R.filter)
const toPageBarUpdates = (state) => state.component === "PageBar" && state.componentEvent === "component-update";
const publishButtons = (state) => publish(state.id + "Items", { items: state.items });
const getPageRange = (state) => R.range(0, Math.ceil(state.items.length / (state.pageSize || 5)));
const toPageButtons = (state) => R.merge(state, { items: R.zipWith(R.merge, state.items, toPages(state)) });
const toPages = (state) => R.map(toPage, getPageRange(state))
const toPage = (i) => ({ pageNumber: i + 1, pageIndex: i });
const toPagesAndChange = (pages, change) => ({ pages, change });
const filterToIndexes = (range, list) => filterIndexed((_, i) => R.contains(i, range), list);
const toNextPage = (state) => ({ target: state.pages.pageFor, items: filterToIndexes(getIndexes(state), state.pages.items) });
const toInitPage = (state) => ({ target: state.pageFor, items: R.take(state.pageSize, state.items) })
const getIndexes = (state) => R.range((parseInt(state.change.index) * state.pages.pageSize), 
							   ((parseInt(state.change.index) * state.pages.pageSize) + state.pages.pageSize));
const toSelected = (state) => {
	return state.change 
		? R.merge( state.pages, { items: R.map(toPageIsSelected(state), state.pages.items) })
		: R.merge( state, { items: R.map(toInitSelection, state.items) });
}
const toPageIsSelected = R.curry(( pageState, page ) => R.merge( page, { active: page.pageIndex === pageState.change.pageIndex }));
const toInitSelection = (item) => ({ ...item, active: item.pageIndex === 0 ? true : false });
const publishToTarget = (state) => publish(state.target, { items: state.items });
const toUpdated = (state) => ({ change: state.change, pages: R.merge(state.pages, { items: toPages(state.pages) }) })

const pageBarUpdates = Actions.filter(toPageBarUpdates);
const pageButtons = pageBarUpdates.map(toPageButtons);
const pagesAndChange = Bacon.when([ pageBarUpdates.toProperty(), pageChanges.toEventStream() ], toPagesAndChange)

const initPage = pageBarUpdates.map(toInitPage);
const newPage = pagesAndChange.map(toNextPage);
const nextButtons = pagesAndChange.map(toUpdated);
const nextPage = newPage.merge(initPage);

nextPage.delay(220).onValue(publishToTarget);
pageButtons.merge(nextButtons).map(toSelected).onValue(publishButtons);

module.exports = {
	pageBarUpdates, pagesAndChange, nextPage
}