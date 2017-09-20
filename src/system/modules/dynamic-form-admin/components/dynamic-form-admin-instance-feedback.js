import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Tabs from '../../tabs';
import {  positiveNotification, saving, fixedContainer } from '../styles';

const dynamicFormAdminInstanceFeedback = (state) => {
	return (
		<div className={fixedContainer}>
			<VisibilityContainer id="SavingNotificationVisibility" defaultVisibility={false}>
				<AnimationContainer id="SavingNotificationAnimation">
					<div className={saving}>
						<i className="fa fa-arrow-circle-up"></i> Saving
					</div>
				</AnimationContainer>
			</VisibilityContainer>
			<VisibilityContainer id="SavedNotificationVisibility" defaultVisibility={false}>
				<AnimationContainer id="SavedNotificationAnimation">
					<div className={positiveNotification}>
						<i className="fa fa-check-circle"></i> Save Successful
					</div>
				</AnimationContainer>
			</VisibilityContainer>
		</div>
	);
};

export default readWrite(dynamicFormAdminInstanceFeedback, "DynamicFormAdminInstanceFeedback");
