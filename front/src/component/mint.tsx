import React, {useState, useEffect, ChangeEvent} from 'react';
const {ethers,web3} = require("ethers")

const Mint = () => {
  
    const [account, setAccount] = useState<string>('');

    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [img, setImg] = useState<File | null>(null);
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };


    const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImg(file || null);
      };
    
  
    useEffect(() => {
        walletConnect();
    },[]);
 

    const walletConnect = async() => {
        const provider = new ethers.BrowserProvider(window?.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts)
        console.log(accounts[0])
    };


    const handleUpload = async(event: React.FormEvent) => {
        event.preventDefault();
        const salt = Math.floor(Math.random() * 100000) + 1;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('symbol', symbol);
        formData.append('salt', salt.toString());
        formData.append('limit', '1');
        formData.append('owner', account);
        if (img) {
            formData.append('file', img);
        }


        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        
        try{
            const response = await fetch('http://localhost:8004/api/v1/sbt', {
                method: 'POST',
                body: formData,
            });
            console.log('Server response:', response);
        }catch(error){
            console.log(error);
        }
  
    };

    
    return (
        <div>
            <h1 onClick={walletConnect}>
                Wallet Address : {account}
            </h1>
            <h1>Mint NFT</h1>
    
            <form onSubmit={handleUpload}>
                <div>
                    <input type="file" id="img" onChange={handleImgChange} />
                </div>
        
                <label> 
                    인증서 이름 : <input type="text" id="name" value={name} onChange={handleNameChange} />
                </label>
                <hr/>
                <label>
                    인증서 식별자 : <input type="text" id="symbol" value={symbol} onChange={handleSymbolChange} />
                </label>
                <hr/>
                <button type="submit">인증서 발행</button>
            </form>
        </div>

    );
};

export default Mint;