import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DashboardSection from './dashboard-section';
import DetailToggleList from '../../detail-toggle-list'
import DashboardSectionHeader from './dashboard-section-header';
import { body, header, headerContent } from '../styles'

const dashboardSections = (state) => <div className={ body }>
  <div className={ header }>
	<div className={ headerContent }>
		<h1> Dashboard </h1>
	</div>
  </div>
  <DetailToggleList id="DashboardSections" isRoot={true}>
    <DashboardSectionHeader />
    <DashboardSection />
  </DetailToggleList>
</div>

module.exports = moduleStatepublisher(dashboardSections, "DashboardSections");