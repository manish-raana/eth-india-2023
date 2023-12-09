export const DotContactAddress = '0xCBca82302699b4C98BfaF49bF4f4d27c3FDa1848';
export const ContractExplorerLink = 'https://sepolia.scrollscan.dev/address/0xCBca82302699b4C98BfaF49bF4f4d27c3FDa1848'
export const DotContractAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "url",
        "type": "string"
      }
    ],
    "name": "compress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "linkId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "url",
        "type": "string"
      }
    ],
    "name": "LinkAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Log",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "linkId",
        "type": "uint256"
      }
    ],
    "name": "expand",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "linkMapping",
    "outputs": [
      {
        "internalType": "address",
        "name": "userAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "url",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
