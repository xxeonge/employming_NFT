const express = require("express");
const multer = require('multer');
const ethers = require("ethers");
const router = express.Router();
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
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
const baseUrl = "http://localhost:8080/uploads/"

router.get('/', async(req, res) => {
    // res.send('Hello, World!');
    // yes hard coded... to png
    let fileName = `${req.query.nftName}.png`;
    const uploadPath = path.join(path.dirname(__dirname), "uploads")
    res.sendFile(fileName , { root : uploadPath});

    // res.sendFile("C:/Users/min98/Documents/repos/employmint/backend/uploads/"+fileName);
    return res;
  });

router.post("/", upload.single('file'),async (req, res) => {
    // rename it https://github.com/expressjs/multer/issues/280
    // hard coded... to png
    const renamed = path.join(path.dirname(req.file.path), req.body.name+".png");
    fs.renameSync(req.file.path, renamed);


  try {
        if (req.body.owner.length !== 42) return res.send('Invalid owner').end();
        if (req.body.limit !== parseInt(req.body.limit)) return res.send('Invalid limit').end();
        if (req.body.name.length == 0) return res.send('Invalid name').end();
        if (req.body.symbol.length == 0) return res.send('Invalid symbol').end();
        if (req.body.salt.length == 0) return res.send('Invalid symbol').end();
    } catch (error) {
        res.status(500).end();
    }
    // console.log(req.body); // deploy 시 url 파라미터이걸로 사용해주세요

    const file = req.file;
    console.log('deploy url :', baseUrl.concat(file.filename)); // deploy 시 url 파라미터이걸로 사용해주세요

    //====================================================
    // 흑흑 deploy가 안되요...
    //====================================================
    // const deployHash = await EmploymintFactory.deploy("NAME","SIMBOL",1000,"99f910f4f4a1ee2e88b0726f0e3b19f8733d3f18a0fab6bb92f4ff86cb0cab9f",123, baseUrl.concat(file.filename));
    // const deployHash = await EmploymintFactory.deploy();


    return res.status(200).send(req.body).end();
})



module.exports = router;