import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { basicControls, editBtn, deleteBtn, clickArea } from '../styles';

const dynamicFormAdminBasicControls = (state) => {
	return (
		<div className={ basicControls }>
			<div className={editBtn}>
				<i className="fa fa-arrow-circle-up"></i>
				<div id="basic-edit-index-up" onClick={ state.handleEvent } className={clickArea} title="Move up 1 position"></div>
			</div>
			<div className={editBtn}>
				<i className="fa fa-arrow-circle-down"></i>
				<div id="basic-edit-index-down" onClick={ state.handleEvent } className={clickArea} title="Move down 1 position"></div>
			</div>
			<div className={editBtn}>
				<i className="fa fa-edit"></i>
				<div id="basic-edit" onClick={ state.handleEvent } className={clickArea} title="Edit this item"></div>
			</div>
			<div className={deleteBtn}>
				<i className="fa fa-close"></i>
				<div id="basic-delete" onClick={ state.handleEvent } className={clickArea} title="Delete this item"></div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminBasicControls, "DynamicFormAdminBasicControls");
