import Bacon from 'baconjs';
import R from 'ramda';
import M from 'moment';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';


const ORC = 1500;
const PPSR = 245.45;
const GST = 0.15;
const depositPercentage = 0.22
const finalPaymentPercentage = 0.28

const isCarUpdate = (state) => state.id === "SelectedCar" && state.componentEvent === "component-update";
const toNumberWithCommas = (number) => parseFloat(number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const toGST = (state) => ((state.rrp + ORC + PPSR) * GST)
const toTotal = (state) => ((state.rrp + ORC + PPSR));
const toTotalWithGST = (state) => (toTotal(state) + toGST(state));
const toDeposit = (state) => (toTotal(state) * depositPercentage).toFixed(0);
const toFinalPayment = (state) => (toTotal(state) * finalPaymentPercentage).toFixed(0);
const toNumberOfWeeks = (date, term) => (M.utc(date).add((term / 12),'y').diff(M.utc(date), 'week'));
const toWeeklyPayment = (d, f, t, state) => Math.round((toTotal(state) - d - f) / toNumberOfWeeks(new Date(), t) * 100) / 100;

const toDisplay = (state) => ({ ...state, 
								rrp: toNumberWithCommas(state.rrp),
								total: toNumberWithCommas(toTotalWithGST(state)) });

const toDisplayValue = (state) => {
	//.console.log(state);
	return ({ value: toNumberWithCommas(state) })
}

//populate calculator
const carUpdate = Actions.filter(isCarUpdate);

// display values in component.
carUpdate.map(toDisplay).onValue(publish("FormCalculator"));

const deposit = carUpdate.map(toDeposit);
const finalPayment = carUpdate.map(toFinalPayment);
const term = Bacon.once(24);

const weeklyPayments = Bacon.when([ deposit.toProperty(), 
								  	finalPayment.toProperty(), 
									term.toProperty(),
									carUpdate ], toWeeklyPayment)//.log('weeks')

deposit.log('deposit').map(toDisplayValue).onValue(publish("DepositAmount"));
finalPayment.log('final payment').map(toDisplayValue).onValue(publish("FinalPaymentAmount"));
weeklyPayments.log('weekly').map(toDisplayValue).onValue(publish("WeeklyAmount"));