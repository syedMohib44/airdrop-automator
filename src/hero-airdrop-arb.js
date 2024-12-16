const fs = require("fs");
const Web3 = require('web3');

const { default: axios } = require('axios');

require("dotenv").config({ path: '../.env' });


const data = [
    "0x3e10553fff3a5ac28b9a7e7f4afafb4c1d6efc0b",
    "0xfcbbdf31e9840807582f1f3571293b97918c1e4d",
    "0x5478e1cf9f8bc1159533069a7bafd5c5acebde0d",
    "0x14200888c9b85b4f1e589de4be12e46916b7af31",
    "0x99559af00d2f43ce773b84316cce6f47c908f076",
    "0xf23892e642589234cfc760bc4176d860ac344f73",
    "0x03ae56d44437f55db0847e57a13637a0e8659294",
    "0xc1fd374ca9de2437004799136d748db235c5eced",
    "0xad1710272ce064dcd809b9dd0c8c41cc1d5a8834",
    "0xc77b4edc2c1f41d83b18a21637b2d6bb12504016",
    "0xef07ca77b36fca9ebe055f230ef3f6271e409ea0",
    "0x708344758be51a28ecd022440889a4e3e1cf7006",
    "0xe95a1e8c39f70e94f7f6e3408429a22bb0b19241",
    "0x5aed14d155947744d86585051b5eed0701e734ff",
    "0x52c984805240d4f98ed6a56a4d421542dd4cdf77",
    "0xf1ab4e3455a1da2dbf16260bc7ec37efda240eb5",
    "0x38f83a5a9ebc013256b3672759f647ba4998bfb6",
    "0xc02388962e7425d19281cfe1572fd8df93a5acf2",
    "0x859b4f60d9d1a5fbcc26876aeba14222d501c31a",
    "0xdd5730a33719083470e641cf0e4154dd04d5738d",
    "0xf5965748f828ca5813a5296f70568310cb04702e",
    "0xb2e3e82a95f5c4c47e30a5b420ac4f99d32ef61f",
    "0x050a88f7d0b5a019547b3d68c32c29aa2fdf0afe",
    "0x83e38925ddad4e6766a4cc6b7ffa456904588a5e",
    "0x70bdcbe2159405ecdf9a37a041c955a2564977cf",
    "0x5e34aa7248e322f9cf5f256514f0e5eacbeff713",
    "0x0665e5498903ed3a9fc5b6ac0f828350667c9a58",
    "0x9764d759f33f4b448031b59e6f86fb36d861edb8",
    "0xde093720186f355032ea1e027f4824bbc2da81af",
    "0x3dbeea06b806ecb97515226a6c551f95a3d0a67a",
    "0x2e9e8b0a58d8ec7b1c74af1d9a54ad1077bdcbad",
    "0xc8c8e54711e63c9973715c1cca1586468619e8e1",
    "0x43a704b174a88c35e0b6b46f6cc9604f6c34d400",
    "0x46afe7fd3a9bd4ccd20ed8f3c1489348455f97b2",
    "0xfdd029a12c6106c80cffad4a28e3a9fa4c952713",
    "0x36fbd075dac7f8176e630bd9e058d66df1fbd943",
    "0x1d95003bf152819e12476c7dded5c65e4c688b0c",
    "0x4f7d8f758cbf7bfd1b16c7ab0fda9f6c402c1884",
    "0x8ff8372ad7dff800a2570ac596b83a81fe36268d",
    "0x999294bfa1b00cb6a3ff9943e6be99dedb942631",
    "0xd795b6bb877f13e9912e2d25e27fb291bb264da6",
    "0x535c16005f26caab0b7b4e4524120c0afbd13d19",
    "0x65ecb352c14cf3dbbf2daeb367095f8c5bdd1c83",
    "0x513a7341ab81988e811373424249e26eef20d25f",
    "0xed10582d27a8d61005188cdd20295ea3beba81ff",
    "0x08f3d819bd9ebb009bebdfa8be50760d8970be05",
    "0xb768d3c1b7d270b2e6d57ca3c337d623fa1b9e49",
    "0x419449579a0d27c83dd1b719b73e9e7bfc4bd82a",
    "0xe9dab86acea96505d7d491df6262900d0795ef3b",
    "0xbc5d92f76eef02c15af277f087890aac9c568f3f",
    "0x130b145f25fa29872d695090f241694f5583b4af",
    "0xa0a69daed8acf7ec372ed332290b4b0743ab0fcd",
    "0xe5db782b4b594a5fd7a9f2ea503b09b10454a152",
    "0xe28d828fc81d643936c967dfb2a208fdcf3dee7b",
    "0xb8f2219bdb8682f9185768a27d40ae83fb139c46",
    "0x53c95e33464ef5282009c4da8528e49adaacc2ea",
    "0x27553c9418151758ffc56088efd4f5698a573ca7",
    "0x9a285e02bc798b20f19234c2ee35d56cbc058bfd",
    "0x4eab0f8528d82d460ec38abde65c15c14d2ab5da",
    "0x4b6d9204c8e91eea146654a767a4eb92dbcd8adb",
    "0xf76dffc782c00a06271f969599d753e74602fe53",
    "0x2b5cd549efd821dd7d84290385c55e34a024de02",
    "0xaa91167dae445594a8df09f6f85285c659926ad0",
    "0x744542a9730f89bc21c2762720a03bb6d17468ef",
    "0x0f464e55dcf023a3aa9eea7b282caaab1a59dab6",
    "0x7025a5c640c79801b9e9be1c53eb03b5647ec694",
    "0xcb004d89da7f9fbb216cec13cb88632dfe8fed1d",
    "0x8c18eb35aa78d293bb25284b29e55189b1e6fadf",
    "0x3f27e7a1ffa1db35b338227965d414506600f62b",
    "0xcbb501d07439a8bee0be81c2b1516301afa93a79",
    "0x33392a8a2aa5a42362beee3a280eac2c9610ce68",
    "0x22dc0bd84e865280d221625418b102e10b690058",
    "0x22dd66e3adf9944a061acb0e677b341b4748cb01",
    "0x322268318985bb520f8b95486c75d74d321bf65d",
    "0x5351531dd5b93261113e7aea996be885ab283476",
    "0x1abddd9cad89bc1ae84963b85900ce67f5b942d5",
    "0xd71da6cc1d91ca0128c5cd9ae54e21ecf2bd31bd",
    "0x3263119333ed1cf4463146cc063d79d634e23e3e",
    "0xb63d896a6d551389d98a893c6fbc3050e04240a7",
    "0x6abd34d23722ad8573b9c6e4040c7b63a556a9ca",
    "0xfa428ffcf5b4420e97aeda989f85d37c485ba39e",
    "0x9c11054a91d229313b1450fe6db066d6f9d0ea46",
    "0x0b50d8c0b7274171f1667d6564919544b8392d1b",
    "0xa2e3f240db8c809e94687d5baf4c8614b9b09a0d",
    "0xca41d1a32e99a594e88637e1ab00dcc7ff5045be",
    "0x4bcfef699287750de1098ac64618b1fa833263d1",
    "0x91b6b044aaf86921b39a9ed6b33d8e672b2e606b",
    "0x4ea296b6870e65c1d53d659184dcc4e0932cdf69",
    "0x9bea24a3cefc01bb117387afcea7d427f6ed3beb",
    "0x2dfa7077e29ec998915ab1bee014e1e868de13d7",
    "0x6c3733ba0ba5edfd2102e3f01ccb11fb0d9b7ecc",
    "0xe8034ad93964a0bcde99553d3749d6ca36afcc26",
    "0xb68f29a771f742740673fa035dc0ee454966443a",
    "0x06a29cfd8b53a9a65c91f4e80dcc53e75cf3cdba",
    "0xf8163523d073554b6b448e0a39e9ad59f32aa576",
    "0xfa4d081a333a213f64950c023ca55cdac5a76650",
    "0xc8597ef3cac8d3d7b35ac03aba047dd37eb2bf6e",
    "0x0b2589f511bd39e455e2ea2cdaf2f0d91bbeb579",
    "0xe0279bb7301585fdee1f8679d4d11e77dcaecc92",
    "0x55a17c62a96e9c4ab8fcf90d793ea7fa90a3a0b9",
    "0x684e70b2d55c0106175cc22b10ec522373584138",
    "0xf74920de35f6318bb63952ed2f69ef3f21d2d18c",
    "0x91282551a54c9e1157f412e654e91b75f4a1c349",
    "0x9c40ed6228bc73c90f15b8359f188975cb7b7764",
    "0x9b9ea5dcd8eb1f6ab79c70358a07a4eba63c8928",
    "0x19af885f6f118d699b16c66e16c95063c4464d5c",
    "0xa8a04b9ac7f094d9d570a4373013850247f903e2",
    "0x75d0bed0681f4ef83502e113c86b912b0cce6427",
    "0x523c2f51f342a4e8e581911db40603ab31bd9672",
    "0x0acd05fe005f9009dc81567663fa5c2f0fe60a55",
    "0xaffeb4e83de6aa9b4d64d92e1890bd3ad26a7721",
    "0x2c2b50777155f07299fe11f83669788f8acabddf",
    "0xef5776e6c8e76c7b420d055d5e2e200f0217c147",
    "0x318086b7ffcb5989ffbe7b069a06d913f2ec78a4",
    "0x5e6d2eb3665c16a9bf21bdec66e6840515a7109c",
    "0xe00ad54fe276fe7b224d9438ca431ebcc83777a8",
    "0x5dbf6f2fa41a86d5ed2ad4dbdbb87747fd075918",
    "0xa50565ebcaaf3c5304361c427f8fee6fc91208cf",
    "0x5e1dd328300e7e9f1d951aaccca6a694e317ea0a",
    "0xb77072b21da1523654efba7e590ea24c93583e87",
    "0x5a5128850f6f7a2806e45d0702aa76936d3dc09d",
    "0xc5d9ae864313d324ccfb2f45e99283f99ea02a46",
    "0x856e44158bd01978f9d661c40ae5cd9edde5cd24",
    "0x862420247cbc0aa630740d9cab832e7755062ca7",
    "0xec496d888b7953157d5535b55abc86920d147a3c",
    "0x3f33eb0905619efa58f317b50561121dc774b8a3",
    "0xfa6e1f50adb5ab8f89b1a1e1afe1fdc99a6e936f",
    "0x4e978860f06e84955e13a1610e6e0c1db055d789",
    "0x019b35100b87f606e80f3310e61b35a32c5cdd5e",
    "0x634b25f91c8c07033a9bd63bd463f030ebc52b03",
    "0x25bde765f4926063910ccc41f535bdc5491f52a0",
    "0xdf8da07468c03bf80651cce9793769510401c388",
    "0xd92ab865224cb9bb8d434dfb7ed2ebf09f6905a1"
];

