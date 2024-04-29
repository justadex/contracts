// const { factory } = addresses.arbitrum.camelot;

const { ethers } = require("hardhat");

// async function deployUniswapV2() {
//     const networkName = "mumbai";
//     const contractName = "Uniswapv2Adapter";
//     const tags = ["uniswapv2"];
//     const name = contractName;
//     const gasEstimate = 238_412;
//     const args = [name, factory, gasEstimate];
//     return deployAdapter(networkName, tags, contractName, contractName, args);
// }

async function main() {
    accounts = await ethers.getSigners();
    const [deployer] = accounts
    // addresses.deployer = deployer.address

    // const factoryA = "0xb723a2f61a7C50201acdBaf7B14EfCd923E4a353";
    // const factoryB = "0x5aD4CA1e916E1bf0DfF5003573187cFE4f024Aac";
    // const wethAddress = "0xe3253037f2C5B8F797Cc58BF2448123570dF2FC1";

    // const tokenAAddress = "0xF8A1f33355969059AfC728A5d0cC5cb547d0d0B2";
    // const tokenBAddress = "0xB9ED4c406d98e680dDe6E547B7311d58360f453c";
    // const tokenCAddress = "0x35733f33902F2F093318F8E1509E4C1aA4eC54ab";

    // const adapterType = "univ2";
    // const contractName = "UniswapV2Adapter";
    // const gasEstimate = 120000;

    // const AdapterContract = await ethers.getContractFactory("UniswapV2Adapter");
    // const UniswapV2Adapter = await AdapterContract.deploy(adapterType, factoryA, 3, gasEstimate);
    // console.log("KIMv2: ", UniswapV2Adapter.address);
    // // const UniswapV2Adapter2 = await AdapterContract.deploy(adapterType, factoryB, 3, gasEstimate);
    // // console.log("yakRouter: ", UniswapV2Adapter2.address);

    // const factoryAAdapter = "0xCbeb79dA846f2E4dd562aD6614b356c3d766817F";
    // const factoryBAdapter = "0x5766663c244Bb5B9FD2AF82Eb64DdbE6C41bD85a";

    // const YakRouterContract = await ethers.getContractFactory("YakRouter");
    // // const YakRouter = await YakRouterContract.deploy(
    // //     [factoryAAdapter, factoryBAdapter],
    // //     [tokenAAddress, tokenBAddress, tokenCAddress],
    // //     "0x275FFC14901978b3254c34400acf158bC326Fca1",
    // //     wethAddress
    // // );

    // // console.log("YakRouter: ", YakRouter.address);

    // const YakRouter = YakRouterContract.attach("0xeB87FD9c505B5f09674c4076D615Fdfe867591E6");

    // const ERC20 = await ethers.getContractFactory("StackOSToken");
    // const tokenA = ERC20.attach(tokenBAddress);

    // await tokenA.approve(YakRouter.address, ethers.utils.parseEther("1000"))

    // const ans = await YakRouter.findBestPathWithGas(
    //     ethers.utils.parseEther("0.01"),
    //     tokenAAddress,
    //     tokenCAddress,
    //     3,
    //     ethers.utils.parseEther("0")
    // );

    // console.log(ans);
    // console.log(ans[0][ans[0].length - 1]);

    // const Trade = {
    //     amountIn: ethers.utils.parseEther("0.01"),
    //     amountOut: ans[0][ans[0].length - 1],
    //     path: ans[2],
    //     adapters: ans[1]
    // }

    // const swap = await YakRouter.swapNoSplit(Trade, "0xc160Efc3af51ebc6fC4c517cA941a6999Ce0beC0", ethers.utils.parseEther("0"));

    // console.log("ans: ", swap);
    // function findBestPathWithGas(
    //     uint256 _amountIn,
    //     address _tokenIn,
    //     address _tokenOut,
    //     uint256 _maxSteps,
    //     uint256 _gasPrice
    // )

    // address[] memory _adapters,
    // address[] memory _trustedTokens,
    // address _feeClaimer,
    // address _wrapped_native

    //   string memory _name,
    //   address _factory,
    //   uint256 _fee,
    //   uint256 _swapGasEstimate
    //   console.log("deployer: ", deployer.address);
    //   console.log("deployUniswapV2: ", deployUniswapV2());
    //   await deployUniswapV2();


    // //  adapters
    // const uniswapV2 = [
    //     "0xc02155946dd8C89D3D3238A6c8A64D04E2CD4500"
    // ]

    // const AdapterContract = await ethers.getContractFactory("UniswapV2Adapter");
    // const UniswapV2Adapter = await AdapterContract.deploy(adapterType, uniswapV2[0], 3, gasEstimate);
    // console.log("KIMv2: ", UniswapV2Adapter.address);
}

// main()
//     .then(() => process.exit(0))
//     .catch((err) => {
//         console.error(err);
//         process.exit(1);
//     });



