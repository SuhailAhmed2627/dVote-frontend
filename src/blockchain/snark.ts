import { CircuitSignals, PlonkProof, plonk, PublicSignals } from "snarkjs";

export async function createProof(pub: CircuitSignals) {
	return await plonk.fullProve(
		pub,
		"./contracts/snark_data/ticket_spender_js/ticket_spender.wasm",
		"./contracts/snark_data/ticket_spender_final.zkey"
	);
}

export async function getSoliditySnark(proof: PlonkProof, pub: PublicSignals) {
	const callargs = await plonk.exportSolidityCallData(proof, pub);
	console.log(callargs);
	return callargs.slice(0, callargs.indexOf(","));
}
