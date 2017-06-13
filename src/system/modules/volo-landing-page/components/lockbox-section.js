import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles';
import LockBoxStyles from '../styles/lockbox-styles';

const LockBoxSection = (state) => {
	return <div className={ LockBoxStyles.container }>
		<h1 className={ Styles.sectionTitle }> LockBox </h1>
		<div className={ Styles.productInfo }>
			<div className={ LockBoxStyles.icon }>
				<i className={ `${ LockBoxStyles.iconFont } fa fa-lock` } />
			</div>
			<div className={ Styles.productText }>
				<p>
					Lockbox is ultra-secure online storage for your important documents. 
					Access your lockbox online with your smartphone or computer.
				</p>
				<p>
					 When you get cover with Volo you get a free subscription to LockBox which
					 means secure online storage of all your vital lifestyle and travel documents.
                </p>
                <p>
                	Lockbox can securely store any and all of your documents while allowing you
                	to access them quickly and safely. You could keep a copy of your passport, your travel documents,
                	heartbeat summary, or even your favourite cat pics.
                </p>
			</div>
		</div>
	</div>
}

export default readAndWrite(LockBoxSection, "LockBoxSection");
