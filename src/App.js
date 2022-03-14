import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

//data structure is response.data = {
//officials[
//{name:name,address[{line1,city,state,zip}],party,phone,urls,emails,channels{type,id}}
//]
//}
function App(){
  const [data,setData] = useState(null);
  const address = '165%20Main%20St%2C%20Annapolis%2C%20MD%2021401'
  const api_key = 'AIzaSyAE3Bh7L6FsXGrfzJk75EMj8PGaHtXfryI';
  const endpoint = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=' + address + '&includeOffices=true&key=' + api_key;
  useEffect(()=>{
    axios.get(endpoint)
    .then(response =>{
      console.log(response.data);
      setData(response.data);
    })
    .catch(error => console.log(error));
  },[])
  
  return (
    <div className="App">
      <p>Hello World
      </p>
    </div>
  );
}


export default App;
