const { ethers } = require("hardhat");
const fs = require("fs");

// Define the Uniswap V3 Factory address and ABI
const factoryAddress = "0xa0b018Fe0d00ed075fb9b0eEe26d25cf72e1F693"; // Mainnet address, change for other networks
const factoryABI = [
    // ABI for PoolCreated event
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token0",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "token1",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            },
            {
                "indexed": false,
                "internalType": "int24",
                "name": "tickSpacing",
                "type": "int24"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "PoolCreated",
        "type": "event"
    }
];

// Usage example
const filename = "token_list_sup_3.json";

async function main() {
    try {
        const accounts = await ethers.getSigners();
        const [deployer] = accounts;

        const factoryContract = new ethers.Contract(factoryAddress, factoryABI, deployer);

        // Specify the block number from which to start listening to events
        const startBlock = 3061677; // Update with the desired block number

        // Subscribe to PoolCreated event from the specified block
        factoryContract.on("PoolCreated", { fromBlock: startBlock }, async (token0, token1) => {
            try {
                // Check if the token pair is not duplicate
                if (token0 !== ethers.constants.AddressZero && token1 !== ethers.constants.AddressZero) {
                    // Create a token pair string and save it
                    const tokenPair = [token0, token1].sort().join("-");
                    console.log("Found token pair:", tokenPair);
                    fs.appendFileSync(filename, tokenPair + "\n");
                }
            } catch (error) {
                console.error("Error processing event:", error);
            }
        });

        console.log("Listening for PoolCreated events from block", startBlock, "...");

        // Wait for some time to collect events (you can modify this)
        await new Promise((resolve) => setTimeout(resolve, 60000));

        // Unsubscribe from events
        factoryContract.removeAllListeners("PoolCreated");

        console.log("Finished collecting token pairs.");
    } catch (error) {
        console.error("Error:", error);
    }
}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});
