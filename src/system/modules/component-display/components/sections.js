import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Section from './section';
import DetailToggleList from '../../detail-toggle-list'
import SectionHeader from './section-header';
import { body } from '../styles'

const sections = (state) => <div className={ body }>
  <DetailToggleList id="DemoComponents" isRoot={true}>
    <SectionHeader />
    <Section />
  </DetailToggleList>
</div>

module.exports = moduleStatepublisher(sections, "Sections");
