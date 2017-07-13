import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DynamicFormAdminEditForm from './dynamic-form-admin-edit-form';
import DisplayField from '../../display-field';
8
const dynamicFormAdminItemToEdit = (state) => <DynamicFormAdminEditForm id="DynamicFormAdminEditForm" />;

export default moduleStatepublisher(dynamicFormAdminItemToEdit, "DynamicFormAdminItemToEdit");