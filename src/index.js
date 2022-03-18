/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = "AIzaSyAE3Bh7L6FsXGrfzJk75EMj8PGaHtXfryI";
const address = "165%20Main%20St%2C%20Annapolis%2C%20MD%2021401";



function lwvRep_renderComponent(address, api_key) {
  const updatedAddress = address.replace(/\s/g, "%20"); //--fix the address if it has spaces
  //endpoint to send to axios
  const endpoint =
    "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" +
    updatedAddress +
    "&includeOffices=true&key=" +
    api_key;
  function Parent()
  {
    const [apiData,setApiData] = useState('');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => { 
      axios
        .get(endpoint)
        .then((response) => {
            setApiData(response.data);
            setLoading(false);
          })
          .catch((error) => console.log(error))},[])
    if (isLoading) {
        return <div className="lwvrep_App">Loading...</div>;
      }
    else{
      return(
        <App apiData = {apiData}/>
      )
    }
  }
  function App(props) {
   
    //Declaring States
    const {apiData} = props;
    const [countryOn, setCountryOn] = useState(false);
    const [stateOn, setStateOn] = useState(false);
    const [localOn, setLocalOn] = useState(true);
    const [data,setData] = useState(apiData);
    const [fdata,setFData] = useState(apiData);

    //getting data from endpoint
    
 
    useEffect(() => {
      filterData();
    }, [countryOn, stateOn, localOn]);
    
    const filterOffice = (indx) => {
      return fdata.offices.filter((office) => {
        return office.officialIndices.includes(indx);
      });
    };
    const getOfficialIndx = (name) => {
      let i = 0;
      data.officials.map((official, indx) => {
        if (official.name === name) i = indx;
      });
      return i;
    };
    const countryLevel = data.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "country";
    });
    const stateLevel = data.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "administrativeArea1";
    });
    const localLevel = data.officials.filter((official, indx) => {
      return (
        filterOffice(indx)[0].levels[0] !== "country" &&
        filterOffice(indx)[0].levels[0] !== "administrativeArea1"
      );
    });
    function filterData() {
      let totalData = [];
      if (countryOn) {
        totalData.push.apply(totalData, countryLevel);
      }
      if (stateOn) {
        totalData.push.apply(totalData, stateLevel);
      }
      if (localOn) {
        totalData.push.apply(totalData, localLevel);
      }
      setFData({ ...data, officials: totalData });
    }
    const start = () => {
      setFData({ ...data, officials: localLevel });
    };
    return (
      <div className="lwvrep_App">
          <div id="lwvrep_selection_wrappers">
            <div
              onClick={(e) => {
                setCountryOn(!countryOn, filterData);
              }}
            >
              <h2>{countryOn ? <ion-icon size="large" name='add-outline'/>: <ion-icon size="large" name='remove-outline'/>} Country</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setStateOn(!stateOn);
                filterData();
              }}
            >
              <h2>{stateOn ?<ion-icon size="large" name='add-outline'/>: <ion-icon size="large" name='remove-outline'/>} State</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setLocalOn(!localOn);
                filterData();
              }}
            >
              <h2>{localOn ? <ion-icon size="large" name='add-outline'/>: <ion-icon size="large" name='remove-outline'/>} Local</h2>
            </div>
          </div>
          <div id="lwvrep_reps">
            {fdata.officials.map((official, indx) => {
              return (
                <OfficialComponent
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                  key={indx}
                />
              );
            })}
          </div>
      </div>
    );
  }

  function OfficialComponent(props) {
    const [closed, setClosed] = useState(true);
    const { name, address, party, phones, channels, photoUrl, emails } =
      props.official;
    const office = props.office;
    const phone = phones[0];
    return (
      <div className="lwvrep_card" id={closed ? "lwvrep_half" : ""} 
      onClick={() => {
        setClosed(!closed);
      }}>
        
          <div className="lwvrep_name_wrapper">
            <h3>
              <div id="lwvrep_name">{closed ? <ion-icon size="large" name='remove-outline'/>: <ion-icon size="large" name='add-outline'/>} {name === undefined ? "" : name}</div>
              <div id="lwvrep_office">
                {" "}
                {office[0] === undefined ? "" : office[0].name}
              </div>
            </h3>
          </div>
          <div id={closed ? "lwvrep_closed" : "lwvrep_open"}>
            <div className="lwvrep_photo_wrapper">
              <h4>
                Address:{" "}
                {address === undefined
                  ? ""
                  : address[0].city +
                    " " +
                    address[0].line1 +
                    " " +
                    address[0].state +
                    " " +
                    address[0].zip}
              </h4>
              {photoUrl === undefined ? (
                ""
              ) : (
                <img src={photoUrl} alt="official"></img>
              )}
            </div>
            <div className="lwvrep_contact_wrapper">
              <div>
                <h4>Phone Number:</h4> <a href={"tel: " + phone}>{phone}</a>
              </div>
              <div>
                {channels === undefined
                  ? ""
                  : channels.map((channel,i) => {
                      return (
                        <a
                          href={
                            "http://www." + channel.type + ".com/" + channel.id
                          }
                          key = {i}
                        >
                          <ion-icon
                            size="large"
                            name={"logo-" + channel.type.toLowerCase()}
                          ></ion-icon>
                        </a>
                      );
                    })}
              </div>
            </div>
            <h4>Email: {emails === undefined ? "" : emails[0]}</h4>
          </div>
      </div>
    );
  }
  ReactDOM.render(<Parent />, document.getElementById("lwvrep_root"));
}
lwvRep_renderComponent(address, api_key);