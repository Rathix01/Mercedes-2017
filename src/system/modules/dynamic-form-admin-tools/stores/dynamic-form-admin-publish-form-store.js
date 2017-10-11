import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { orgAndForm, urlPublish } from './dynamic-form-admin-org-names-store';

const adminBus = new Bacon.Bus();

const toOrgAndFormTools = (state) => state.component === "DynamicFormAdminOrgAndFormTools";
const toPublishFormAction = (state) => state.event.target.id === "publish-form";
const openForm = (state) => window.open(`${ window.location.origin }/?org=${encodeToUrl(state.orgAndForm.org)}&form=${encodeToUrl(state.orgAndForm.form)}&stamp=${new Date().getTime()}&publish=true`);
const encodeToUrl = (state) => state.split(" ").join('+');
const isPublish = (state) => state === 'true';
const isAdmin = (state) => state !== 'true';

const publishFormAction = Actions.filter(toOrgAndFormTools).filter(toPublishFormAction);
const publishForm = Bacon.when([orgAndForm.toProperty(), publishFormAction.toEventStream()], (orgAndForm, publish) => ({ orgAndForm, publish }));
publishForm.onValue(openForm);

//urlPublish.log('url?')

const formIsInPublishMode = urlPublish.filter(isPublish).map({ mode: "Publish" });
const formIsInAdminMode = urlPublish.filter(isAdmin).toProperty().onValue(() => adminBus.push({ mode: "Admin" }));

const mode = formIsInPublishMode.log('publish mode');

formIsInPublishMode.map({ display: false }).onValue(publish("BasicControlsVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("ToolsColumnVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("AdminHeaderVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("DynamicFormAdminOrganizationDisplayVisibility"));
formIsInPublishMode.map({ display: false }).onValue(publish("BackButtonVisibility"));

formIsInPublishMode.map({ display: true }).onValue(publish("SaveInstanceButtonVisibility"));
formIsInPublishMode.map({ display: true }).onValue(publish("FormAndToolsVisibility"));

mode.onValue(publish("FormMode"));