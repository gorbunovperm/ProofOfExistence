const Web3 = require("web3")

const wallet = "0x"

const privateKey = Buffer.from("BBB6FF988BBDF3A4079058ADD18AA2B07CE1FB6F325557C1F1CF2D3B0DDDEEE", "hex")

const provider = "https://ropsten.infura.io/v3/TOKEN"

const contractAddress = "0x"

const abi = [{"constant":false,"inputs":[{"name":"rootHash","type":"bytes32"}],"name":"addHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"rootHash","type":"bytes32"}],"name":"getHashTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

const web3 = new Web3(provider)
const contractInstance = new web3.eth.Contract(abi, contractAddress)

module.exports = { 
    web3,
    wallet,
    privateKey,
    contractInstance
}