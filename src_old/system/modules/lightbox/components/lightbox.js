import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Styles from '../styles';
import AnimationContainer from '../../animation-container'

const getStyles = (state) => {
	return { "display": state.display ? "block" : "none", "opacity": state.display ? "1": "0" }
}

const Lightbox = (state) => {
    return ( <div className={ Styles.container } style={ getStyles(state) }>
    			<div className={ Styles.x } onClick={state.handleEvent}>
                    <AnimationContainer id={ state.id + "XAnimation" }>
        				<i className="fa fa-close" onClick={state.handleEvent} />
        			</AnimationContainer>
                </div>
	    		<AnimationContainer id={ state.id + "Animation" } className={ Styles.box }>
	          		{ state.children }
	          	</AnimationContainer>
        </div>  )
  }

export default readAndWrite(Lightbox, "Lightbox");