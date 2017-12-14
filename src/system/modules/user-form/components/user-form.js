import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';

import InputField from '../../input-field';
import InputText from '../../input-text';
import InputDate from '../../input-date-picker';
import InputSignUpPasswords from '../../input-sign-up-passwords';
import ValidationMessage from '../../validation-message';
import { formContainer, errorClass, accountSection, personSection, 
		 addressSection, accountIcon, personIcon, addressIcon, formHeader } from '../styles';

const userForm = (state) => {
	return (
		<div className={formContainer}>
			<div className={ accountSection }>
				<div className={ formHeader }>
					<i className={ `fa fa-user ${accountIcon}` } />
					<div>Account</div>
				</div>
				<div>
					<InputField id="Email" label="Email" errorDelay={1500} errorMessage="Enter a valid email address" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "isEmail" ] } />
					</InputField>
				</div>
				<div>
					<InputSignUpPasswords id="UserFormPasswords" isUserField={true} />
				</div>
			</div>
			<div className={ personSection }>
				<div className={ formHeader }>
					<i className={ `fa fa-file-text ${personIcon}` } />
					<div>Personal Details</div>
				</div>
				<div>
					<InputField id="FirstName" label="Given Name" errorMessage="Please enter your given name." errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="FamilyName" label="Family Name" errorMessage="Please enter your family name." errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="DateOfBirth" label="Date of Birth" errorMessage="Enter a valid date" errorDelay={2000} errorClass={ errorClass }>
						<InputDate isUserField={true} validations={ [ "isDate" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="PhoneNumber" label="Phone Number" errorMessage="Enter your phone number" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "isNumber" ] } />
					</InputField>
				</div>
			</div>
			<div className={ addressSection }>
				<div className={ formHeader }>
					<i className={ `fa fa-home ${addressIcon}` } />
					<div>Account</div>
				</div>
				<div>
					<InputField id="Address1" label="Address 1" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="Address2" label="Address 2">
						<InputText isUserField={true} />
					</InputField>
				</div>
				<div>
					<InputField id="Suburb" label="Suburb" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="City" label="City" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
				<div>
					<InputField id="PostCode" label="Post Code" errorClass={ errorClass }>
						<InputText isUserField={true} validations={ [ "notEmpty" ] } />
					</InputField>
				</div>
			</div>
			
		</div>
	);
};

export default moduleStatepublisher(userForm, "UserForm");
