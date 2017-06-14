import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';

const sections = [];

const register = (section) => {
  sections.push(section);
};

const sortSection = (item) => (R.prop('order', item) || R.prop('key', item)).toString();
const sortSections = R.sortBy(sortSection);

const getPath = () => window.location.pathname.replace('/', '');

const filterSection = R.curry((path, section) => (path ? path === section.key : section));
const filterSections = R.filter(filterSection(getPath()));

const getSections = () => R.pipe(filterSections, sortSections)(sections);
const toItems = (state) => ({ items: state });

//Bacon.once({}).delay(100).map(getSections).map(toItems).onValue(publish("DemoComponents"))
Bacon.once({}).delay(100).map(getSections).map(toItems).onValue(publish("ComponentDisplayPageBar"))

//ComponentDisplayPageBar
module.exports = {
  register,
  getSections
};