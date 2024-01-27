import {  LOGIN_SUCCESS } from "./types";


export const loginSuccess = (data: {
	token: {
		jwt_token: string;
	};
	user: {
		name: string;
		email: string;
	};
}) => {
	return {
		type: LOGIN_SUCCESS,
		payload: {
			name: data.user.name,
			email: data.user.email,
			jwt: data.token.jwt_token,
		},
	};
};
