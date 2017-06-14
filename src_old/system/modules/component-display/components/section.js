import React from 'react';
import Read from '../../../components/read-state'
import { SectionStyle, HeadingStyle, ContentStyle } from '../styles/section.style';

const section = (state) => {
  const Component = state.component;
  const component = Component ? <Component /> : null;
      return (
      <div className={SectionStyle}>
        <div className={`${ContentStyle}`}>
          {component}
        </div>
      </div>
    );
}

module.exports = Read(section, "Section");
