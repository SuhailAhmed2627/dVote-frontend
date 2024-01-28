const snarkjs = require("snarkjs");

export async function createProof(pub) {
  return await snarkjs.plonk.fullProve(
    pub,
    "./snark_data/ticket_spender_js/ticket_spender.wasm",
    "./snark_data/ticket_spender_final.zkey"
  );
}

export async function getSoliditySnark(proof, pub) {
  const callargs = await snarkjs.plonk.exportSolidityCallData(proof, pub);
  console.log(callargs.slice(0, callargs.indexOf(",")));
  return callargs.slice(0, callargs.indexOf(","));
}
