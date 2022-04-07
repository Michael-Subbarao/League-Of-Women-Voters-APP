import React, { useState, useEffect } from "react";
import LWVRepComponent from './LWVRepComponent'
import axios from "axios";

function App(props)
{
  const {apiKey,address} = props;
  const updatedAddress = address.replace(/\s/g, "%20"); //--fix the address if it has spaces
  //endpoint to send to axios
  const endpoint =
  "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=" +
  updatedAddress +
  "&includeOffices=true&key=" +
  apiKey;
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
      )},[endpoint])
  if (isLoading) {
      return <div className="lwvrep_Errors">{errors}</div>;
    }
  else{
    return(
      <LWVRepComponent apiData = {apiData}/>
    )
  }
}




export default App;