import { plonk } from "snarkjs";

export async function createProof(pub: any) {
	return await plonk.fullProve(
		pub,
		"./snark_data/ticket_spender_js/ticket_spender.wasm",
		"./snark_data/ticket_spender_final.zkey"
	);
}

export async function getSoliditySnark(proof: any, pub: any) {
	const callargs = await plonk.exportSolidityCallData(proof, pub);
	return callargs.slice(0, callargs.indexOf(","));
}
