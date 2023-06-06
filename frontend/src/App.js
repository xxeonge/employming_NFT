import React, { Component } from "react";
import CalendarViewer from "./components/calendar";
import FormSignup from "./components/mintNFTForm";
class App extends Component {

  render() {
    return (

      <div>
        <div className="row">
        <div className="col-sm-8">
        <CalendarViewer/>

        </div>
        <div className="col-sm-4">
        <FormSignup/>
        </div>
        </div>


      </div>
    );
  }
}

export default App;
