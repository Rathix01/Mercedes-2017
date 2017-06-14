import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './components/lifestyle-section';

SectionStore.register({
  key: 'lifestyle-section',
  title: 'LifeStyle Description',
  component: DemoComponent
});
