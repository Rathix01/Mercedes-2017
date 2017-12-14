import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

const toDealerSelection = (state) => state.component === "MercedesBenzWebsiteFormPageDealer";
const toItems = (state) => ({ items: state });

Services.dealers.map(toItems).onValue(publish("DealerList"));

const dealerSelectionEvent = Actions.filter(toDealerSelection);
dealerSelectionEvent.map({ display: false }).onValue(publish("FormPageDealerVisibility"));
dealerSelectionEvent.map({ display: true }).onValue(publish("FormPageLicenseVisibility"));