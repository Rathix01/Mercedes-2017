import Bacon from 'baconjs';
import R from 'ramda';
import M from 'moment';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import { nextPostionUpdate } from './content-slider-store';

//nextPostionUpdate.log('nexty')

const toNextPositionTweens = (state) => ({
  tweenProps: [{
    time: 0.5,
    fn: 'fromTo',
    label: 'load-form-page',
    target: `${state.slider.id}Animation`,
    from: { x: (0 - (state.prevX * state.adjustment)) },
    to: { x: (0 -(state.x * state.adjustment)), ease: Power3.easeInOut },
  }]
});


nextPostionUpdate.map(toNextPositionTweens).onValue(toTimeline)