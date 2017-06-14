import React from 'react';
import Read from '../../../components/read-state'
import { HeadingStyle, buttonContainer, headerContent } from '../styles/section.style';
import PlusMinusToggle from '../../plus-minus-toggle';

const dashboardSectionHeader = (state) => {
      return (
        <div className={HeadingStyle} style={{ backgroundColor: state.background }}>
	        <div className={ headerContent }>
		        <h1>{ state.title }</h1>
		        <div className={ buttonContainer }>
		        	<PlusMinusToggle id={ `${state.id}PlusMinusToggle` } startAt='Plus' target={state.id} crossColor={state.background} />
		        </div>
	        </div>
        </div>
    );
}

module.exports = Read(dashboardSectionHeader, "DashboardSectionHeader");
