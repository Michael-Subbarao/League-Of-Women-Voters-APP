import React, { useState, useEffect } from "react";
import LWVRepCard from './LWVRepCard'

function LWVRepComponent(props) {
 
    //Declaring States
    const {apiData} = props;
    const [countryOn, setCountryOn] = useState(false);
    const [stateOn, setStateOn] = useState(false);
    const [localOn, setLocalOn] = useState(true);
  
    const [countryData] = useState(apiData.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "country";
    }));
    const [stateData] = useState(apiData.officials.filter((official, indx) => {
      return filterOffice(indx)[0].levels[0] === "administrativeArea1";
    }));
    const [localData] = useState(apiData.officials.filter((official, indx) => {
      return (
        filterOffice(indx)[0].levels[0] !== "country" &&
        filterOffice(indx)[0].levels[0] !== "administrativeArea1"
      );
    }))
  
    function toggleVisibility(className, displayState){
      let elements = document.getElementsByClassName(className)
  
      for (var i = 0; i < elements.length; i++){
          elements[i].style.display = displayState;
      }
  }
  function filterData(){
    !countryOn?toggleVisibility('lwvrep_country','none'):toggleVisibility('lwvrep_country','');
    !stateOn?toggleVisibility('lwvrep_state','none'):toggleVisibility('lwvrep_state','');
    !localOn?toggleVisibility('lwvrep_local','none'):toggleVisibility('lwvrep_local','');
  }
    useEffect(() => {
      filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateOn,localOn,countryOn]);
    
  
    function filterOffice(indx) {
      return apiData.offices.filter((office) => {
        return office.officialIndices.includes(indx);
      });
    };

    function getOfficialIndx(name) {
      return apiData.officials.findIndex(object =>{
        return object.name === name;
      })
   };
    
    return (
      <div className="lwvrep_App">
          <div className="lwvrep_selection_wrappers">
            <div
              onClick={(e) => {
                e.preventDefault();
                setCountryOn(!countryOn);
              }}
            >
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!countryOn ? "Show Federal": "Hide Federal"}>{countryOn ? <ion-icon className='lwvrep_icon' size="medium" name='checkmark-circle-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='ellipse-outline'/>} </div>
              Federal</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setStateOn(!stateOn);
              }}
            >
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!stateOn ? "Show State": "Hide State"}>{stateOn ?<ion-icon className='lwvrep_icon' size="medium" name='checkmark-circle-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='ellipse-outline'/>}</div> State</h2>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                setLocalOn(!localOn);
              }}
            >
              
              <h2 className = "lwvrep_sidebar"><div className="lwvrep_icons" title = {!localOn ? "Show Local": "Hide Local"}>{localOn ? <ion-icon className='lwvrep_icon' size="medium" name='checkmark-circle-outline'/>: <ion-icon className='lwvrep_icon' size="medium" name='ellipse-outline'/>}</div> Local</h2>
            </div>
          </div>
          <div className="lwvrep_reps">
            {
              countryData === undefined ?``: countryData.map((official, indx) => {
              return (
                <div className = 'lwvrep_country' key={indx.toString()}>
                <LWVRepCard
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                />
                </div>
              );
            })
          }
          {
              stateData === undefined ?``: stateData.map((official, indx) => {
              return (
                <div className = 'lwvrep_state' key={indx.toString()}> 
                <LWVRepCard
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                />
                </div>
              );
            })
          }
          {
              localData === undefined ?`$`: localData.map((official, indx) => {
              return (
                <div className = 'lwvrep_local' key={indx.toString()}>
                <LWVRepCard
                  official={official}
                  office={filterOffice(getOfficialIndx(official.name))}
                />
                </div>
              );
            })
          }
          </div>
      </div>
    );
  }

  export default LWVRepComponent;