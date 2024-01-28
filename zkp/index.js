const express = require("express");
const snark = require("./snark.js");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.post("/verifyProof", async (req, res) => {
	console.log("verifyProof received for ticket :", req.body.ticket);
	fullSpendTicket(
		req.body.merkleProof,
		req.body.secret,
		req.body.option,
		req.body.merkleRoot,
		req.body.ticket,
		req.body.serial
	)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send(err);
		});
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
	serial
) {
	// get ticket and serial

	// build a zksnark
	const zksnark = await snark.createProof({
		option: option,
		serial: serial,
		root: merkleRoot,
		ticket: ticket,
		secret: secret,
		proof: merkleProof,
	});

	// get solidity formatted proof
	const solproof = await snark.getSoliditySnark(
		zksnark.proof,
		zksnark.publicSignals
	);

	return {
		proof: solproof,
	};
}
