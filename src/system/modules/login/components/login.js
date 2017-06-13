import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import LoginForm from './login-form';

const login = (state) => <LoginForm id="LoginForm" />

module.exports = moduleStatepublisher(login, "Login");