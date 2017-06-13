import DetailToggle from './components/detail-toggle-container';
import { open, close, init } from './stores/detail-toggle-store';
import { closeTweens } from './stores/detail-toggle-animation-store';

exports.open = open;
exports.close = close;
exports.init = init;
exports.closeTweens = closeTweens;
export default DetailToggle;