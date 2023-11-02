# Blockchain Todo List App

This is a decentralized todo list application built on the Ethereum blockchain using Solidity, Truffle, Next.js, and Tailwind CSS. The TaskContract smart contract is deployed on the Ethereum network through Infura.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This decentralized todo list app allows you to create, manage, and mark tasks as complete using a blockchain-based smart contract. All data is stored on the Ethereum blockchain, ensuring transparency and immutability.

## Features

- Create new tasks
- Mark tasks as complete
- View your todo list

## Getting Started

### Prerequisites

Before you get started, ensure you have the following tools installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- Truffle: Install Truffle globally using npm: `npm install -g truffle`
- Next.js: Install Next.js globally using npm: `npm install -g next`
- Infura: Create an account and obtain an Infura API key: [Infura](https://infura.io/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/blockchain-todo-list.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blockchain-todo-list
   ```

3. Install dependencies:
   ```bash
   npm run dev
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and access the app at http://localhost:3000.

3. Connect your Ethereum wallet (e.g., MetaMask) to interact with the smart contract.

4. Use the app to create and manage your todo list tasks on the Ethereum blockchain.

## Smart Contract

The smart contract for this todo list app is written in Solidity and can be found in the `contracts` directory. It is responsible for managing tasks and their status on the Ethereum blockchain.

## Deployment

1. Update the `truffle-config.js` file with your Infura API key and Ethereum wallet information.

2. Compile and migrate the smart contract to the desired Ethereum network:

   ```bash
   truffle compile
   truffle migrate --network YOUR_NETWORK
   ```

3. Your smart contract is now deployed and ready to be used in the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub fork and pull request workflow.
