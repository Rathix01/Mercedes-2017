import Bacon from 'baconjs';
import R from 'ramda';
import Q from 'q';

const getJSON = (response) => response.json();
const resolvePromise = R.curry((deferred, data) => deferred.resolve(data));
const doFetch = (key) => fetch(`http://rpg.insertcoin.co.nz/character/${key}?system=whfb1`);

const toCharacterRequest = (state) => {
	var d = Q.defer();
	doFetch(state).then(getJSON).then(resolvePromise(d));
  	return Bacon.fromPromise(d.promise);
};

const toNextCharacter = ( characters, nextCharacter ) => {
	return ({ next: nextCharacter, count: characters.length })
};

const addCharacter = (prev, nextCharacter) => ({ count: nextCharacter.count, characters: prev.characters.concat(nextCharacter.next) });
const toAllCharacters = (state) => state.characters.length === state.count; 

const characters = ['petyr_rasen', 'alikempa_mezbarna', 'laurelane'];
const characterBus = new Bacon.Bus();

const characterData = characterBus.flatMap(Bacon.fromArray).flatMap(toCharacterRequest);
const nextCharacter = Bacon.when([ characterBus.toProperty(), characterData.toEventStream() ], toNextCharacter);
const allCharacters = nextCharacter.scan({ characters:[], count: 0 }, addCharacter).filter(toAllCharacters).map(R.prop("characters"));

// Temporary.
setTimeout(() => characterBus.push(characters), 1000);

module.exports = {
	characterData, allCharacters
};
