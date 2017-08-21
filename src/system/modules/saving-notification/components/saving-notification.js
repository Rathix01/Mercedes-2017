import React from 'react';
import moduleStatePublisher from '../../../components/module-state-publisher';
import { genericToolsContainer, fixedContainer } from '../styles';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Tabs from '../../tabs';
import { positiveNotification, saving } from '../styles';

const savingNotification = (state) => {
	return (
		<div>
			<VisibilityContainer id={`${state.id}SavingNotificationVisibility`} defaultVisibility={false}>
				<AnimationContainer id={ `${state.id}SavingNotificationAnimation`}>
					<div className={saving}>
						<i className="fa fa-arrow-circle-up"></i> Saving
					</div>
				</AnimationContainer>
			</VisibilityContainer>
			<VisibilityContainer id={`${state.id}SavedNotificationVisibility`} defaultVisibility={false}>
				<AnimationContainer id={ `${state.id}SavedNotificationAnimation` }>
					<div className={positiveNotification}>
						<i className="fa fa-check-circle"></i> Save Successful
					</div>
				</AnimationContainer>
			</VisibilityContainer>
		</div>
	);
};

export default moduleStatePublisher(savingNotification, "SavingNotification");