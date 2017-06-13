import React from 'react';
import R from 'ramda';
import read from '../../../components/read-state';

const getBase = (state) => R.merge({
	x: 0, y: 0, z: 0, scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1
}, state);

const getStyles = (state) => {
	return { "transform": "translate3d(" + state.x + "px," + state.y + "px, " + state.z + "px) scale(" + state.scale + ") rotateX(" + state.rotateX + "deg) rotateZ(" + state.rotateZ + "deg) rotateY(" + state.rotateY + "deg)", 
             "WebkitTransform": "translate3d(" + state.x + "px," + state.y + "px, " + state.z + "px) scale(" + state.scale + ") rotateX(" + state.rotateX + "deg) rotateZ(" + state.rotateZ + "deg) rotateY(" + state.rotateY + "deg)",
             opacity: state.opacity }
}

const animationContainer = (state) => {
    return ( <div className={ state.className } style={ getStyles(getBase(state)) }>
          { state.children }
        </div>  )
  }

 export default read(animationContainer, "AnimationContainer");