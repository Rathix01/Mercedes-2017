import React from 'react';
import read from '../../../components/read-state';
import DisplayField from '../../display-field';
import { row, altRow, headerRow, cell }  from '../styles';

const warhammerActorPanel = (state) => {
	return  (<div>
				<div className={ headerRow }>
					Summary
				</div>
				<div className={ row }>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }Age` } value={ state.summary.age } label="Age" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }Height` } value={ state.summary.height } label="Height" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }Weight` } value={ state.summary.weight } label="Weight" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }Hair` } value={ state.summary.hair } label="Hair" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }Eyes` } value={ state.summary.eyes } label="Eyes" stack={ true } />
					</div>
				</div>
				<div className={ row }>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }CurrentCareer` } value={ state.summary.career } label="Current Career" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }CareerPath` } value={ state.summary.career_path } label="Career Path" stack={ true } />
					</div>
					<div className={ cell }>
						<DisplayField id={ `${ state.id }CareerExits` } value={ state.summary.career_exits } label="Career Exits" stack={ true } />
					</div>
				</div>

				<div className={ headerRow }>
					Attributes
				</div>
				<div className={ row }>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.movement } label="M" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.weapons } label="WS" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.ballistics } label="BS" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.strength } label="S" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.toughness } label="T" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.wounds } label="W" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.initiative } label="I" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.attacks } label="A" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.dexterity } label="Dex" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.leadership } label="Ld" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.intelligence } label="Int" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.cool } label="Cl" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.willpower } label="WP" /></div>
					<div className={ cell }><DisplayField id={ `${ state.id }CareerTitle` } stack={ true } value={ state.attributes.fellowship } label="Fel" /></div>
				</div>
			</div>);
}

export default read(warhammerActorPanel)