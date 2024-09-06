<div align="center" id="top">

&#xa0;

</div>
<h1 align="center">Web3 RPC Provider</h1>
<div align="center">
  <img alt="NodeJS Version" src="https://img.shields.io/badge/node.js-%3E=_21.17.0-green.svg?style=flat-square"/>
  &#xa0;
  <a href="https://app.codacy.com/gh/DODOEX/web3-rpc-provider?utm_source=github.com&utm_medium=referral&utm_content=DODOEX/web3-rpc-provider&utm_campaign=Badge_Grade"><img alt="Codacy Badge" src="https://api.codacy.com/project/badge/Grade/77a87eb50ae94f3a9b5abde7bd46f7ec"/></a>
  &#xa0;
  <img alt="License Badge" src="https://img.shields.io/github/license/DODOEX/web3-rpc-provider.svg"/>
  &#xa0;
  <img alt="Release Badge" src="https://img.shields.io/github/release/DODOEX/web3-rpc-provider"/>
</div>
<br>

## :dart: Introduction

Web3 RPC Provider offers the apis of get the free endpoint, enabling clients to quickly access blockchain networks.

> [!NOTE]
> Works with [Web3 RPC Proxy](https://github.com/DODOEX/web3-rpc-provider) for optimal, stable, and latest block height access to blockchains.

<br>

## :rocket: Deployment

```bash
# Run the image
$ docker run -p 3000:3000 -d dodozoo/we3-rpc-provider:latest
```

## :bulb: Usage
The usage is straightforward, just make a request to the following apis.

Get the endpoint of multiple chains
```bash
curl --location --request GET 'http://localhost:3000/endpoints'
```

Query Parameters:

- `chains`: Required
    The chains parameter allows specifying multiple chain ID values.

Get the endpoint of a single chain
```bash
curl --location --request GET 'http://localhost:3000/{{chain}}/endpoints'
```

- `chain`: Required
    Represents the chain ID. fill it in to get the endpoint of the specified chain.

### Common Query Parameters:

- `sources`: Required
    The sources parameter represents the source of the free endpoint. it can be filled in the class name of Picker in the [pickers](src/pickers) folder.

<br>

## :technologist: Development

### Starting Project
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
