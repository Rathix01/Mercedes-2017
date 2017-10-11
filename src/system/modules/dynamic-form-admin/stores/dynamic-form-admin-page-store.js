import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import Firebase from '../../firebase';
import { formData, orgData } from './dynamic-form-admin-store';
import { GenericTools } from '../../dynamic-form-admin-tools';

const toValue = (state) => ({ page: state })
const toNavigationUpdates = (state) => state.component === "DynamicFormAdminNavButtons";
const toOrgAndFormUpdates = (state) => state.id === "AdminOrgAndForm" && state.componentEvent === "component-update";
const isPageUp = (state) => state.event.target.id === "next";
const isPageDown = (state) => state.event.target.id === "back";
const toMax = (next, page) => {
	const pageNumbers = R.map((i) => i.page, next.data[next.orgAndForm.org][next.orgAndForm.form]);
	const maxPage = R.reduce(R.max, -Infinity, pageNumbers);
	return page > maxPage ? maxPage : page;
}
const changePage = (prev, next) => next.force === true 
										? (next.nextPage.page === undefined ? toMax(next, next.nextPage.change) : next.nextPage.page)
										: prev + next.nextPage.change === 0 ? 1 : toMax(next, prev + next.nextPage.change);

const toNextPage = (data, orgAndForm, nextPage) => ({ data, orgAndForm, nextPage });
const isNewPage = (state) => state.isNewPage === true;
const toNewPage = (data, orgAndForm, nextPage) => ({ data, orgAndForm, nextPage, force: true });

const navUpdates = Actions.filter(toNavigationUpdates);
const orgAndFormUpdate = Actions.filter(toOrgAndFormUpdates);
const newPage = GenericTools.newQuestion.filter(isNewPage).debounce(100);

const pageUp = navUpdates.filter(isPageUp).map({ change: 1 }).toEventStream()
const pageDown = navUpdates.filter(isPageDown).map({ change:-1 }).toEventStream();

const pageChange = pageUp.merge(pageDown);
const pageUpdate = Bacon.when([formData.toProperty(), orgAndFormUpdate.toProperty(), pageChange.toEventStream()], toNextPage);

const page = pageUpdate.scan(1, changePage);

page.map(toValue).onValue(publish("AdminFormDisplayValues"))

module.exports = {
	page
}