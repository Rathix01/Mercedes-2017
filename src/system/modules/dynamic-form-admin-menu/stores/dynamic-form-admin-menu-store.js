import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toMenuAction = (state) => state.component === "DynamicFormAdminMenu";
const toMenuKey = (state) => ({ menuKey: state.event.target.id })
const toFormView = (state) => state.menuKey === "Form";
const toOrgView = (state) => state.menuKey === "Org";

const menuAction = Actions.filter(toMenuAction).map(toMenuKey);

const displayFormView = menuAction.filter(toFormView);
const displayOrgView = menuAction.filter(toOrgView);

displayOrgView.map({ display: true }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"))
displayFormView.map({ display: false }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"))

displayFormView.map({ display: true }).onValue(publish("FormAndToolsVisibility"))
displayOrgView.map({ display: false }).onValue(publish("FormAndToolsVisibility"))

displayFormView.debounce(10).onValue(publish("ForceFormRender"))
