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
    useEffect(() => {
      filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateOn,localOn,countryOn]);
    function filterData(){
      !countryOn?toggleVisibility('lwvrep_country','none'):toggleVisibility('lwvrep_country','');
      !stateOn?toggleVisibility('lwvrep_state','none'):toggleVisibility('lwvrep_state','');
      !localOn?toggleVisibility('lwvrep_local','none'):toggleVisibility('lwvrep_local','');
    }
  
    function filterOffice(indx) {
      return apiData.offices.filter((office) => {
        return office.officialIndices.includes(indx);
      });
    };
    function getOfficialIndx(name) {
      return apiData.officials.map((official, indx) => {
        if (official.name === name) return indx;
        return null;
      });
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
          <div id="lwvrep_reps">
            {
              countryData === undefined ?``: countryData.map((official, indx) => {
              return (
                <div className = 'lwvrep_country'>
                <LWVRepCard
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
                <LWVRepCard
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
                <LWVRepCard
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

  export default LWVRepComponent;