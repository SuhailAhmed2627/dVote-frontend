# DVote

DVote is a cutting-edge Decentralized Voting Progressive Web Application, ingeniously harnessing the transformative potential of blockchain technology. This innovative platform revolutionizes the traditional voting paradigm by adopting a decentralized approach, mitigating reliance on a centralized authority. The Progressive Web Application (PWA) architecture ensures a seamless and responsive user experience, while the incorporation of blockchain technology serves as the bedrock for a secure, transparent, and tamper-resistant voting system.

## Features

-  Secured Voting Mechanism
-  Anonymous Voting System through ZKP(Zero-Knowlege Proof)
-  Prevention Of Electoral Frauds.
-  Realtime visualization of Election Results.
-  Progressive Web Application

## Tech

DVote uses a number of open source projects to work properly:

-  [CosVM](https://cosvm.network/)
-  [Solidity](https://soliditylang.org/)
-  [Ether](https://docs.ethers.org/v6/)
-  [TypeScript](https://www.typescriptlang.org/)
-  [ZkSnark](https://www.npmjs.com/package/snarkjs)
-  [React](https://reactjs.org/)
-  [Mantine UI](https://mantine.dev/)
-  [React-Redux](https://react-redux.js.org/)
-  [Tailwind-CSS](https://tailwindcss.com/)

## Installation and Setup

Clone the repository to your local device and

1. Install the required dependencies:

```bash
yarn install:dep
```

2.

```bash
cp config.example.ts config.ts
```

and make any necessary changes.

3. Start the Vite Development Server in developer mode:

```bash
yarn start
```

4. Deploy the smart contracts On CosVM:

```bash
yarn deploy:cosvm
```

The server should be running at your 127.0.0.1 port 3000 (or the port specified in `config.ts`).

## Election Registration

To register an election, the `registerElection` function is called with the following parameters:

-  `electionId`: a randomly generated 256-bit number for unique identification;
-  `voters`: an array containing addresses of eligible voters;
-  `start`: the start of the voting period (Unix time);
-  `end`: the end of the voting period (Unix time).

### Ticket Registration

Before registering a ticket, a secret 256-bit number and a voting option must be selected. The ticket is registered before the voting period begins by calling `registerTicket` with the following parameters:

-  `electionId`: the ID of the election;
-  `ticket`: the Poseidon commitment of the secret and vote option, calculated as `poseidon(secret, option)`.

This action adds the ticket to the list of all registered tickets.

> **Warning:**
> Tickets can only be registered from eligible addresses, and each address is limited to one registration. Once registered, tickets cannot be deleted or replaced.

### Ticket Expenditure

During the voting period, tickets can be spent by calling `spendTicket` with the following parameters:

-  `electionId`: the ID of the election;
-  `merkleRoot`: the root of the Merkle tree (21 levels deep), constructed from the array of registered tickets;
-  `option`: the voting option chosen;
-  `serial`: the ticket's serial number, calculated as `poseidon(secret, ticket)`;
-  `proof`: a zk-SNARK generated from the values:
   -  `option`,
   -  `serial`,
   -  `merkleRoot`,
   -  `ticket`,
   -  `secret`,
   -  `merkleProof`.

The proof asserts the validity of `merkleProof` as evidence that the `ticket` is within a Merkle tree with root `merkleRoot`, and it confirms that `ticket = poseidon(secret, option)` and `serial = poseidon(secret, ticket)`.

# UI & Flow

![5](https://github.com/SuhailAhmed2627/dVote-frontend/assets/71443682/f2e162fb-9d64-4129-a987-9e00acd5798f)
![1](https://github.com/SuhailAhmed2627/dVote-frontend/assets/71443682/2f61c389-9031-4be8-a0e2-baf39fc67754)
![2](https://github.com/SuhailAhmed2627/dVote-frontend/assets/71443682/c1f60342-3046-4491-8db9-d09c7c479c1b)
![3](https://github.com/SuhailAhmed2627/dVote-frontend/assets/71443682/636d0468-2dbc-4bdb-b70e-61fcc4766f09)
![4](https://github.com/SuhailAhmed2627/dVote-frontend/assets/71443682/1ae2f925-4c05-4598-aa73-52fffc5465ef)