var web3 = new Web3(`https://arb-mainnet.g.alchemy.com/v2/${process.env.WEB3_ARB}`);


const bcshABI = [{ "inputs": [{ "internalType": "address", "name": "_blockchainSuperheroes", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "_owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "token", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [], "name": "ARB_TOKEN_ADDRESS", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newModerator", "type": "address" }], "name": "AddModerator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_isMaintaining", "type": "bool" }], "name": "UpdateMaintaining", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "_mintingPausedARB", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_mintingPausedETH", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "adminWithdrawERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "arbMint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "arbPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "blockchainSuperheroes", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ethPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "getBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isMaintaining", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }], "name": "mintTo", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "mintingCap", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mintingCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "moderators", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_blockchainSuperheroes", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_mintingCap", "type": "uint256" }], "name": "setMintingCap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "togglePauseARB", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "togglePauseETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "totalModerators", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newPrice", "type": "uint256" }], "name": "updatePriceARB", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newPrice", "type": "uint256" }], "name": "updatePriceETH", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
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

let failedData;


async function run() {
    let outputRes;
    const { address } = web3.eth.accounts.privateKeyToAccount(privateKey);

    console.log(address);

    let dataJoin;
    let amountJoin;
    let txURL;

    const bcsh = new web3.eth.Contract(bcshABI, bcshContract);
    // const initialNonce = await web3.eth.getTransactionCount(address, 'pending');
    
    try {
        for (let i = 0; i < data.length; i++) {
            let mynonce = await web3.eth.getTransactionCount(address, 'pending');


            console.log(`${data[i]}`);

            failedData = data[i];


            const gasEstimated = await bcsh.methods.mintTo(data[i]).estimateGas({ from: address });
            const block = await web3.eth.getBlock("latest"); // Fetch latest block details
            const baseFee = web3.utils.toBN(block.baseFeePerGas); // Get the base fee per gas
            const priorityFee = web3.utils.toBN(web3.utils.toWei("2", "gwei")); // Set priority fee
            const maxFeePerGas = baseFee.add(priorityFee); // maxFeePerGas = baseFee + priorityFee

            // const mynonce = '0x' + (await web3.eth.getTransactionCount(address) + 1).toString(16);

            const tx = {
                to: bcshContract,
                gas: gasEstimated,
                data: bcsh.methods.mintTo(data[i]).encodeABI(),
                maxFeePerGas: maxFeePerGas.toString(),
                nonce: mynonce,
                maxPriorityFeePerGas: priorityFee.toString()
            };

            const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

            const receipt = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            txURL = `https://arbiscan.io/tx/${signedTx.transactionHash}`;

            outputRes = `${txURL},\n`
            console.log(txURL);

            fs.appendFileSync(`../hero_output/hero-output.csv`, outputRes);
        }
    } catch (err) {
        console.log(err);
        console.log();
        outputRes = `ARB, ${failedData},\n`
        fs.appendFileSync(`../hero_error/hero-error.csv`, outputRes);
        // console.log(`Broke at nonce: ${mynonce} \n data: ${failedData} \n anount: ${failedAmount}`)
    }
}

run();