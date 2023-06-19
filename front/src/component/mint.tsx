import React, {useState, useEffect, ChangeEvent} from 'react';
const {ethers,web3} = require("ethers")

const Mint = () => {
  
    const [account, setAccount] = useState<string>('');

    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [img, setImg] = useState<File | null>(null);
    const [isShown, setIsShown] = useState(false);



    const [nftName, setNftName] = useState('');
    const [publishedNftName, publishNftName] = useState<string>('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };

  
    const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSymbol(event.target.value);
    };

    const handleNftNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNftName(event.target.value);
    };

    

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        setIsShown(current => !current);
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
            const response = await fetch('http://localhost:8080/api/v1/sbt', {
                method: 'POST',
                body: formData,
            });
            console.log('Server response:', response);
        }catch(error){
            console.log(error);
        }

        // console.log("THIS IS RESPONSE!", response.text());
  
    };

    
    const handleShowContract = async(event: React.FormEvent) => {
        event.preventDefault();        
        publishNftName(nftName);
    };
    // I know... not good coding style.
    return (
        <div>

                <h1 onClick={walletConnect}>
                    Wallet Address : {account}
                </h1>
                <h1>Mint NFT</h1>
        
                <form onSubmit={handleUpload}>
                    <p>
                        <input type="file" id="img" onChange={handleImgChange} />
                    </p>
                    <p>

                    <label> 
                        인증서 이름 : <input type="text" id="name" value={name} onChange={handleNameChange} />
                    </label>
                    </p>
                    <p>
                    <label>
                        인증서 식별자 : <input type="text" id="symbol" value={symbol} onChange={handleSymbolChange} />
                    </label>
                    </p>
                    <hr/>
                    <button type="submit">인증서 발행</button>
                </form>


            <h1>Show Contract</h1>

            <form onSubmit={handleShowContract}>
                <p>
                <label> 
                    인증서 이름 : <input type="text" id="nftName" value={nftName} onChange={handleNftNameChange} />
                </label>
                <hr/>
                </p>

                <button type="submit">컨트랙트 보기</button>
                {publishedNftName && <img src={`http://localhost:8080/api/v1/sbt?nftName=${publishedNftName}`} alt="" />}
            </form>

        </div>

    );
};

export default Mint;