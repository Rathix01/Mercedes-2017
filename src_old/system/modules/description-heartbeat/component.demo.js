import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './components/heartbeat-section';

SectionStore.register({
  key: 'heartbeat-section',
  title: 'Heartbeat Description',
  component: DemoComponent
});
