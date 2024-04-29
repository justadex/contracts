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

        try {
            let localBlock = 3061677;
            const contract = new ethers.Contract(factoryAddress, factoryABI, deployer);

            const filter = {
                address: this.contractAddress,
                topics: [utils.id("Mint(address,address,int24,int24,uint128,uint256,uint256)")],
                fromBlock: startBlock,
                toBlock: endBlock
            };

            const events = await this.provider.getLogs(filter);
            console.log(`Fetching logs for ${Pool.sPairAddress} from block ${startBlock} to block ${endBlock}...`);


            for (const event of events) {
                console.log(event);
                const parsedEvent = contract.interface.parseLog(event);
                let reserves = [];
                parsedEvent.args.forEach((arg, index) => {
                    console.log(index + " : " + arg);
                    reserves.push(arg.toString());
                });
                // updated pairs in database;
                // updateReservesInPair(reserves, Pool)
            }
            // updateBlockInPair(Pool.iPoolPairId, endBlock);

            // Fetch logs for the next batch
            const latestBlock = await this.provider.getBlockNumber();
            if (endBlock < latestBlock) {
                const newStartBlock = endBlock + 1;
                const newEndBlock = Math.min(endBlock + 10, latestBlock);
                listenForEvents(Pool, newStartBlock, newEndBlock);
            } else {
                const latestBlock = await this.provider.getBlockNumber();
                setTimeout(() => {
                    const newStartBlock = endBlock + 1;
                    const newEndBlock = Math.min(endBlock + 10, latestBlock);
                    this.listenForEvents(Pool, newStartBlock, newEndBlock);
                }, 1000)
            }
        } catch (error) {
            const latestBlock = await this.provider.getBlockNumber();
            if (this.localBlock + 10 > latestBlock) {
                this.listenForEvents(Pool, this.localBlock, latestBlock);
            } else {
                this.listenForEvents(Pool, this.localBlock, this.localBlock + 10);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

main().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});
