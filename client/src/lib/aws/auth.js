import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports.js';

export const initAuth = () => {
	try {
		Amplify.configure(awsconfig);
	} catch (error) {
		console.error(error.message);
	}
};

export const isUserAuth = () => {
	return Auth.currentAuthenticatedUser();
};

// Sign Up

export const signUp = async (username = '', password = '', attributes = {}) => {
	try {
		const { user } = await Auth.signUp({
			username,
			password,
			attributes,
		});
		console.log(user);
	} catch (error) {
		console.error(error.message);
	}
};

export const confirmSignUp = async (username = '', code = '') => {
	try {
		await Auth.confirmSignUp(username, code);
	} catch (error) {
		console.error(error.message);
	}
};

// Sign In

export const signIn = (username = '', password = '') => {
	return Auth.signIn(username, password);
};

// Forgot Password

// Send confirmation code to user's email
export const forgotPassword = (username = '') => {
	return Auth.forgotPassword(username);
};

// Collect confirmation code and new password, then
export const forgotPasswordSubmit = (
	username = '',
	code = '',
	newPassword = ''
) => {
	return Auth.forgotPasswordSubmit(username, code, newPassword);
};

// Sign Out

export const signOut = () => {
	return Auth.signOut();
};
