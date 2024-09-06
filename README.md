<div align="center" id="top">

&#xa0;

</div>
<h1 align="center">Web3 RPC Provider</h1>
<div align="center">
  <a href="https://app.codacy.com/gh/DODOEX/web3-rpc-provider?utm_source=github.com&utm_medium=referral&utm_content=DODOEX/web3-rpc-provider&utm_campaign=Badge_Grade"><img alt="Codacy Badge" src="https://api.codacy.com/project/badge/Grade/de013bb362a3436c9d1872bce5ab3c04"/></a>
  &#xa0;
  <img alt="License Badge" src="https://img.shields.io/github/license/DODOEX/web3-rpc-provider.svg"/>
  &#xa0;
  <img alt="Release Badge" src="https://img.shields.io/github/release/DODOEX/web3-rpc-provider"/>
</div>
<br>

## :dart: Introduction

Web3 RPC Provider offers free web3 endpoint apis, enabling clients to quickly access blockchain networks.

> [!NOTE]  
> Works with [Web3 RPC Proxy](https://github.com/DODOEX/web3-rpc-provider) for optimal, stable, and latest block height access to blockchains.

<br>

## :rocket: Deployment

```bash
# Build the docker image
$ docker build ./Dockerfile -t web3rpcprovider:latest

# Run the image
$ docker run -p 3000:3000 -d web3rpcprovider:latest
```

Or

```bash
# Start the service using docker compose
$ docker compose up -d
```

## :bulb: Usage
The usage is straightforward, just make a JSON-RPC request to a specific chain.

```bash
$ curl --location --request GET 'http://localhost:3000/{{CHAIN}}'
```

- `CHAIN`: Optional  
    Represents the chain ID. Fill it in to get the endpoint of the specified chain. If left empty, multiple values can be specified through the chainIds parameter.
### Request Parameters:
- `sources`: Required
    The sources parameter represents the source of free endpoints.
- `chainIds`: Required  
    The chainIds parameter allows specifying multiple chain ID values. either `CHAIN` or `chainIds` must be provided.

<br>

## :technologist: Development

### Starting the Project
```bash
# Clone the project
$ git clone https://github.com/DODOEX/web3-rpc-provider

# Navigate to the project directory
$ cd web3-rpc-provider

# Install project dependencies
$ pnpm install

# Start the project
$ npm run start
```

## :busts_in_silhouette: Contribute
If you want to contribute to the Web3 RPC Provider project:

Fix issues: Find and fix issues in the project.
Write documentation: Improve and write relevant documentation for the project.
Write tests: Write and optimize test cases for the project.

If you want to show appreciation or support the continued development of the Web3 RPC Provider project, you can do so by:

Giving the project a GitHub Star. Supporting the project by donating a cup of tea.

<br>

## :memo: License
This project is under license from MIT. For more details, see [the LICENSE file](LICENSE).

&#xa0;

<div align="center"><a href="#top">Back to top</a></div>
