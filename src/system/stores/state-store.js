const Bacon = require('baconjs');
const R = require('ramda');

const stateUpdates = new Bacon.Bus();

const publish = R.curry((key, state) => {
  return stateUpdates.push({ state, key } );
});

const currentState = stateUpdates.scan({}, (current, update) => {
    const version = current[update.key] !== undefined ? ( current[update.key].version + 1 ) : 1
    const nextUpdate = { [update.key]: R.merge( update.state, {version} ) };
    return R.merge( current, nextUpdate );
});

//if (process.env.NODE_ENV !== 'production') {
  if (window) {
    currentState.onValue(state => { window.currentState = state; });
  }
//}

// a required no op. please dont remove.
currentState.onValue(() => {});

export { currentState }
export default publish;
