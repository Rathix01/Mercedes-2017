import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles'

const Logo = (state) => {
	return <div className={ Styles.container }>
		<div className={Styles.logoArea}>
			<img src='http://test.volo.nz/images/volo.png' 
				 className={ Styles.voloLogo } 
				 onMouseOver={state.handleEvent}
				 onMouseOut={state.handleEvent} />
		</div>
		<div className={ Styles.voloDescription }>
			<span className={ Styles.keyWord }>{ state.value }</span>
			<br /> 
			Insurance Products
			<br /> 
			for 18 to 35s
		</div>
		<div className={ Styles.loginArea }>
			<button onClick={state.handleEvent} className={ Styles.loginButton }>
				<i className='fa fa-lock'></i> Login
			</button>
		</div>
	</div>
}

export default readAndWrite(Logo, "Logo");