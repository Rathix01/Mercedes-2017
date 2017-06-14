import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles';
// import HeartBeatStyles from '../styles/heartbeat-styles';
import HeartBeatLogo from '../images/heartbeat-logo.png'

const HeartBeatSection = (state) => {
	return <div className={ Styles.container }>
		<h1 className={ Styles.sectionTitle }> Heartbeat </h1>
		<div className={ Styles.productInfo }>
			<div className={ Styles.icon }>
				<img src={ HeartBeatLogo } className={ Styles.iconImage } />
			</div>
			<div className={ Styles.productText }>
				<p>
					HeartBeat is a free service that will give you access to a secure encrypted copy
                    of your medical records on your volo mobile app or via a web based dashboard.
				</p>
				<p>
					In the event of a medical emergency
                    your up to date health summary, including your medications, allergies
                    and any specific conditions will be available for you to securely share
                    with your medical provider. This ensures you can receive the right
                    medical treatment as quickly as possible.
                </p>
                <p>
                	The heartbeat service is optionally included in our Travel product.
                </p>
			</div>
		</div>
	</div>
}

export default readAndWrite(HeartBeatSection, "HeartBeatSection");
