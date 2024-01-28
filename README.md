# DVote

DVote represents a cutting-edge Decentralized Voting Progressive Web Application, ingeniously harnessing the transformative potential of blockchain technology. This innovative platform revolutionizes the traditional voting paradigm by adopting a decentralized approach, mitigating reliance on a centralized authority. The Progressive Web Application (PWA) architecture ensures a seamless and responsive user experience, while the incorporation of blockchain technology serves as the bedrock for a secure, transparent, and tamper-resistant voting system. 

## Features
- Secured Voting Mechanism
- Anonymous Voting System through ZKP(Zero-Knowlege Proof)
- Prevention Of Electoral Frauds.
- Realtime visualization of Election Results.
- Progressive Web Application

## Tech

DVote uses a number of open source projects to work properly:
- [CosVM](https://cosvm.network/)
- [Solidity](https://soliditylang.org/)
- [Ether](https://docs.ethers.org/v6/)
- [TypeScript](https://www.typescriptlang.org/)
- [ZkSnark](https://www.npmjs.com/package/snarkjs)
- [React](https://reactjs.org/)
- [Mantine UI](https://mantine.dev/)
- [React-Redux](https://react-redux.js.org/)
- [Tailwind-CSS](https://tailwindcss.com/)

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
