import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const toInputTextAction = (state) => state.component === "InputText";

const inputTextAction = Actions.map(toInputTextAction);

//inputTextAction.log('text input....')