const {
    time,
    loadFixture,
    mine,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect, assert } = require("chai");
  
  
  describe("Lock", function () {
    async function BasicDutchAuctiondeploy() {
  
      const [owner, otherAccount] = await ethers.getSigners();
  
      const BasicDutchAuction = await ethers.getContractFactory("BasicDutchAuction");
      const basicdutchauction = await BasicDutchAuction.deploy();
      // get default signer, in Signer abstraction form
      signer = ethers.provider.getSigner(0);
  
      // get default signer, but just the address!
      [signerAddress] = await ethers.provider.listAccounts();
      return { basicdutchauction, owner, otherAccount };
    }
  
    describe("Deployment", function () {
      it("Check if the starting block is 0", async function () {
        const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
        expect(await basicdutchauction.blocknumber()).to.equal(1);
      });
  
      it("Check if the initialPrice is 1600000000000000000 wei", async function () {
        var bigNum = BigInt("1600000000000000000");
        const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
        expect(await basicdutchauction.initialPrice()).to.equal(bigNum);
      });
  
      it("Accepts higher bid of 10ETH. Other account gets the bid amount & remaining ether is transferred to donor. ", async function () {
        var bigNum = BigInt("10000000000000000000");
        var expectedOwnerBalance = BigInt("10001578534509375000000");
        var expectedOtherAccBalance = BigInt("9998419843994169810437");
        const { basicdutchauction, owner, otherAccount } = await loadFixture(BasicDutchAuctiondeploy);
        await expect(basicdutchauction.connect(otherAccount).receiveMoney({ value: bigNum })).eventually.to.ok;
        expect(await owner.getBalance()).to.equal(expectedOwnerBalance);
        expect(await otherAccount.getBalance()).to.equal(expectedOtherAccBalance);
        expect(await basicdutchauction.checkbalance()).to.equal(0);
      });
  
      it("Rejects lower bid", async function () {
        var bigNum = BigInt("1400000000000000000");
        const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
        await expect(basicdutchauction.receiveMoney({ value: bigNum })).to.be.revertedWith('Not enough ether sent.');
      });
  
      it("Rejects second bid ", async function () {
        var bigNum = BigInt("1600000000000000000");
        const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
        await expect(basicdutchauction.receiveMoney({ value: bigNum })).eventually.to.ok;
        await expect(basicdutchauction.receiveMoney({ value: bigNum })).to.be.revertedWith('Someone has already donated');
      });
  
      it("After block 10, price should be 1.5 ETH. Here, block number is 15", async function () {
        var priceBigNum = BigInt("1500000000000000000");
        const ModifyVariable = await ethers.getContractFactory("BasicDutchAuction");
        const contract = await ModifyVariable.deploy();
        await contract.deployed();
        await mine(1000);
        const newX = await contract.blocknumber();
        expect(await contract.getprice()).to.equal(priceBigNum);
      });
  
      it("Initial contract balance is 0", async function () {
        const ModifyVariable = await ethers.getContractFactory("BasicDutchAuction");
        const contract = await ModifyVariable.deploy();
        await contract.deployed();
        expect(await contract.checkbalance()).to.equal(0);
      });
  
    });
  
  });
  