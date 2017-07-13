import React from 'react'
import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { toTimeline } from '../../../stores/animation-store';
import { positions, positionAwareListItemActions } from './position-aware-list-item-store';

const toUpdateListenerActions = (state) => state.component === "PositionAwareListUpdateListener" && state.componentEvent === "component-update";

const listenerUpdates = Actions.filter(toUpdateListenerActions);

module.exports = {
	listenerUpdates
}
