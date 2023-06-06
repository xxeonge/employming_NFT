import React from 'react';
import UploadImg from './UploadImg';
// import './Form.css';
export default function MyForm() {
    function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
  
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
      // You can pass formData as a fetch body directly:
      fetch('http://localhost:8080/api/v1/user', { method: form.method, body: formData })
      .then(res => {
        console.log("response: ", res);
      })
      .catch(err => {
        console.log("error:", err);
      });

      ;
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }
  
    return (
        <div>
                    <h1>Mint NFT</h1>
      <form method="post" onSubmit={handleSubmit}>
        <UploadImg/>
        <label>
          NFT Token Name: <input name="NFT-Token-Name" defaultValue="" />
        </label>
        <hr />
        <label>
          Publisher: <input name="Publisher" defaultValue="" />
        </label>
        <hr />
        <label>
          The Number of Tokens: <input name="n-token" defaultValue="" />
        </label>
        <hr />
        <button type="submit">Submit form</button>
      </form>
      </div>
    );
  }
  