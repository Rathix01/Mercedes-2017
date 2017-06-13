import React from 'react';
import read from '../../../components/read-state'
import { header, title, initBubble } from '../styles';

const warhammerActorHeader = (state) => {
      return (
        <div className={ header }>
          <div className={ title }>{ state.title }</div>
          <div className={ title }>{ state.summary.race }</div>
          <div className={ title }>{ state.career.title }</div>
          <div className={ initBubble }>{ state.attributes.wounds }</div>
          <div className={ initBubble }>{ state.attributes.initiative }</div>
        </div>
    );
}

module.exports = read(warhammerActorHeader);