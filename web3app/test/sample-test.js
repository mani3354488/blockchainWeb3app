const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const WeirdFaces = await ethers.getContractFactory("WeirdFaces");
    const weirdfaces = await WeirdFaces.deploy();
    await weirdfaces.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.svg";

    let balance = await weirdfaces.balanceOf(recipient);
    except(balance).to.equal(0);

    const newlyMintedToken = await firedguys.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.01"),
    });
  });
});
