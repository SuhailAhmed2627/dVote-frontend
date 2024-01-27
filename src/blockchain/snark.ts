import { plonk } from "snarkjs";

export async function createProof(pub: any) {
	return await plonk.fullProve(
		pub,
		"./contracts/snark_data/ticket_spender_js/ticket_spender.wasm",
		"./contracts/snark_data/ticket_spender_final.zkey"
	);
}

export async function getSoliditySnark(proof: any, pub: any) {
	const callargs = await plonk.exportSolidityCallData(proof, pub);
	console.log("Proof CallArgs: ", callargs);
	// regex to remove all special characters
	return callargs.slice(2, callargs.indexOf(",") - 1);
}
