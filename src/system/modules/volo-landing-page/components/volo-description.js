import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles'

const TravelPage = (state) => {
	return <div className={ Styles.volo }>
		<div className={ Styles.voloDetails }>
			<div>
				<h1 className={ Styles.voloSectionTitle }>Be Amazed, Be Inspired, Indulge your Spirit</h1>
			</div>
			<p>Volo cover provides innovative insurance products for 18 to 35 year olds living in New Zealand.</p>
			<p>Buy your insurance direct online and control it from your computer and smartphone</p>
			<p className={Styles.join}>Join Volo today and be covered in just minutes</p>
		</div>
	</div>
}

export default readAndWrite(TravelPage);
