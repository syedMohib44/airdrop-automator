const fs = require("fs");
const Web3 = require('web3');
require("dotenv").config();

const { default: axios } = require('axios');
require("dotenv").config({ path: '../.env' });

const web3 = new Web3(`https://rpc-amoy.polygon.technology`);


const data = [];

const amount = [];

const disperseABI = [{ "inputs": [{ "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "disperseOAS", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "disperseToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "address[]", "name": "recipients", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }], "name": "disperseTokenSimple", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
const disperseContract = '0x67252Fa2f6d56B73D26F5d1F2d97451159001f67';



function parse(data) {
    return web3.utils.toWei(Math.ceil(data).toString(), 'Gwei');
}


async function calcGas(gasEstimated) {
    let gas = {
        gasLimit: gasEstimated, //.mul(110).div(100)
        maxFeePerGas: web3.utils.toBN(40000000000), //40000000000
        maxPriorityFeePerGas: web3.utils.toBN(40000000000) //40000000000
    };
    try {
        const { data } = await axios({
            method: 'get',
            url: `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey&apikey=XYGPQY2P2ADIVT5IUR2UWWPFIJWHDAQ58A`
        });
        let maxFee = web3.utils.toBN(web3.utils.toWei(data.result.FastGasPrice, 'gwei'));
        let priorityFee = web3.utils.toBN(web3.utils.toWei(data.result.ProposeGasPrice, 'gwei'));
        gas.maxFeePerGas = maxFee;
        gas.maxPriorityFeePerGas = priorityFee;
    } catch (error) {
        console.log(error);
    }
    return gas;
};

const privateKey = process.env.PRIVATE_KEY;


let startNonce = web3.eth.getTransactionCount('0xd00faF7c2a837DC457389758Ea1271aE6256dc44', 'pending');
let failedData = [];
let failedAmount = [];

let startIndex = 0;
let chunckSize = 500;

let usedNonce = {};
let livedTill = 0;



async function run(index, initialNonce, maxChunck) {
    const token = '0x3C9A256Ebd4366B0a1036F3d8eC9AA85226FA776';
    let outputRes;

    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    console.log(address);

    if (data.length !== amount.length) {
        console.error(`Length of array mismatch ${data.length} !== ${amount.length}`);
        return;
    }

    let txURL;

    const disperse = new web3.eth.Contract(disperseABI, disperseContract);
    // const initialNonce = await web3.eth.getTransactionCount(address, 'pending');
    let mynonce = await initialNonce; // Start with the fetched nonce
    if (usedNonce[mynonce]) {
        console.error(`nonce already used: ${mynonce} = ${usedNonce[mynonce]}`)
        return;
    }

    try {
        for (let i = index; i < data.length; i += maxChunck) {
            startIndex = i;
            usedNonce[mynonce] = false;

            let addresses = data.slice(i, i + maxChunck);

            for (let j = 0; j < addresses.length; j++) {
                addresses[j] = web3.utils.toChecksumAddress(addresses[j]);
            }

            const tokens = amount.slice(i, i + maxChunck);
            // let totalAmount = 0;
            // for (let j = 0; j < tokens.length; j++) {
            //     // totalAmount += amount[i][j];
            //     tokens[j] = web3.utils.toWei(tokens[j].toString(), 'ether');
            // }

            console.log(addresses, data[0], maxChunck)

            console.log(`${addresses[0]} - ${addresses[addresses.length - 1]}, ' === \n', ${tokens[0]} - ${tokens[tokens.length - 1]}`);

            failedData = addresses;
            failedAmount = tokens;

            const gasEstimated = await disperse.methods.disperseTokenSimple(token, addresses, tokens).estimateGas({ from: address });
            const gasCal = await calcGas(gasEstimated);
            console.log(gasCal)
            // const mynonce = '0x' + (await web3.eth.getTransactionCount(address) + 1).toString(16);

            const tx = {
                to: disperseContract,
                gas: gasCal.gasLimit,
                data: disperse.methods.disperseTokenSimple(token, addresses, tokens).encodeABI(),
                maxFeePerGas: gasCal.maxFeePerGas,
                nonce: mynonce,
                maxPriorityFeePerGas: gasCal.maxPriorityFeePerGas
            };
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            const receipt = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            txURL = `https://amoy.polygonscan.com/tx/${signedTx.transactionHash}`;

            const dataJoin = `"${addresses.join(', ')}"`;
            const amountJoin = `"${tokens.join(', ')}"`;

            outputRes = `AMOY, ${mynonce}, ${dataJoin}, ${amountJoin}, "INPUT AMOY, ${mynonce} >> OUTPUT ${txURL}"\n`
            console.log(txURL);

            fs.appendFileSync(`../output/outputlog.csv`, outputRes);

            usedNonce[mynonce] = true;

            mynonce++;
            livedTill++;
            if (livedTill >= 5) {
                if (maxChunck < 500) {
                    maxChunck += 50;
                } else {
                    maxChunck = 500;
                }
                livedTill = 0;
            }

            console.log(livedTill, ' ++++ ', chunckSize)
        }
    } catch (err) {
        console.log(err);
        livedTill = 0;
        console.log(startIndex, mynonce, chunckSize);
        outputRes = `AMOY, ${mynonce}, ${failedData[0]} - ${failedData[failedData.length - 1]}, ${failedAmount[0]} - ${failedData[failedAmount.length - 1]}, "INPUT AMOY, ${mynonce} >> OUTPUT ${txURL}"\n`
        fs.appendFileSync(`../error/errorlog.csv`, outputRes);
        if (maxChunck > 50)
            maxChunck -= 50;
        run(startIndex, mynonce, maxChunck);
        // console.log(`Broke at nonce: ${mynonce} \n data: ${failedData} \n anount: ${failedAmount}`)
    }
}

run(startIndex, startNonce, chunckSize);