import { useState} from "react";

function LWVRepCard(props) {
    const [closed, setClosed] = useState(true);
    const { name, address, phones, channels, photoUrl, emails } =
      props.official;
    const {office} = props;
    const phone = phones ? phones[0]:'';
    const addDefaultSrc = (ev) =>{//Empty img in case of an invalid image url
      ev.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      ev.target.width="0" ;
      ev.target.height="0";
      ev.target.alt="";
    }
    return (
      <div className={closed ? "lwvrep_card lwvrep_half" : "lwvrep_card"} >
          <div className="lwvrep_name_wrapper" onClick={() => {
        setClosed(!closed);
      }}>
            <h3>
              <div className="lwvrep_name"><div className="lwvrep_icons" title = {closed ? "Expand": "Minimize"}>{!closed ? <ion-icon size="small" name='remove-outline'/>: <ion-icon size="small" name='add-outline'/>}</div>{name === undefined ? "" : name}</div>
              <div className="lwvrep_office">
                {" "}
                {office[0] === undefined ? "No Office Found" : office[0].name}
              </div>
            </h3>
          </div>
          <div className={closed ? "lwvrep_closed" : "lwvrep_open"}>
            <div className="lwvrep_photo_wrapper">
              <h4 className = 'lwvrep_address'>
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
                          key = {channel.type + channel.id}
                        >
                          <div title = {name + "'s " + channel.type} key = {channel.type + channel.id + "title"}>
                          <ion-icon
                            size="large"
                            name={"logo-" + channel.type.toLowerCase()}
                            key = {channel.type + channel.id + "logo"}
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
  export default LWVRepCard;