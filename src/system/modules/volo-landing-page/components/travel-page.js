import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles'

const TravelPage = (state) => {
	return <div className={ Styles.travel }>
		<h1 className={ Styles.sectionTitle }>Travel</h1>
		<div className={ Styles.productInfo }>
			<div className={ Styles.travelBackground }>
				<i className={ `${ Styles.travelBackgroundIcon } fa fa-plane` } />
			</div>
			<div className={ Styles.productText }>
				<p>
					<strong>Travel in confidence with Volo.</strong>
				</p>
				<p>
					Enjoy total <strong>freedom</strong> and <strong>peace of mind</strong> by investing in
					Volo Travel before you head off on your great adventure.
				</p>
				<p>
					Our partner is the most <strong>trusted</strong> insurance provider for NZers so you will get
					awesome help and your <strong>claims paid</strong>. No wonder they are chosen by over 
					2 million travellers a year.
				</p>
				<p>
					With Volo Travel you will also get a free subscription to your own ultra-secure &nbsp;
					<strong>Lockbox</strong> for all of your vital travel docs. If disaster strikes
					having secure access to all your up to date travels docs and your health snapshot could be a life-saver.
				</p>
				<button className={ Styles.seeMoreTravelBtn } onClick={ state.handleEvent }>Get Travel Cover</button>
			</div>
		</div>
	</div>
}

export default readAndWrite(TravelPage);
