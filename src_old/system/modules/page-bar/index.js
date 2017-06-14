import PageBar from './components/page-bar';
import './stores/page-bar-store';
import './stores/page-bar-button-update-store';
import { pagesAndChange, nextPage } from './stores/page-bar-store';

export default PageBar;
exports.pagesAndChange = pagesAndChange;
exports.nextPage = nextPage;