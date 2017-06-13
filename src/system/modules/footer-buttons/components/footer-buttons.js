import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles'

const FooterButtons = (state) => {
	return <div className={ Styles.container }>
		<button className={ Styles.button } onClick={state.handleEvent}> FAQ </button>
		<button className={ Styles.button } onClick={state.handleEvent}> Terms & Conditions </button>
		<button className={ Styles.button } onClick={state.handleEvent}> Privacy Policy </button>
	</div>
}

export default readAndWrite(FooterButtons, "FooterButtons");