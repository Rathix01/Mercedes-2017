import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../../input-field';
import InputText from '../../input-text';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';
import {formContainer, buttonContainer, buttonBackground, buttonText, fieldContainer, loginField, 
		iconContainer, iconBubble, icon, inputView, inputSize, loadingView, authenticating} from '../styles';

const loginForm = (state) => {
	return <View style={formContainer}> 
		<View>
			<View style={iconContainer}>
				<View style={iconBubble}></View>
				<Icon name='lock' size={160} style={icon} />
			</View>
			<View style={inputView}>
				<AnimationContainer id="LoginFormAnimation">
					<View style={inputSize}>
						<View style={fieldContainer}>
							<InputField id="LoginUsername" rootId={ state.id } label="Email Address" required={true}>
								<InputText style={loginField} />
							</InputField>
						</View>
						<View style={fieldContainer}>
							<InputField id="LoginPassword" rootId={ state.id } label="Password" required={true}>
								<InputText style={loginField} type='password' />
							</InputField>
						</View>
						<View>
							<TouchableOpacity style={buttonContainer} onPress={state.handleEvent}>
								<View style={buttonBackground}>
									<Text style={buttonText}>Submit</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</AnimationContainer>
			</View>
			<View style={loadingView}>
				<AnimationContainer id="LoginLoadingAnimation">
					<VisibilityContainer id="LoginLoadingVisibility">
						<Text style={authenticating}>Authenticating</Text>
					</VisibilityContainer>
				</AnimationContainer>
			</View>
		</View>
	</View>
};

export default readWrite(loginForm, "loginForm");