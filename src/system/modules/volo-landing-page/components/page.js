import React from 'react';
import read from '../../../components/read-state';
import Styles from '../styles'
import PageSection from '../../page-section';
import Header from './header';
import TravelPage from './travel-page';
import LifeStylePage from './lifestyle-page';
import VoloDescription from './volo-description';
import HeartBeatSection from './heartbeat-section';
import LockboxSection from './lockbox-section';
import Contact from '../../contact';
import Lightbox from '../../lightbox';
import FAQ from '../../faq';
import Privacy from '../../privacy';
import TermsAndConditions from '../../terms-and-conditions';

const Page = (state) => {
	return <div className={ `${ Styles.container } page` }>
		<Header id="Header" />
		<div className={ Styles.sectionsContainer }>
			<PageSection id="Volo">
				<VoloDescription id="VoloDescription" />
			</PageSection>
			<PageSection id="LifeStyle">
				<LifeStylePage id="LifeStylePage" />
			</PageSection>
			<PageSection id="Travel">
				<TravelPage id='TravelPage' />
			</PageSection>
			<PageSection id="HeartBeat">
				<HeartBeatSection id='HeartBeatSection' />
			</PageSection>
			<PageSection id="Lockbox">
				<LockboxSection id='LockBoxSection' />
			</PageSection>
			<PageSection id="Contact">
				<Contact id='ContactPage' />
			</PageSection>
		</div>
		<Lightbox id="FAQLightbox">
			<FAQ id="FAQ" />
		</Lightbox>
		<Lightbox id="TermsAndConditionsLightbox">
			<TermsAndConditions id="TermsAndConditions" />
		</Lightbox>
		<Lightbox id="PrivacyPolicyLightbox">
			<Privacy id="Privacy" />
		</Lightbox>
	</div>
}

export default read(Page);
