# [<img align="left" alt="Java" width="50px" src="[https://github.com/yieldyak/brand-assets/blob/d6414e7e63a7e83b3d42376822a91f516cf325c4/y/y_400x400.png?raw=true](https://www.justadex.xyz/logo/logo-white.svg)" />](https://justadex.xyz) JustADex 
Dex aggregator for Mode chain. UI available [here](https://justadex.xyz). 

## About

JustaDex is a set of smart contracts for optimal path finding between two assets and execution of that path. For input&output token and input-amount optimal path should have a greatest net amount-out by considering execution gas-cost.

Search is performed by calling on-chain query-methods and can be called by anyone. However, user should avoid calling query-methods in a mutative call due to a very large gas-cost associated with a call. 

## Usage


### Router

YakRouter is the user-facing interface to check prices and make trades. See example off-chain usage [here](./src/examples/debridge/main.js).


| Chain      | Address |
| ----------- | ----------- |
| Mode   | [`0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7`](https://modescan.io/address/0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7)

#### **findBestPathWithGas**


Finds the best path from tokenA to tokenB. Considers path's amount-out and its gas-cost.

```solidity
function findBestPathWithGas(
    uint256 _amountIn,
    address _tokenIn,
    address _tokenOut,
    uint256 _maxSteps,
    uint256 _gasPrice
) external view returns (FormattedOffer memory);
```


| Input params | Details |
| ------------ | ------- |
| amountIn     |  Amount of tokens being sold       |
| tokenIn      |   ERC20 token being sold      |
| tokenOut     |    ERC20 token being bought     |
| steps        | Max number of steps for path finding (must be less than 4)    |
| gasPrice             |   Gas price in gwei that will be used to estimate gasCost of each step      |


```solidity
struct FormattedOffer {
    uint256[] amounts;
    address[] adapters;
    address[] path;
    uint256 gasEstimate;
}
```


| Return arg | Details                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------- |
| amounts    | Amount of token being swapped for each step. First amount is `_amountIn` and last `amountOut`. |
| adapters   | Addresses of adapters through which trade goes.                                                |
| path       | Addresses of tokens through which trade goes. First token is `_tokenIn` and last `_tokenOut`.  |
|   gasEstimate         |     Rough estimate for gas-cost of all swaps. Gas estimates only include gas-cost of swapping and querying on adapter and not intermediate logic, nor tx-gas-cost.                                                                                           |



#### **swapNoSplit**

Executes trades through provided path.

```solidity
function swapNoSplit(
    Trade calldata _trade,
    address _to,
    uint256 _fee
) external;
```


| Input param | Details |
| ----------- | ------- |
| _trade            |   Arguments used for swapping      |
|  _to           |  Reciever address       |
| _fee        |  Optional fee in bps taken before the trades    |


```solidity
struct Trade {
    uint256 amountIn;
    uint256 amountOut;
    address[] path;
    address[] adapters;
}
```


| Param | Details |
| -------- | -------- |
| amountIn     |  Amount of tokens being sold     |
| amountOut     |  Amount of tokens being bought     |
| path     |   Tokens being traded in respective order     |
| adapters     |   Adapters through which tokens will be traded in respective order    |






### Adapter

Adapters act as a common interface for YakRouter to interact with external contracts.

Adapters offers methods: `query` and `swap`. 

```solidity
function query(
    uint256 _amountIn,
    address _tokenIn,
    address _tokenOut
) external view returns (uint256);

function swap(
    uint256 _amountIn,
    uint256 _amountOut,
    address _fromToken,
    address _toToken,
    address _to
) external;
```

After setting up this repo call `npx hardhat list-adapters --network {network-id}` to get a list of live adapters and their addresses. Or see  [`deployOptions`](./src/misc/deployOptions.js) for a list of live adapters per chain.


## Local Development and testing

### Install Dependencies

```
yarn install
```

### Set Environmental Variables

```
cp .env.sample > .env
```


### Actions

#### Test
Test for chain:
```
yarn test:{network-id}
```
Test individual:
```
npx hardhat test {path to the test/tests | empty to run all}
```

#### Deploy

```
yarn deploy:{network-id}
```
#### Verify
```
npx hardhat verify-contract --deployment-file-path {path to deployment file} --network {your network tag}
```

#### Query
```
npx hardhat find-best-path {fixed-amount-in} {token-in symbol/address} {token-in symbol/address}  --network {network tag}
```
Example:
```
npx hardhat find-best-path 1000 USDC yyAVAX  --network avalanche
```

## Misc

* Static-Quoters used in KyberElastic, UniswapV3 and Quickswap adapters are published [here](https://github.com/eden-network/uniswap-v3-static-quoter).

## Audits and Security

This project is not audited. Use at your own risk.
