import { JsonRpcSigner } from "ethers";
import { LOGIN_SUCCESS } from "./types";

export const loginSuccess = (data: JsonRpcSigner) => {
	return {
		type: LOGIN_SUCCESS,
		payload: data,
	};
};
