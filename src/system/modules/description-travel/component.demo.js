import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './components/travel-section';

SectionStore.register({
  key: 'travel-section',
  title: 'Travel Description',
  component: DemoComponent
});
