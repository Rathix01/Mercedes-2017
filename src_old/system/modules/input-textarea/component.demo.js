import SectionStore from '../component-display/stores/section-store';
import DemoComponent from './demo/demo-component';
import './demo/demo-store';

SectionStore.register({
  key: 'input-textarea',
  title: 'Text Area Input',
  component: DemoComponent
});
