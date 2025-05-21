import {ethers} from 'hardhat';
import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import assert from 'node:assert';


describe('ERC20Token', () => {

  async function deployContractFixture() {
    const name = 'Test Token';
    const symbol = 'TT';
    const totalSupply = 1000000;
    const decimals = 18;

    const [owner] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory('ERC20Token');
    const contract = await contractFactory.deploy(name, symbol, totalSupply, decimals);
    const deployed = await contract.waitForDeployment();
    return {
      address: await deployed.getAddress(),
      contract: contract,
      owner
    }
  }

  it('should be able to deploy a new token', async () => {
    const {address, owner, contract} = await loadFixture(deployContractFixture);

    assert(owner === contract.getOwner());
  });
})