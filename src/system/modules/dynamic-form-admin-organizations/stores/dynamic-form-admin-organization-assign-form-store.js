import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const isAssignFormAction = (state) => state.component === "OrgFormsList" && state.event.target.id === "assign-new-form";
const isOrgFormsAction = (state) => state.id === "AdminOrgAndForm";
const encodeToUrl = (state) => state.split(" ").join('+');
const toUrl = (state, assignAction) => ({value: `${window.location.host}/?org=${encodeToUrl(state.org)}&form=${encodeToUrl(state.form)}&stamp=${new Date().getTime()}&publish=true` })

const assignFormAction = Actions.filter(isAssignFormAction);
const orgFormsSelectAction = Actions.filter(isOrgFormsAction);
const nextUrl = Bacon.when([ orgFormsSelectAction.toProperty(), assignFormAction.toEventStream() ], toUrl)

nextUrl.onValue(publish("AssignedUrl"));
nextUrl.map({ display: true }).onValue(publish("AssignedUrlVisibilityContainer"));

