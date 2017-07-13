import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { colors } from '../../../styles/variables.style.js';
import DynamicFormAdminNewForm from '../../dynamic-form-admin-new-form';

// const toFormAdminActions = (state) => state.component === "DynamicFormAdmin" && state.componentEvent === "component-update";
// const toActionById = R.curry((actionId, state) => state.event.target.id === actionId);

// const formAdminActions = Actions.filter(toFormAdminActions);
// const newFormAction = formAdminActions.filter(toActionById("NewForm"));

// module.exports = { newFormAction }