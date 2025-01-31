// Import Web3
const Web3 = require('web3')  // Import Web3

// ✅ Connect Web3 Provider
let web3;
if (typeof window !== "undefined" && window.ethereum) {
    web3 = new Web3(window.ethereum); // Use MetaMask if available
    console.log("Using MetaMask Provider");
} else {
    web3 = new Web3("http://127.0.0.1:8546"); // Use Ganache if MetaMask isn't available
    console.log("Using Ganache Provider");
}

let contract;
const contractAddress = "0xEa01D1b308ae98F35592fD2f413c140Ff05Ed002"; // Update this to your contract address
const abi = [{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "landId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "location",
      "type": "string"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "area",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  "name": "LandRegistered",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "landId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "oldOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "lands",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "location",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "area",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "registered",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_location",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "_area",
      "type": "uint256"
    }
  ],
  "name": "registerLand",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "_newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "getLand",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
}
]; // Add your contract ABI here
contract = new web3.eth.Contract(abi, contractAddress);

let accounts = [];

// Fetch User Accounts (Works for Both MetaMask & Ganache)
async function fetchAccounts() {
    try {
        if (typeof window !== "undefined" && window.ethereum) {
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        } else {
            accounts = await web3.eth.getAccounts();
        }
        console.log("Connected Accounts:", accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        alert("Failed to connect to Ethereum wallet!");
    }
}

// Show Forms
function showRegisterLandForm() {
    hideAllForms();
    document.getElementById("registerLandForm").style.display = "block";
}

function showTransferOwnershipForm() {
    hideAllForms();
    document.getElementById("transferOwnershipForm").style.display = "block";
}

function showGetLandForm() {
    hideAllForms();
    document.getElementById("getLandForm").style.display = "block";
}

// Hide all forms
function hideAllForms() {
    document.getElementById("registerLandForm").style.display = "none";
    document.getElementById("transferOwnershipForm").style.display = "none";
    document.getElementById("getLandForm").style.display = "none";
}

// Register Land Function
async function registerLand() {
    await fetchAccounts();
    try {
        const landId = document.getElementById("landId").value;
        const location = document.getElementById("location").value;
        const area = document.getElementById("area").value;

        if (!landId || !location || !area) {
            alert("Please fill in all fields!");
            return;
        }

        const isRegistered = await contract.methods.isLandRegistered(landId).call();
        if (isRegistered) {
            alert("Land already registered!");
            return;
        }

        await contract.methods.registerLand(landId, location, area)
            .send({ from: accounts[0], gas: 3000000 })
            .then(receipt => {
                console.log("Land Registered:", receipt);
                alert("Land successfully registered!");
            })
            .catch(error => {
                console.error("Error registering land:", error);
                alert("Transaction failed. Check the console for details.");
            });
    } catch (error) {
        console.error("Error in registerLand:", error);
        alert("Error registering land!");
    }
}

// Transfer Ownership Function
async function transferOwnership() {
    await fetchAccounts();
    try {
        const landId = document.getElementById("transferLandId").value;
        const newOwner = document.getElementById("newOwner").value;

        if (!landId || !newOwner) {
            alert("Please fill in all fields!");
            return;
        }

        if (!web3.utils.isAddress(newOwner)) {
            alert("Please enter a valid Ethereum address!");
            return;
        }

        await contract.methods.transferOwnership(landId, newOwner)
            .send({ from: accounts[0], gas: 3000000 })
            .then(receipt => {
                console.log("Ownership Transferred:", receipt);
                alert("Ownership successfully transferred!");
            })
            .catch(error => {
                console.error("Error transferring ownership:", error);
                alert("Transaction failed. Check the console for details.");
            });
    } catch (error) {
        console.error("Error in transferOwnership:", error);
        alert("Error transferring ownership!");
    }
}

// Get Land Details Function
async function getLand() {
    try {
        const landId = document.getElementById("getLandId").value;

        if (!landId) {
            alert("Please enter a valid Land ID!");
            return;
        }

        const result = await contract.methods.getLand(landId).call();
        console.log("Land Details:", result);

        if (result[4]) {
            alert(`Land Details:\n
                   Land ID: ${result[0]}\n
                   Location: ${result[1]}\n
                   Area: ${result[2]} sq meters\n
                   Owner: ${result[3]}\n
                   Registered: Yes`);
        } else {
            alert("Land not found!");
        }
    } catch (error) {
        console.error("Error in getLand:", error);
        alert("Error fetching land details!");
    }
}
