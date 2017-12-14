import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { keyword, keywordRemove, keywordAdd, keywordValue } from '../styles';

const isInstance = (shouldbe, state) => state.isInstance !== shouldbe ? "none" : "block";

const dynamicFormAdminRulesKeyword = (state) => <div className={keyword}>
	<div className={keywordValue}>{ state.value }</div> 
	<div className={keywordRemove} style={{ display: isInstance(true, state) }}>
		<i className="fa fa-close"></i>
	</div>
	<div className={keywordAdd} style={{ display: isInstance(false, state) }}>
		<i className="fa fa-plus"></i>
	</div>
</div>;

export default readWrite(dynamicFormAdminRulesKeyword, "DynamicFormAdminRulesKeyword");