import {ethers} from "hardhat";
const { expect } = require("chai");
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe("Employmint", () => {
    let owner: SignerWithAddress
    let recipient: SignerWithAddress
    let name: string
    let symbol: string
    let limit: number

    before(async () => {
        [owner, recipient] = await ethers.getSigners();
        name = "Employmint"
        symbol = "EPMT"
        limit = 100
    })

    const deployEmploymint = async (name: any, symbol: any, limit: any, owner: any) => {
        const Employmint = await ethers.getContractFactory("Employmint")
        const employmint = await Employmint.deploy(name, symbol, limit, owner.address)
        return employmint
    }

    it("Should deploy Eploymint", async () => {
        const employmint = await deployEmploymint(name, symbol, limit, owner)
        
        expect(employmint.address).to.not.equal(ethers.constants.AddressZero)
        expect(await employmint.name()).to.equal(name)
        expect(await employmint.symbol()).to.equal(symbol)
        expect(await employmint.owner()).to.equal(owner.address)
    })
    it("Should revert NFT mint if not owner", async () => {
        const employmint = await deployEmploymint(name, symbol, limit, owner)
        await expect(employmint.connect(recipient).mintTo(recipient.address)).to.be.revertedWith("Ownable: caller is not the owner")
    })
    it("Should mint NFT if owner", async () => {
        const employmint = await deployEmploymint(name, symbol, limit, owner)
        await employmint.connect(owner).mintTo(recipient.address)

        expect(await employmint.balanceOf(recipient.address)).to.equal(1)
        expect(await employmint.ownerOf(1)).to.equal(recipient.address)
    })
    it("Should revert when transfer", async () => {
        const employmint = await deployEmploymint(name, symbol, limit, owner)
        await employmint.connect(owner).mintTo(recipient.address)

        await expect(employmint.connect(recipient).transferFrom(recipient.address, owner.address, 1)).to.be.revertedWithCustomError(employmint, "Employmint__TransferForbidded")
    })
})