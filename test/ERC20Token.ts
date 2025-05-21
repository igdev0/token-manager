import hre from 'hardhat';
import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import assert from 'node:assert';


describe('ERC20Token', () => {

  async function deployContractFixture() {
    const name = 'Test Token';
    const symbol = 'TT';
    const initialSupply = 1000000;
    const decimals = 18;

    const [owner] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory('ERC20Token');
    const contract = await contractFactory.deploy(name, symbol, String(initialSupply), decimals);
    const deployed = await contract.waitForDeployment();
    return {
      address: await deployed.getAddress(),
      contract: contract,
      owner: await owner.getAddress(),
    }
  }

  it('It should be owned by the signer ', async () => {
    const {address, owner} = await loadFixture(deployContractFixture);
    const contract = await hre.ethers.getContractAt('ERC20Token', address);
    assert(await contract.owner.staticCall() === owner, "Owner is set incorrectly");
  });
})