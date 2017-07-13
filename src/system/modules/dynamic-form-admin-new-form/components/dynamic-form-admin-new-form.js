import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import AnimationContainer from '../../animation-container'
import VisibilityContainer from '../../visibility-container'
import { HeadingStyle, buttonContainer, headerContent } from '../styles/section.style';

//import { mainFormContainer } from '../styles';

const dynamicFormAdminNewForm = (state) => {
	return (
        <div className={HeadingStyle} style={{ backgroundColor: state.background }}>
	        <div className={ headerContent }>
		        <h1>{ state.title }</h1>
	        </div>
        </div>
    );
};

export default readWrite(dynamicFormAdminNewForm, "DynamicFormAdminNewForm");
