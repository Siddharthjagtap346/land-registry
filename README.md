# Land Registry DApp

A decentralized application (DApp) for land registry, built on the Ethereum blockchain. This application allows users to register lands, transfer ownership, and view land details in a secure and transparent manner.

## Features
- **Land Registration**: Users can register a piece of land with details like land ID, location, and area.
- **Ownership Transfer**: Allows transferring ownership of land to a new owner.
- **Land Details**: Users can view the details of a registered land such as ID, location, area, and owner.

## Technologies Used
- **Ethereum**: Blockchain platform for creating the decentralized application.
- **Truffle**: Development framework for Ethereum.
- **Ganache**: Local blockchain for testing and development.
- **Web3.js**: JavaScript library to interact with the Ethereum blockchain.
- **HTML/CSS**: For frontend design and user interface.

## Smart Contract
The smart contract is deployed on the Ganache local blockchain. It includes the following functions:
1. **registerLand**: Register a new land with details.
2. **transferOwnership**: Transfer ownership of a registered land.
3. **getLand**: Retrieve details of a registered land.
4. **LandRegistered event**: Triggered when a land is successfully registered.
5. **OwnershipTransferred event**: Triggered when ownership is successfully transferred.

## Prerequisites
- **Node.js** and **npm** installed on your machine.
- **Ganache** (or any other Ethereum node) running for local testing.
- **MetaMask** or any other Ethereum wallet for interacting with the blockchain.

## Setup Instructions

### 1. Install Dependencies
Clone the repository and navigate to your project directory. Then, install the required dependencies:

```bash
npm install
```

### 2. Start Ganache
Run Ganache (or Ganache CLI) to start a local Ethereum network.

```bash
ganache-cli
```

### 3. Deploy Contracts
Deploy your contracts to the local Ethereum network using Truffle:

```bash
truffle migrate --reset --network development
```

### 4. Start the Application
Once the contracts are deployed, run the frontend application using:

```bash
npm run start
```

This will start the HTTP server and you can access the app on `http://127.0.0.1:8080`.

### 5. Interact with the DApp
You can now interact with the DApp through the following actions:
- **Register a Land**: Fill out the land registration form with land ID, location, and area.
- ![Screenshot 2025-01-31 191141](https://github.com/user-attachments/assets/f5e65a3b-de8d-4386-9e55-2b3bc83289d4)

- **Transfer Ownership**: Transfer the ownership of a registered land to a new address.
- ![Screenshot 2025-01-30 221833](https://github.com/user-attachments/assets/c25309da-4b63-4e78-acbd-1a67c21153a3)

- **Get Land Details**: Retrieve details about a specific land by providing its ID.
- ![image](https://github.com/user-attachments/assets/facd83c3-3751-43d8-b22d-84429dc18185)


## Future Enhancements
- Implement real-time updates for land transactions.
- Integrate with IPFS to store land data off-chain.
- Add more advanced features such as multiple ownerships or land verification through third parties.

## License
This project is licensed under the MIT License.
