import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DynamicFormAdminRulesKeyword from './dynamic-form-admin-rules-keyword';

import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import List from '../../list';
import Tabs from '../../tabs';

import { rulesEditor, row, btnRow, newForm, keywords } from '../styles';

const dynamicFormAdminRulesEditor = (state) => {
	return (
		<div className={rulesEditor}>
			<Tabs id="RulesAndKeywords" labels={ ["Rules", "Keywords"] }>
				<div> Rules </div>
				<div>
					<div className={row}>
						<label>Form Keywords</label>
						<div> 
							<List id="KeywordsForForm" className={keywords}>
								<DynamicFormAdminRulesKeyword isInstance={false} />
							</List>
						</div>
					</div>
					<div className={row}>
						<label>Item Keywords</label>
						<div> 
							<List id="KeywordsForEditItem" className={keywords}>
								<DynamicFormAdminRulesKeyword isInstance={true} />
							</List>
						</div>
					</div>
					<div className={row}>
						<label>New Keyword</label>
						<div> 
							<InputText id="ComponentKeywords" /> 
						</div>
					</div>
				</div>
			</Tabs>
		</div>
	);
};

export default readWrite(dynamicFormAdminRulesEditor, "DynamicFormAdminRulesEditor");