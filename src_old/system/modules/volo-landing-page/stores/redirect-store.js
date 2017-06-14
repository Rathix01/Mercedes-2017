import Actions from '../../../../actions/actions';
import R from 'ramda';

const toLifeStyleClick = (state) => state.component === "LifeStylePage";
const toTravelClick = (state) => state.component === "TravelPage";
const toRedirect = R.curry(( url, state ) => window.open(`http://test.volo.nz/${url}`))

Actions.filter(toLifeStyleClick).onValue(toRedirect("sign-up"));
Actions.filter(toTravelClick).onValue(toRedirect("travel-sign-up"));