import React from 'react';
import Read from '../../../components/read-state'
import { HeadingStyle } from '../styles/section.style';

const sectionHeader = (state) => {
      return (
        <div className={HeadingStyle}>
          <h1>{ state.title }</h1>
        </div>
    );
}

module.exports = Read(sectionHeader, "Section");
