const express = require("express");
const ethers = require("ethers");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT)
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
wallet = wallet.connect(provider)
// TODO: export to another file
const abi = [
    "function deploy(string memory _name, string memory _symbol, uint256 _limit, address _owner, uint256 _salt) external returns (address)"
]
const EmploymintFactory = new ethers.Contract(process.env.EMPLOYMINT_FACTORY, abi, wallet)
router.post("/", async (req, res) => {
    try {
        if (req.body.owner.length !== 42) return res.send('Invalid owner').end();
        if (req.body.limit !== parseInt(req.body.limit)) return res.send('Invalid limit').end();
        if (req.body.name.length == 0) return res.send('Invalid name').end();
        if (req.body.symbol.length == 0) return res.send('Invalid symbol').end();
        if (req.body.salt.length == 0) return res.send('Invalid symbol').end();
    } catch (error) {
        res.status(500).end();
    }
    const deployHash = await EmploymintFactory.deploy(req.body.name, req.body.symbol, req.body.limit, req.body.owner, req.body.salt)
    return res.status(200).send(deployHash).end();
})

module.exports = router;