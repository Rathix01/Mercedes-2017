import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { allCharacters } from './character-init-store';

const byInit = (a, b) => a.attributes.initiative < b.attributes.initiative;
const sortItems = (state) => R.sort(byInit, state);
const toListItems = (state) => ({ items: state });

allCharacters.map(sortItems).map(toListItems).onValue(publish("ActorList"));
