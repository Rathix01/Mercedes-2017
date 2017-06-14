import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './components/lockbox-section';

SectionStore.register({
  key: 'lockbox-section',
  title: 'Lockbox Description',
  component: DemoComponent
});
