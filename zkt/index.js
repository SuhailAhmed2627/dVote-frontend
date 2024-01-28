import express from "express";
import { createProof, getSoliditySnark } from "./snark";

const app = express();
const port = process.env.PORT || 3000;

app.post("/", (req, res) => {
  fullSpendTicket(
    req.body.merkleProof,
    req.body.secret, 
    req.body.option,
    req.body.merkleRoot,
    req.body.ticket,
    req.body.serial,
  ).then((result) => {
    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


async function fullSpendTicket(
  merkleProof,
  secret,
  option,
  merkleRoot,
  ticket,
  serial,
) {
  // get ticket and serial

  // build a zksnark
  const zksnark = await createProof({
    option: option,
    serial: serial,
    root: merkleRoot,
    ticket: ticket,
    secret: secret,
    proof: merkleProof,
  });

  // get solidity formatted proof
  const solproof = await getSoliditySnark(zksnark.proof, zksnark.publicSignals);

  return {
    proof : solproof,
  };
}