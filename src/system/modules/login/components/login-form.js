import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import InputField from '../../input-field';
import Inputspan from '../../input-text';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';
import {formContainer, buttonContainer, buttonBackground, buttonspan, fieldContainer, loginField, 
		iconContainer, iconBubble, icon, inputView, inputSize, loadingdiv, authenticating} from '../styles';

const loginForm = (state) => {
	return <div className={formContainer}> 
		<div>
			<div className={iconContainer}>
				<div className={iconBubble}></div>
			</div>
			<div className={inputView}>
				<AnimationContainer id="LoginFormAnimation">
					<div className={inputSize}>
						<div className={fieldContainer}>
							<InputField id="LoginUsername" rootId={ state.id } label="Email Address" required={true}>
								<Inputspan className={loginField} />
							</InputField>
						</div>
						<div className={fieldContainer}>
							<InputField id="LoginPassword" rootId={ state.id } label="Password" required={true}>
								<Inputspan className={loginField} type='password' />
							</InputField>
						</div>
						<div>
							<div className={buttonContainer} onClick={state.handleEvent}>
								<div className={buttonBackground}>
									<span className={buttonspan}>Submit</span>
								</div>
							</div>
						</div>
					</div>
				</AnimationContainer>
			</div>
			<div className={loadingdiv}>
				<AnimationContainer id="LoginLoadingAnimation">
					<VisibilityContainer id="LoginLoadingVisibility">
						<span className={authenticating}>Authenticating</span>
					</VisibilityContainer>
				</AnimationContainer>
			</div>
		</div>
	</div>
};

export default readWrite(loginForm, "loginForm");