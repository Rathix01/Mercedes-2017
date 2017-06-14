import React from 'react';
import Read from '../../../components/read-state'
import { SectionStyle, HeadingStyle, ContentStyle } from '../styles/section.style';

const dashboardSection = (state) => {
  const Component = state.component;
  const component = Component ? <Component id={ state.itemKey } componentColor={ state.background } /> : null;
      return (
      <div className={SectionStyle}>
        <div className={`${ContentStyle}`}>
          {component}
        </div>
      </div>
    );
}

module.exports = Read(dashboardSection, "DashboardSection");
