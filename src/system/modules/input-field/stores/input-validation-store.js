import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import Updates from './input-store';
import { inputFieldMountEvents, allFields } from './input-field-store';

const findFieldKey = (id, allFields) => R.filter((f) => id.indexOf(f) > -1, R.keys(allFields))[0];
const getFieldFromUpdate = (allFields, update) => allFields[update.id] || allFields[findFieldKey( update.id, allFields)];
const toUpdateAndField = (allFields, update) => ({ update, field: getFieldFromUpdate(allFields, update) });
const isValid = (state) => state.field.required === true && state.update.value === "" ? false : true;
const toValid = (state) => R.merge(state.update, { valid: isValid(state) })

const updateAndField = Bacon.when([allFields.toProperty(), Updates.delay(100).toEventStream()], toUpdateAndField);
const validatedUpdate = updateAndField.map(toValid);

export default validatedUpdate;