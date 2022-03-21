/* eslint-disable react-hooks/exhaustive-deps */
import ReactDOM from "react-dom";
import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = "AIzaSyBL9e9-Owc0soWpWw3tcLkF_uYcoyLvlwE"; //Ip restricted
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
    const [errors,setErrors] = useState('')
    useEffect(() => { 
      setErrors('Loading...')
      axios
        .get(endpoint)
        .then((response) => {
            setApiData(response.data);
            setLoading(false);
            setErrors('')
          })
        .catch(function (error){
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data.error.errors[0].message.includes('address'));
            if(error.response.data.error.errors[0].message.includes('address'))
            {
              setErrors('Invalid address. Please make sure your address is formatted correctly.')
            }
            else{
              setErrors(`Uh oh, looks like something went wrong here. Error ${error.response.data.error.code}: ${error.response.data.error.message}`)
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            setErrors('Uh oh, looks like something went wrong here.')
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            setErrors('Uh oh, looks like something went wrong here.')
          }
        }
        )},[])
    if (isLoading) {
        return <div className="lwvrep_Errors">{errors}</div>;
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

    const [countryData,setCountryData] = useState(apiData.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "country";
    }));
    const [stateData,setStateData] = useState(apiData.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "administrativeArea1";
    }));
    const [localData,setLocalData] = useState(apiData.officials.filter((official, indx) => {
      return (
        filterOffice(indx)[0].levels[0] !== "country" &&
        filterOffice(indx)[0].levels[0] !== "administrativeArea1"
      );
    }))

    function toggleVisibillity(className, displayState){
      let elements = document.getElementsByClassName(className)
  
      for (var i = 0; i < elements.length; i++){
          elements[i].style.display = displayState;
      }
  }
    useEffect(() => {
      filterData();
    }, [stateOn,localOn,countryOn]);
    function filterData(){
      !countryOn?toggleVisibillity('lwvrep_country','none'):toggleVisibillity('lwvrep_country','');
      !stateOn?toggleVisibillity('lwvrep_state','none'):toggleVisibillity('lwvrep_state','');
      !localOn?toggleVisibillity('lwvrep_local','none'):toggleVisibillity('lwvrep_local','');
    }

    function filterOffice(indx) {
      return apiData.offices.filter((office) => {
        return office.officialIndices.includes(indx);
      });
    };
    function getOfficialIndx(name) {
      let i = 0;
      apiData.officials.map((official, indx) => {
        if (official.name === name) i = indx;
      });
      return i;
    };
    
    return (
      <div className="lwvrep_App">
          <div id="lwvrep_selection_wrappers">
            <div
              onClick={(e) => {
                e.preventDefault();
                setCountryOn(!countryOn);
              }}
            >
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!countryOn ? "Show Federal": "Hide Federal"}>{countryOn ? <ion-icon className='lwvrep_icon' size="medium" name='add-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='remove-outline'/>} </div>
              Federal</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setStateOn(!stateOn);
              }}
            >
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!stateOn ? "Show State": "Hide State"}>{stateOn ?<ion-icon className='lwvrep_icon' size="medium" name='add-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='remove-outline'/>}</div> State</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setLocalOn(!localOn);
              }}
            >
              
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!localOn ? "Show Local": "Hide Local"}>{localOn ? <ion-icon className='lwvrep_icon' size="medium" name='add-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='remove-outline'/>}</div> Local</h2>
            </div>
          </div>
          <div id="lwvrep_reps">
            {console.log(countryData)}
            {
              countryData === undefined ?``: countryData.map((official, indx) => {
              return (
                <div className = 'lwvrep_country'>
                <OfficialComponent
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                  key={'country' + indx}
                />
                </div>
              );
            })
          }
          {
              stateData === undefined ?``: stateData.map((official, indx) => {
              return (
                <div className = 'lwvrep_state'>
                <OfficialComponent
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                  key={'state' +indx}
                />
                </div>
              );
            })
          }
          {
              localData === undefined ?`$`: localData.map((official, indx) => {
              return (
                <div className = 'lwvrep_local'>
                <OfficialComponent
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                  key={'local' + indx}
                />
                </div>
              );
            })
          }
          </div>
      </div>
    );
  }

  function OfficialComponent(props) {
    const [closed, setClosed] = useState(true);
    const { name, address, party, phones, channels, photoUrl, emails } =
      props.official;
    const office = props.office;
    const phone = phones ? phones[0]:'';
    const addDefaultSrc = (ev) =>{//Empty img in case of an invalid image url
      ev.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      ev.target.width="0" ;
      ev.target.height="0";
      ev.target.alt="";
    }
    return (
      <div className="lwvrep_card" id={closed ? "lwvrep_half" : ""} >
          <div className="lwvrep_name_wrapper" onClick={() => {
        setClosed(!closed);
      }}>
            <h3>
              <div id="lwvrep_name"><div className="lwvrep_icons" title = {closed ? "Expand": "Minimize"}>{!closed ? <ion-icon size="small" name='remove-outline'/>: <ion-icon size="small" name='add-outline'/>}</div>{name === undefined ? "" : name}</div>
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
              {
                photoUrl === undefined ? ("") : <img onError={(e)=>{addDefaultSrc(e)}} src={photoUrl} alt="official"></img>
              }
            </div>
            <div className="lwvrep_contact_wrapper">
              <div>
                <h4>Phone Number:</h4> <a href={"tel: " + phone}>{phone}</a>
              </div>
              <div className = 'lwvrep_channels'>
                {channels === undefined
                  ? ""
                  : channels.map((channel,i) => {
                      return (
                        <a className = {'lwvrep_' + channel.type}
                          href={
                            "http://www." + channel.type + ".com/" + channel.id
                          }
                          target="_blank"
                          rel = "noreferrer"
                          key = {i}
                        >
                          <div title = {name + "'s " + channel.type} >
                          <ion-icon
                            size="large"
                            name={"logo-" + channel.type.toLowerCase()}
                          ></ion-icon>
                          </div>
                        </a>
                      );
                    })}
              </div>
            </div>
            <h4>Email: <a href={emails === undefined ? "" : 'mailto:' + emails[0]}>{emails === undefined ? "" :emails[0]}</a></h4>
          </div>
      </div>
    );
  }
  ReactDOM.render(<Parent />, document.getElementById("lwvrep_root"));
}
var originalFunction = lwvRep_renderComponent;
window.lwvRep_renderComponent = function(a,b){
  try {
    var returnValue = originalFunction.call(this, a, b);
    return returnValue;
  }
  catch (e) {
    throw e;
  }
}
//lwvRep_renderComponent("AIzaSyBL9e9-Owc0soWpWw3tcLkF_uYcoyLvlwE", "165%20Main%20St%2C%20Annapolis%2C%20MD%2021401");
