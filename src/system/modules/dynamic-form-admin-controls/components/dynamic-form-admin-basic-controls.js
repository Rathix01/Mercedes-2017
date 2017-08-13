import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { basicControls, editBtn, deleteBtn, clickArea } from '../styles';

const dynamicFormAdminBasicControls = (state) => {
	return (
		<div className={ basicControls }>
			<div className={editBtn}>
				<i className="fa fa-edit"></i>
				<div id="basic-edit" onClick={ state.handleEvent } className={clickArea}></div>
			</div>
			<div className={deleteBtn}>
				<i className="fa fa-close"></i>
				<div id="basic-delete" onClick={ state.handleEvent } className={clickArea}></div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminBasicControls, "DynamicFormAdminBasicControls");
