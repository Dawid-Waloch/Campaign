# Campaign – Blockchain-based Crowdfunding Platform

Campaign is a decentralized crowdfunding web application that allows users to create their own campaigns where anyone can contribute funds from their wallets. The campaign creator can then submit spending requests, which must be approved by a specified number of participants before the funds can be released and spent.

---

## Key Features

- Create your own crowdfunding campaigns
- Contribute funds using Ethereum wallets
- Join campaigns as participants
- Campaign creators submit spending requests
- Participants vote to approve or reject spending requests
- Funds are released only after approval

---

## Tech Stack

- **Frontend:** React, Next.js, JavaScript
- **Styling:** Styled Components
- **Smart Contracts:** Solidity
- **Blockchain Infrastructure:** Infura endpoint + Wallet mnemonic stored in `.env`

---

## Installation & Running Locally

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Dawid-Waloch/Campaign.git
    cd Campaign
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create `.env` file in the root directory:**

    ```env
    ENDPOINT=YOUR_INFURA_ENDPOINT
    MNEMONIC=YOUR_WALLET_MNEMONIC
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Open you browser at:**

    `http://localhost:3000`

---

## Environment Variables

**Your `.env` file should contain the following variables:**

- ENDPOINT – Your Infura API endpoint URL (for example, a Goerli testnet endpoint)
- MNEMONIC – Your wallet’s 12-word recovery phrase (used for signing transactions)
    > Important: Keep your .env file private and never commit it to a public repository.

---

## Usage Overview

- Create Campaign: Start a new campaign where others can contribute funds.
- Contribute: Connect your Ethereum wallet and add funds to campaigns you support.
- Submit Spending Requests: Campaign creators submit requests describing how funds will be used.
- Voting: Participants vote to approve or reject spending requests.
- Withdraw Funds: After enough approvals, funds are released to be spent on the campaign goal.

---

## License

This project is licensed under the MIT License.
