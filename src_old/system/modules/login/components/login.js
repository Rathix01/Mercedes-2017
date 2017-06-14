import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import LoginForm from './login-form';

const login = (state) => <div>
	<LoginForm id="LoginForm" />
</div>

module.exports = moduleStatepublisher(login, "Login");