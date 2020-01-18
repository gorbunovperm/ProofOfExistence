const sha256 = require("sha256")
const ethereumTx = require('ethereumjs-tx')
const request = require("request-promise")

const { web3, wallet, privateKey, contractInstance } = require("./variables")

const deploy = async () => {
    try {
        const data = await getData()

        const hash = getDataHash(data)

        const tx = await sendSignedTransaction(hash)

        const result = {
            success: true,
            hash,
            tx,
            message: "Transacation generated",
        }

        console.info("Transaction details:\n", JSON.stringify(result))
    } catch (error) {
        throw error
    }
}

const getData = async () => {
    const data = await request({
        url: "https://randomuser.me/api",
        method: "GET"
    })

    return data
}

const getDataHash = data => {
    const hash = sha256(data)

    return hash
}

const sendSignedTransaction = async hash => {
    try {
        const rawTrans = contractInstance.methods.addHash("0x" + hash)

        const txCount = await web3.eth.getTransactionCount(wallet)

        let gasPrice = web3.utils.toWei(21, "gwei")

        gasPrice = web3.utils.toBN(gasPrice)

        const dataTrans = {
            "chainId": web3.utils.toHex(3),
            "to": contractInstance.options.address,
            "nonce": web3.utils.toHex(txCount),
            "gasLimit": web3.utils.toHex(60000),
            "gasPrice": web3.utils.toHex(gasPrice),
            "data": rawTrans.encodeABI()
        }

        const tx = new ethereumTx(dataTrans)
        tx.sign(privateKey)

        return new Promise((resolve, reject) => {
            web3.eth.sendSignedTransaction("0x" + tx.serialize().toString("hex"))
                .on("transactionHash", hash => {
                    console.log("Transaction generated:", hash)
                })
                .on("confirmation", (confirmationNumber, receipt) => {
                    const hash = receipt.transactionHash
                    resolve(hash)
                })
                .on("error", error => {
                    reject(error.message)
                })
        })
    } catch (error) {
        throw error
    }
}

deploy()