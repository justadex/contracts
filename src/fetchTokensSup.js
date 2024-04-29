
const { ethers } = require("hardhat");
const fs = require("fs");

// Define the Uniswap V2 Router address and ABI
const routerAddress = "0x082C1E810B6518a65ae61d9C07dc25d9ffe61Ae6"; // Mainnet address, change for other networks
const routerABI = [
    "function factory() view returns (address)",
    "function allPairsLength() view returns (uint)",
    "function allPairs(uint) view returns (address)",
    "function owner() view returns (address)"
];

const filename = "token_list_sup_2.json";

async function main() {
    try {
        const accounts = await ethers.getSigners();
        const [deployer] = accounts
        let tokens = []

        const routerContract = new ethers.Contract(routerAddress, routerABI, deployer);
        try {
            const factoryAddress = await routerContract.factory();
            const factoryContract = new ethers.Contract(factoryAddress, ["function allPairsLength() view returns (uint256)", "function allPairs(uint256) view returns (address)"], deployer);
            const allPairsLength = await factoryContract.allPairsLength();
            for (let i = 0; i < parseInt(allPairsLength.toString()); i++) {
                const pairAddress = await factoryContract.allPairs(i);
                const pairContract = new ethers.Contract(pairAddress, [
                    "function token0() view returns (address)",
                    "function token1() view returns (address)",
                    "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
                ], deployer);

                const token0Address = await pairContract.token0();
                const token1Address = await pairContract.token1();
                const reserves = await pairContract.getReserves();

                tokens.push({
                    token0: token0Address,
                    token1: token1Address,
                    liquidity: {
                        reserve0: reserves[0].toString(),
                        reserve1: reserves[1].toString(),
                        lastUpdate: reserves[2].toString()
                    }
                });
            }

            // Deduplicate tokens
            let uniqueTokens = Array.from(new Set(tokens));

            tokens = uniqueTokens;
        } catch (error) {
            console.error("Error fetching token list:", error);
            tokens = [];
        }
        fs.writeFileSync(filename, JSON.stringify(tokens, null, 2));
        console.log("Token list saved to", filename);

    } catch (error) {
        console.error("Error saving token list to file:", error);
    }
}


main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

