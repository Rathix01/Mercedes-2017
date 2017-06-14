import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const InputText = (state) => <input type={ state.type || 'text' } className={getClassName(state)} onChange={state.handleEvent} />

export default readAndWrite(InputText, "InputText")