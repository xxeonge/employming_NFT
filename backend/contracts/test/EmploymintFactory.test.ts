import {ethers} from "hardhat"
import { expect } from "chai"
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe("Employmint", () => {
    let owner: SignerWithAddress
    let recipient: SignerWithAddress
    let name: string
    let symbol: string
    let limit: number
    let salt: string

    before(async () => {
        [owner, recipient] = await ethers.getSigners();
        name = "Employmint"
        symbol = "EPMT"
        limit = 100
        salt = "1"
    })

    const deployEmploymintFactory = async () => {
        const Employmint = await ethers.getContractFactory("EmploymintFactory")
        const employmint = await Employmint.deploy()
        return employmint
    }

    it("Should deploy Employmint", async () => {
        const employmint = await deployEmploymintFactory()
        
        expect(employmint.address).to.not.equal(ethers.constants.AddressZero)
    })
    it("Should deploy Employmint from Factory", async () => {
        const employmint = await deployEmploymintFactory()
        const addr = await (await employmint.deploy(name, symbol, limit, owner.address, salt)).wait()
        console.log((addr as any).events[0].address)
    })
})