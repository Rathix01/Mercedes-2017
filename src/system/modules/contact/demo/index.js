import React from 'react';
import Contact from '../components/contact';
import Lightbox from '../../lightbox';
import FAQ from '../../faq';
import Privacy from '../../privacy';
import TermsAndConditions from '../../terms-and-conditions';
import readAndWrite from '../../../components/read-and-write-state';

const demoContact = (state) => <div>
		<Contact id='DemoContact' />
		<Lightbox id="FAQLightbox">
			<FAQ id="FAQ" />
		</Lightbox>
		<Lightbox id="TermsAndConditionsLightbox">
			<TermsAndConditions id="TermsAndConditions" />
		</Lightbox>
		<Lightbox id="PrivacyPolicyLightbox">
			<Privacy id="Privacy" />
		</Lightbox>
	</div>;

export default readAndWrite(demoContact, "DemoContact");