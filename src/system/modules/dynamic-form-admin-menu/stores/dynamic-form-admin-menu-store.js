import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { urlMenuOption } from './dynamic-form-admin-menu-url-store';

const toMenuAction = (state) => state.component === "DynamicFormAdminMenu";
const toMenuKey = (state) => ({ menuKey: state.event.target.id })
const toFormView = (state) => state.menuKey === "Form";
const toOrgView = (state) => state.menuKey === "Org";
const stripAdminPage = (urlString) => {
	return urlString.replace( "&adminPage=Form", "" ); 
}

const menuAction = Actions.filter(toMenuAction).map(toMenuKey);
const menuOption = menuAction.toEventStream().merge(urlMenuOption.toEventStream());

const displayFormView = menuOption.filter(toFormView);
const displayOrgView = menuOption.filter(toOrgView);

displayOrgView.map({ display: true }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"))
displayFormView.map({ display: false }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"))

displayFormView.map({ display: true }).onValue(publish("FormAndToolsVisibility"))
displayOrgView.map({ display: false }).onValue(publish("FormAndToolsVisibility"))

displayFormView.onValue(() => window.history.pushState("", "", `/${stripAdminPage(window.location.search)}&adminPage=Form`))
displayOrgView.onValue(() => window.history.pushState("", "", `/${stripAdminPage(window.location.search)}`))

displayFormView.debounce(10).onValue(publish("ForceFormRender"))
