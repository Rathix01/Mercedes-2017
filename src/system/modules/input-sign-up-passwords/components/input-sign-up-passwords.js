import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import InputField from '../../input-field';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import VisibilityContainer from '../../visibility-container';
import Text from '../../text';
import { container, formContainer, standAloneContainer, errorClass, 
		validationContainer, validation, messageContainer, passwordMessage, icon } from '../styles';

const inputSignUpPasswords = (state) => {
	return (<div className={container}>
				<VisibilityContainer id={ `${state.id}InputVisibility` }
									 className={ state.isQuestion === true ? formContainer : standAloneContainer } 
									 defaultVisibility={true}>
					<InputField id={ `${ state.id }Password` } 
								label="Password" 
								errorMessage="A value is required" 
								errorClass={ errorClass }
								showLabel= { !state.isQuestion }>
						<InputText isSignUpPassword={true} validations={ [ "notEmpty" ] } type="password" passwordRoot={state.id} placeholder="Enter a password" />
					</InputField>
					<InputField id={ `${ state.id }RepeatPassword` } 
								label="Repeat Password" 
								errorMessage="A value is required" 
								errorClass={ errorClass }
								showLabel= { !state.isQuestion }>
						<InputText isSignUpPassword={true} validations={ [ "notEmpty" ] } type="password" placeholder="Confirm password" />
					</InputField>
				</VisibilityContainer>
				<VisibilityContainer id={ `${state.id}MessageVisibility` }className={messageContainer}>
					<div className={passwordMessage}>
						<div className={icon}>
							<i className='fa fa-check-circle'></i>
						</div>
						<div>
							<div>Your { state.value.length } character password has been entered.</div>
						</div>
					</div>
					<InputButton id={ `${state.id}Message` } 
								 rootId={state.id}
								 colors={state.colors} 
								 isPasswordUpdateButton={true} 
								 text="Update Password" />
				</VisibilityContainer>
				<VisibilityContainer id={ `${state.id}InputVisibility` } className={ validationContainer } defaultVisibility={true}>
					<VisibilityContainer id={ state.id + "StrengthVisibility" } className={validation}>
		   				<Text id={ state.id + "StrengthFeedback" } />
		   			</VisibilityContainer>
		   			<VisibilityContainer id={ state.id + "MatchVisibility" } className={validation}>
						<Text id={ state.id + "MatchFeedback" } />
					</VisibilityContainer>
	   			</VisibilityContainer>
				<StateListener id={ `${state.id}Updates` } isQuestion={true} label="Label" formInputType="InputSignUpPasswords" uniqueId={state.uniqueId} />
			</div>)
};

export default moduleStatepublisher(inputSignUpPasswords, "InputSignUpPasswords");