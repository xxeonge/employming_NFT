const express = require("express");
const multer = require('multer');
const ethers = require("ethers");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT)
let wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
wallet = wallet.connect(provider)
// TODO: export to another file
const abi = [
    'function deploy(string memory _name, string memory _symbol, uint256 _limit, address _owner, uint256 _salt, string memory _url) external returns (address employmint)',
]
const EmploymintFactory = new ethers.Contract(process.env.EMPLOYMINT_FACTORY, abi, wallet)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });
const baseUrl = "http://localhost:8004/uploads/"

router.post("/",upload.single('file'),async (req, res) => {
    try {
        if (req.body.owner.length !== 42) return res.send('Invalid owner').end();
        //if (req.body.limit !== parseInt(req.body.limit)) return res.send('Invalid limit').end();
        if (req.body.name.length == 0) return res.send('Invalid name').end();
        if (req.body.symbol.length == 0) return res.send('Invalid symbol').end();
        if (req.body.salt.length == 0) return res.send('Invalid symbol').end();
    } catch (error) {
        res.status(500).end();
    }

    const file = req.file;
    console.log('deploy url :', baseUrl.concat(file.filename)); // deploy 시 url 파라미터이걸로 사용해주세요

    //req.body.name, req.body.symbol, req.body.limit, req.body.owner, req.body.salt, req.body.url
    //const deployHash = await EmploymintFactory.deploy("11","11","1","0xfE00fa244D69BFD8B1c108321C4713993F9EbB7C","44",baseUrl.concat(file.filename));
    //await deployHash.wait();
    //return res.status(200).send(deployHash).end();

    return res.status(200).send(req.body).end();
})

module.exports = router;