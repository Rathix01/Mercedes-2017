import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles'

const LifeStylePage = (state) => {
	return <div className={ Styles.lifeStyle }>
		<h1 className={ Styles.sectionTitle }> LifeStyle </h1>
		<div className={ Styles.productInfo }>
			<div className={ Styles.lifestyleBackground }>
				<i className={ `${ Styles.lifestyleBackgroundIcon } fa fa-male` } />
			</div>
			<div className={ Styles.productText }>
				<p>
					Our LifeStyle product <strong>has you covered</strong> against disablities, cancer, accidents and much more.
				</p>
				<p> 
					LifeStyle includes all the main insurance products you need.
					Life, Total Permanent Disability, Trauma and Income Protection all rolled into
					a <strong>single product with agreed benefits</strong> and much much more.
				</p>
				<p>
					LifeStyle is simple, there is <strong>one policy, one price, and no excess on claims</strong>. Sign up, customize 
					your cover and make claims online. No doctors visits, faxes, or snail mail, you will be covered in minutes.
				</p>
				<p>
					LifeStyle is affordable, you can <strong>insure your lifestyle without having to change it.</strong>&nbsp;
					Independent research revealed Volo is competitively priced and is not biased towards
					gender or age. One fair and affordable price for all.
				</p>
				<button className={ Styles.seeMoreLifeBtn } onClick={ state.handleEvent }>Get LifeStyle Cover</button>
			</div>
		</div>
	</div>
}

export default readAndWrite(LifeStylePage, "LifeStylePage");
