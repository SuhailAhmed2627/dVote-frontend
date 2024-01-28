const snark = require("snarkjs");

async function createProof(pub) {
	return await snark.plonk.fullProve(
		pub,
		"./snark_data/ticket_spender_js/ticket_spender.wasm",
		"./snark_data/ticket_spender_final.zkey"
	);
}

async function getSoliditySnark(proof, pub) {
	const callargs = await snark.plonk.exportSolidityCallData(proof, pub);
	console.log(callargs.slice(0, callargs.indexOf(",")));
	return callargs.slice(0, callargs.indexOf(","));
}

module.exports = {
	createProof,
	getSoliditySnark,
};
