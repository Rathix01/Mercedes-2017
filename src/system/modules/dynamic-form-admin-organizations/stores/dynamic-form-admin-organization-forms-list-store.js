import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { orgDetail } from './dynamic-form-admin-organizations-store';

const toFormsForOrg = (template) => template.formInstances[template.orgDetail.formsKey];
const toFormListData = (state) => R.values(state);
const toFormItems = (state) => R.flatten(R.map(R.values, state));
const toItemState = (state) => ({ itemState: state });
const toFormList = (state) => ({ items: R.map(toItemState, state) });
const includeOrgInForms	 = (org, forms) => ({ items: R.map((i) => ({ org: org, ...i }), forms.items) });

const formInstances = Firebase.data.map(R.prop("FormInstances"));
const formsForOrg = Bacon.combineTemplate({ formInstances, orgDetail }).map(toFormsForOrg);
const formsListItem = formsForOrg.map(toFormListData).map(toFormItems).map(toFormList);
const formsWithOrg = Bacon.when([ orgDetail.toProperty(), formsListItem.toEventStream() ], includeOrgInForms)

formsWithOrg.onValue(publish("OrgFormsListSmall"));