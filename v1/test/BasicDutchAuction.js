//for time manipulation
const { time, loadFixture, mine } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");


describe("Lock", function () {
  async function BasicDutchAuctiondeploy() {

    //retrieving ethereum accounts available on the currnt node
    const [owner, otherAccount] = await ethers.getSigners();

    const BasicDutchAuction = await ethers.getContractFactory("BasicDutchAuction");
    const basicdutchauction = await BasicDutchAuction.deploy();
    // get default signer which is owner
    signer = ethers.provider.getSigner(0);

    // get default signer, but just the address!
    [signerAddress] = await ethers.provider.listAccounts();
    return { basicdutchauction, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Check if the starting block is 0", async function () {
      //loadFixture deploys the contract
      const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
      expect(await basicdutchauction.blocknumber()).to.equal(1);
    });

    it("check if contract has been initialized correctly", async function () {
      const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
      expect(await basicdutchauction.initialPrice()).to.equal(ethers.utils.parseEther("1.6"));
      expect(await basicdutchauction.reservePrice()).to.equal(ethers.utils.parseEther("1.5"));
      expect(await basicdutchauction.offerPriceDecrement()).to.equal(ethers.utils.parseEther("0.01"));
      expect(await basicdutchauction.numBlocksAuctionOpen()).to.equal(10);
      expect(await basicdutchauction.owner()).to.equal(owner.address);
    });  

    it("Check if the initialPrice is 1600000000000000000 wei", async function () {
      var bigNum = BigInt("1600000000000000000");
      const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
      expect(await basicdutchauction.initialPrice()).to.equal(bigNum);
    });

    it("Check if Rejects lower bid", async function () {
      var bigNum = BigInt("1400000000000000000");
      const { basicdutchauction, owner } = await loadFixture(BasicDutchAuctiondeploy);
      await expect(basicdutchauction.receiveMoney({ value: bigNum })).to.be.revertedWith('Not enough ether sent.');
    });

    it("Check if Rejects second bid ", async function () {
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

    it("should revert when not enough ether is sent", async function () {
      const { basicdutchauction, owner,otherAccount } = await loadFixture(BasicDutchAuctiondeploy);
      const bidAmount = ethers.utils.parseEther("1");
      await expect(basicdutchauction.connect(otherAccount).receiveMoney({ value: bidAmount })).to.be.revertedWith(
        "Not enough ether sent."
      );
    });

  });

});
