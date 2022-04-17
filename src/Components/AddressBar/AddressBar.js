import React, { useState, ChangeEvent }  from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import App from "../App";

export default function AddressBar() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete({
    debounce: 1000
  });
  
  const [submitted,setSubmitted] = useState(false);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };
  const handleSubmit = (e) => {
    setSubmitted(true);
  }
  const renderSuggestions = () => {
    const suggestions = data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));

    return (
      <>
        {suggestions}
      </>
    );
  };

  return (
    <div className="lwvrep_addressBar">
      <div className="lwvrep_hide" style = {submitted? {display: "none"} : {} }>
      <h1 className="lwvrep_title">Enter Your Address</h1>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          style={{ width: 300, maxWidth: "90%" }}
          value={value}
          onChange={handleInput}
          disabled={!ready}
        />
        
        <ComboboxPopover>
          <ComboboxList>{status === "OK" && renderSuggestions()}</ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <button className = "lwvrep_submit" onClick={handleSubmit}>
          Submit
      </button>
      </div>
      {submitted && <App address={value} apiKey= 'AIzaSyBL9e9-Owc0soWpWw3tcLkF_uYcoyLvlwE'/>}
    </div>
  );
}