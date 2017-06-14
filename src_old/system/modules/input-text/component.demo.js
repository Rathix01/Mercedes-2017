import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './demo/demo-component';
import './demo/demo-store';

SectionStore.register({
  key: 'input-text',
  title: 'Basic Text Input (with text display)',
  component: DemoComponent
});
