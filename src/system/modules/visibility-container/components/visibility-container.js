import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';

const getStyles = (state) => {
	return { display: (state.display || (state.defaultVisibility === true && state.display === undefined)) ? "block" : "none" }
}

const visibilityContainer = (state) => {
    return ( <div className={getClassName(state)} style={getStyles(state)}>
          {state.children}
        </div>  )
  }

 export default read(visibilityContainer);