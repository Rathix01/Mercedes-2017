import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import InputText from '../../input-text';
import List from '../../list';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import StateListener from '../../../components/state-listener';
import AutocompleteItem from './input-autocomplete-item';
import { container, inputContainer, searchIcon, searchInput, autoCompleteList, getSearchIconColours } from '../styles';

const inputAutoComplete = (state) => {
	return <div>
			<div className={inputContainer} style={{ border: state.border }}>
				<InputText id={ `${state.id}AutoCompleteTextInput` }
						   rootId={ state.id }
						   isAutoCompleteText={ true }
						   searchType={ state.searchType || "default" }
						   searchKeys={ state.searchKeys }
						   uniqueId={ state.uniqueId }
						   className={`${searchInput}  
						   ${state.inputStyle} 
						   ${getSearchIconColours(state.colors.orgColor1)}`} />
				<div className={ searchIcon }>
					<i className="fa fa-search"></i>
				</div>
			</div>
			<div>

			</div>
			<VisibilityContainer id={ `${state.id}ListVisibility` }>
				<AnimationContainer id={ `${state.id}ListAnimation` }>
					<List id={ `${state.id}Items` } className={ autoCompleteList }>
						<AutocompleteItem isAutoCompleteItem={true} />
					</List>
				</AnimationContainer>
			</VisibilityContainer>
			<StateListener id={ `${state.id}Updates` } isQuestion={true} label="Label" formInputType="InputAutoComplete" uniqueId={ state.uniqueId }  />
		</div>
}

export default moduleStatepublisher(inputAutoComplete, "InputAutoComplete")