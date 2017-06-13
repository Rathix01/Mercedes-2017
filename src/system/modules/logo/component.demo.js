import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './components/logo';

SectionStore.register({
  key: 'logo',
  title: 'Volo Logo and Header',
  component: DemoComponent
});
