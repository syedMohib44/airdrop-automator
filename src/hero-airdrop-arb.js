const fs = require("fs");
const Web3 = require('web3');

const { default: axios } = require('axios');

require("dotenv").config({path:'../.env'});


const data = [];

var web3 = new Web3(`https://arb-mainnet.g.alchemy.com/v2/${process.env.WEB3_ARB}`);


const bcshABI = [{"inputs":[{"internalType":"address","name":"_blockchainSuperheroes","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"token","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"ARB_TOKEN_ADDRESS","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newModerator","type":"address"}],"name":"AddModerator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_isMaintaining","type":"bool"}],"name":"UpdateMaintaining","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_mintingPausedARB","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_mintingPausedETH","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"adminWithdrawERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"arbPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockchainSuperheroes","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ethPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isMaintaining","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"mintTo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintingCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintingCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"moderators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_blockchainSuperheroes","type":"address"}],"name":"setContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintingCap","type":"uint256"}],"name":"setMintingCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"togglePauseARB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"togglePauseETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalModerators","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updatePriceARB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPrice","type":"uint256"}],"name":"updatePriceETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const bcshContract = '0x32f00d3488b11e39f4deb37990bc46a0d3ca8a3f';



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
            url: `https://api.etherscan.io/v2/api?chainid=42161&module=gastracker&action=gasoracle&apikey=${process.env.ARB_KEY}`
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
let failedData;

let startIndex = 0;

let usedNonce = {};


async function run(index, initialNonce) {
    let outputRes;
    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    console.log(address);

    if (data.length !== amount.length) {
        console.error(`Length of array mismatch ${data.length} !== ${amount.length}`);
        return;
    }

    let dataJoin;
    let amountJoin;
    let txURL;

    const bcsh = new web3.eth.Contract(bcshABI, bcshContract);
    // const initialNonce = await web3.eth.getTransactionCount(address, 'pending');
    let mynonce = await initialNonce; // Start with the fetched nonce
    if (usedNonce[mynonce]) {
        console.error(`nonce already used: ${mynonce} = ${usedNonce[mynonce]}`)
        return;
    }

    try {
        for (let i = index; i < data.length; i++) {
            startIndex = i;
            usedNonce[mynonce] = false;


            console.log(`${data[i]}`);

            failedData = data[i];

            const gasEstimated = await bcsh.methods.mintTo(data[i]).estimateGas({ from: address });
            const gasCal = await calcGas(gasEstimated);
            console.log(gasCal)
            // const mynonce = '0x' + (await web3.eth.getTransactionCount(address) + 1).toString(16);

            const tx = {
                to: bcshContract,
                gas: gasCal.gasLimit,
                data: bcsh.methods.mintTo(data[i]).encodeABI(),
                maxFeePerGas: gasCal.maxFeePerGas,
                nonce: mynonce,
                maxPriorityFeePerGas: gasCal.maxPriorityFeePerGas
            };
            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            const receipt = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            txURL = `https://arbiscan.io/tx/${signedTx.transactionHash}`;

            outputRes = `ARB, ${mynonce}, ${data[i]}`
            console.log(txURL);

            fs.appendFileSync(`../hero_output/hero-output.csv`, outputRes);

            usedNonce[mynonce] = true;

            mynonce++;
        }
    } catch (err) {
        console.log(err);
        console.log(startIndex, mynonce);
        outputRes = `ARB, ${mynonce}, ${failedData}`
        fs.appendFileSync(`../hero_error/hero-error.csv`, outputRes);
        run(startIndex, mynonce);
        // console.log(`Broke at nonce: ${mynonce} \n data: ${failedData} \n anount: ${failedAmount}`)
    }
}

run(startIndex, startNonce);