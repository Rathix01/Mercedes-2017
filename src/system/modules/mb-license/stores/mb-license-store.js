import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

const toNoLicenseButton	= (state) => state.id === "NoNZLIcense";
const toggleLicense = (prev, state) => ({ hasLicense: !prev.hasLicense });
const toHasLicence = R.curry((shouldBe, state) => state.hasLicense === shouldBe);
const toNextPageButton = (state) => state.id === "NZLicenseNext";

const toggleLicenseAction = Actions.filter(toNoLicenseButton)
const hasLicense = toggleLicenseAction.scan({hasLicense: true}, toggleLicense);
const nextPageAction = Actions.filter(toNextPageButton);

const noLicense = hasLicense.filter(toHasLicence(false));
const license = hasLicense.filter(toHasLicence(true));

noLicense.map({ display: false }).onValue(publish("LicenseFormVisibility"))
noLicense.map({ display: true }).onValue(publish("NoLicenseFormVisibility"))
noLicense.map({ text: "NZ License?" }).onValue(publish("NoNZLIcense"));

license.map({ display: true }).onValue(publish("LicenseFormVisibility"))
license.map({ display: false }).onValue(publish("NoLicenseFormVisibility"))
license.map({ text: "No NZ License?" }).onValue(publish("NoNZLIcense"));

nextPageAction.log('next').map({ display: false }).onValue(publish("FormPageLicenseVisibility"));
nextPageAction.log('next').map({ display: true }).onValue(publish("FormPageAddressVisibility"));