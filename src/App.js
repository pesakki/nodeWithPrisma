import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import image1 from './image1.png';
import gif from './employees-waves.gif';

function App() {
  const [dob, setDob] = useState(null);

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <div className="header">
            <h2>
              Add Employee
              <img src={image1} alt="image1" className="logo" />
            </h2>
          </div>
          <div className="personal-details">
            <h3>Personal Details</h3>
            <div className="input-fields">
              <div className="row">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <div className="row">
                <input type="number" placeholder="Mobile Number" />
                <input type="text" placeholder="Email" />
              </div>
              <div className="row">
                <DatePicker
                  selected={dob}
                  onChange={(date) => setDob(date)}
                  placeholderText="DOB"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="row">
                <textarea placeholder="Address" rows="3" cols="100"></textarea>
              </div>
            </div>
          </div>
          <div className="bank-details">
            <h3>Bank Details</h3>
            <div className="input-fields">
              <div className="row">
                <input type="number" placeholder="Account Number" />
                <input type="text" placeholder="IFSC Code" />
              </div>
              <textarea placeholder="Bank Name" rows="3" cols="100"></textarea>
              <br></br>
              <input type="text" placeholder="Branch Name" />
              <br></br>
              <div className="row">
                <button className="save-button">Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="gif-box">
          <img src={gif} alt="gif" className="gif" />
          <div className="no-employees">No Employees found!</div>
        </div>
      </div>
    </div>
  );
}

export default App;
