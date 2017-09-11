import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { orgAndForm, urlPublish } from './dynamic-form-admin-org-names-store';

const toOrgAndFormTools = (state) => state.component === "DynamicFormAdminOrgAndFormTools";
const toPublishFormAction = (state) => state.event.target.id === "publish-form";
const openForm = (state) => window.open(`${ window.location.origin }/?org=${encodeToUrl(state.orgAndForm.org)}&form=${encodeToUrl(state.orgAndForm.form)}&stamp=${new Date().getTime()}&publish=true`);
const encodeToUrl = (state) => state.split(" ").join('+');
const isPublish = (state) => state === 'true';

const publishFormAction = Actions.filter(toOrgAndFormTools).filter(toPublishFormAction);
const publishForm = Bacon.when([orgAndForm.toProperty(), publishFormAction.toEventStream()], (orgAndForm, publish) => ({ orgAndForm, publish }));

publishForm.onValue(openForm);

const formIsInPublishMode = urlPublish.filter(isPublish);

formIsInPublishMode.map({ display: false }).onValue(publish("BasicControlsVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("ToolsColumnVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("AdminHeaderVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"));
formIsInPublishMode.map({ display: true }).onValue(publish("SaveInstanceButtonVisibility"));
formIsInPublishMode.map({ display: true }).onValue(publish("FormAndToolsVisibility"));
