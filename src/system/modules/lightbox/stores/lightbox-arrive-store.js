import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import AnimationStore from '../../../stores/animation-store';

const toLightboxUpdates = (state) => state.component === "LightboxContainer" && state.componentEvent === "component-update";
const publishToLightbox = (state) => publish( state.id + "Lightbox", { display: state.display } );
const isArrival = (state) => state.display === true;

const toDisplayByKey = (state) => ({
  tweenProps: [{
    time: 0.4,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "LightboxAnimation",
    from: { opacity: 0, y: 300 },
    to: { opacity: 1, y: 0, ease: Back.easeOut }
  },{
    time: 0.5,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "LightboxXAnimation",
    from: { opacity: 0, rotateZ: 180 },
    to: { opacity: 1, rotateZ: 0, ease: Back.easeOut }
  }]
});

const lightboxUpdates = Actions.filter(toLightboxUpdates);

lightboxUpdates.onValue(publishToLightbox)
lightboxUpdates.filter(isArrival).map(toDisplayByKey).onValue(AnimationStore.toTimeline);
