import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

const dummyData = {
  "normalizedInput": {
      "line1": "165 Main Street",
      "city": "Annapolis",
      "state": "MD",
      "zip": "21401"
  },
  "kind": "civicinfo#representativeInfoResponse",
  "divisions": {
      "ocd-division/country:us": {
          "name": "United States",
          "officeIndices": [
              0,
              1
          ]
      },
      "ocd-division/country:us/state:md/cd:3": {
          "name": "Maryland's 3rd congressional district",
          "officeIndices": [
              3
          ]
      },
      "ocd-division/country:us/state:md/sldu:30": {
          "name": "Maryland State Senate district 30",
          "alsoKnownAs": [
              "ocd-division/country:us/state:md/sldl:30"
          ],
          "officeIndices": [
              8
          ]
      },
      "ocd-division/country:us/state:md/district_court:5": {
          "name": "MD State District Court - 5th District"
      },
      "ocd-division/country:us/state:md": {
          "name": "Maryland",
          "officeIndices": [
              2,
              4,
              5,
              6,
              7
          ]
      },
      "ocd-division/country:us/state:md/county:anne_arundel": {
          "name": "Anne Arundel County",
          "officeIndices": [
              10,
              11,
              12,
              13,
              14
          ]
      },
      "ocd-division/country:us/state:md/county:anne_arundel/school_district:anne_arundel_county_public_schools": {
          "name": "anne arundel county public schools"
      },
      "ocd-division/country:us/state:md/place:annapolis": {
          "name": "Annapolis city",
          "officeIndices": [
              16
          ]
      },
      "ocd-division/country:us/state:md/sldl:30a": {
          "name": "Maryland State Legislative Subdistrict 30A",
          "officeIndices": [
              9
          ]
      },
      "ocd-division/country:us/state:md/county:anne_arundel/council_district:6": {
          "name": "Anne Arundel County MD County Council District 6",
          "officeIndices": [
              15
          ]
      }
  },
  "offices": [
      {
          "name": "President of the United States",
          "divisionId": "ocd-division/country:us",
          "levels": [
              "country"
          ],
          "roles": [
              "headOfGovernment",
              "headOfState"
          ],
          "officialIndices": [
              0
          ]
      },
      {
          "name": "Vice President of the United States",
          "divisionId": "ocd-division/country:us",
          "levels": [
              "country"
          ],
          "roles": [
              "deputyHeadOfGovernment"
          ],
          "officialIndices": [
              1
          ]
      },
      {
          "name": "U.S. Senator",
          "divisionId": "ocd-division/country:us/state:md",
          "levels": [
              "country"
          ],
          "roles": [
              "legislatorUpperBody"
          ],
          "officialIndices": [
              2,
              3
          ]
      },
      {
          "name": "U.S. Representative",
          "divisionId": "ocd-division/country:us/state:md/cd:3",
          "levels": [
              "country"
          ],
          "roles": [
              "legislatorLowerBody"
          ],
          "officialIndices": [
              4
          ]
      },
      {
          "name": "Governor of Maryland",
          "divisionId": "ocd-division/country:us/state:md",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "headOfGovernment"
          ],
          "officialIndices": [
              5
          ]
      },
      {
          "name": "Lieutenant Governor of Maryland",
          "divisionId": "ocd-division/country:us/state:md",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "deputyHeadOfGovernment"
          ],
          "officialIndices": [
              6
          ]
      },
      {
          "name": "MD Attorney General",
          "divisionId": "ocd-division/country:us/state:md",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              7
          ]
      },
      {
          "name": "MD State Comptroller",
          "divisionId": "ocd-division/country:us/state:md",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              8
          ]
      },
      {
          "name": "MD State Senator",
          "divisionId": "ocd-division/country:us/state:md/sldu:30",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "legislatorUpperBody"
          ],
          "officialIndices": [
              9
          ]
      },
      {
          "name": "MD State Representative",
          "divisionId": "ocd-division/country:us/state:md/sldl:30a",
          "levels": [
              "administrativeArea1"
          ],
          "roles": [
              "legislatorLowerBody"
          ],
          "officialIndices": [
              10,
              11
          ]
      },
      {
          "name": "Anne Arundel County Executive",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "headOfGovernment"
          ],
          "officialIndices": [
              12
          ]
      },
      {
          "name": "Anne Arundel County State's Attorney",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              13
          ]
      },
      {
          "name": "Anne Arundel County Clerk of Circuit Court",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              14
          ]
      },
      {
          "name": "Anne Arundel County Sheriff",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              15
          ]
      },
      {
          "name": "Anne Arundel County Register Of Wills",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "governmentOfficer"
          ],
          "officialIndices": [
              16
          ]
      },
      {
          "name": "Anne Arundel County Council Member",
          "divisionId": "ocd-division/country:us/state:md/county:anne_arundel/council_district:6",
          "levels": [
              "administrativeArea2"
          ],
          "roles": [
              "legislatorLowerBody"
          ],
          "officialIndices": [
              17
          ]
      },
      {
          "name": "Mayor of Annapolis",
          "divisionId": "ocd-division/country:us/state:md/place:annapolis",
          "levels": [
              "locality"
          ],
          "roles": [
              "headOfGovernment"
          ],
          "officialIndices": [
              18
          ]
      }
  ],
  "officials": [
      {
          "name": "Joseph R. Biden",
          "address": [
              {
                  "line1": "1600 Pennsylvania Avenue Northwest",
                  "city": "Washington",
                  "state": "DC",
                  "zip": "20500"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(202) 456-1111"
          ],
          "urls": [
              "https://www.whitehouse.gov/",
              "https://en.wikipedia.org/wiki/Joe_Biden"
          ],
          "channels": [
              {
                  "type": "Twitter",
                  "id": "potus"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "The White House 1600 Pennsylvania Avenue NW Washington, DC 20500",
                  "featureId": {
                      "cellId": "9923602325795527449",
                      "fprint": "11513381022022344111"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 126.14545494347092,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Kamala D. Harris",
          "address": [
              {
                  "line1": "1600 Pennsylvania Avenue Northwest",
                  "city": "Washington",
                  "state": "DC",
                  "zip": "20500"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(202) 456-1111"
          ],
          "urls": [
              "https://www.whitehouse.gov/",
              "https://en.wikipedia.org/wiki/Kamala_Harris"
          ],
          "channels": [
              {
                  "type": "Twitter",
                  "id": "VP"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "The White House 1600 Pennsylvania Avenue NW Washington, DC 20500",
                  "featureId": {
                      "cellId": "9923602325795527449",
                      "fprint": "11513381022022344111"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 126.14545494347092,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Benjamin L. Cardin",
          "address": [
              {
                  "line1": "509 Hart Senate Office Building",
                  "city": "Washington",
                  "state": "DC",
                  "zip": "20510"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(202) 224-4524"
          ],
          "urls": [
              "https://www.cardin.senate.gov/",
              "https://en.wikipedia.org/wiki/Ben_Cardin"
          ],
          "photoUrl": "http://bioguide.congress.gov/bioguide/photo/C/C000141.jpg",
          "channels": [
              {
                  "type": "Facebook",
                  "id": "senatorbencardin"
              },
              {
                  "type": "Twitter",
                  "id": "SenatorCardin"
              },
              {
                  "type": "YouTube",
                  "id": "SenatorCardin"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "509 Hart Senate Office Building, Washington DC 20510",
                  "featureId": {
                      "cellId": "9923602661160726555",
                      "fprint": "13491012159388313795"
                  },
                  "featureType": "typePostalCode",
                  "positionPrecisionMeters": 500,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "Chris Van Hollen",
          "address": [
              {
                  "line1": "110 Hart Senate Office Building",
                  "city": "Washington",
                  "state": "DC",
                  "zip": "20510"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(202) 224-4654"
          ],
          "urls": [
              "https://www.vanhollen.senate.gov/",
              "https://en.wikipedia.org/wiki/Chris_Van_Hollen"
          ],
          "photoUrl": "http://bioguide.congress.gov/bioguide/photo/V/V000128.jpg",
          "emails": [
              "correspondence@vanhollen.senate.gov",
              "info@vanhollen.org"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "chrisvanhollen"
              },
              {
                  "type": "Twitter",
                  "id": "ChrisVanHollen"
              },
              {
                  "type": "YouTube",
                  "id": "RepChrisVanHollen"
              },
              {
                  "type": "YouTube",
                  "id": "UCBSlMoNO-4flZ4CupiiCrdQ"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "110 Hart Senate Office Building, Washington DC 20510",
                  "featureId": {
                      "cellId": "9923602661160726555",
                      "fprint": "13491012159388313795"
                  },
                  "featureType": "typePostalCode",
                  "positionPrecisionMeters": 500,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "John P. Sarbanes",
          "address": [
              {
                  "line1": "2370 Rayburn House Office Building",
                  "city": "Washington",
                  "state": "DC",
                  "zip": "20515"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(202) 225-4016"
          ],
          "urls": [
              "https://sarbanes.house.gov/",
              "https://en.wikipedia.org/wiki/John_Sarbanes"
          ],
          "photoUrl": "http://bioguide.congress.gov/bioguide/photo/S/S001168.jpg",
          "channels": [
              {
                  "type": "Facebook",
                  "id": "RepSarbanes"
              },
              {
                  "type": "Twitter",
                  "id": "RepSarbanes"
              },
              {
                  "type": "YouTube",
                  "id": "RepJohnSarbanes"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "2370 Rayburn House Office Building, Washington, DC 20515-2003",
                  "featureId": {
                      "cellId": "9923602067032561107",
                      "fprint": "3004281461341646448"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 162.19669259570352,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "Larry Hogan",
          "address": [
              {
                  "line1": "100 State Circle",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Republican Party",
          "phones": [
              "(410) 974-3901"
          ],
          "urls": [
              "https://governor.maryland.gov/",
              "https://en.wikipedia.org/wiki/Larry_Hogan"
          ],
          "photoUrl": "http://governor.maryland.gov/wp-content/uploads/2015/01/larry-hogan-md-gov.jpg",
          "channels": [
              {
                  "type": "Facebook",
                  "id": "GovLarryHogan"
              },
              {
                  "type": "Twitter",
                  "id": "GovLarryHogan"
              },
              {
                  "type": "YouTube",
                  "id": "UCC9-LqdXPTfO765n5uSwIxg"
              },
              {
                  "type": "YouTube",
                  "id": "GovHogan"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "100 State Circle, Annapolis, MD 21401-1925",
                  "featureId": {
                      "cellId": "9923671126709922113",
                      "fprint": "9594099180577934348"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 57.94022253084496,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Boyd Rutherford",
          "address": [
              {
                  "line1": "100 State Circle",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Republican Party",
          "phones": [
              "(410) 974-3901"
          ],
          "urls": [
              "https://governor.maryland.gov/ltgovernor/",
              "https://en.wikipedia.org/wiki/Boyd_Rutherford"
          ],
          "photoUrl": "http://governor.maryland.gov/wp-content/uploads/2015/01/lt_governor.jpg",
          "channels": [
              {
                  "type": "Facebook",
                  "id": "BoydKRutherford"
              },
              {
                  "type": "Twitter",
                  "id": "BoydKRutherford"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "100 State Circle, Annapolis, MD 21401-1925",
                  "featureId": {
                      "cellId": "9923671126709922113",
                      "fprint": "9594099180577934348"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 57.94022253084496,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Brian E. Frosh",
          "address": [
              {
                  "line1": "200 Saint Paul Place",
                  "city": "Baltimore",
                  "state": "MD",
                  "zip": "21202"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 576-6300"
          ],
          "urls": [
              "https://www.marylandattorneygeneral.gov/",
              "https://en.wikipedia.org/wiki/Brian_Frosh"
          ],
          "emails": [
              "oag@oag.state.md.us"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "MarylandAttorneyGeneral"
              },
              {
                  "type": "Twitter",
                  "id": "BrianFrosh"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "200 St. Paul Place, Baltimore, MD 21202",
                  "featureId": {
                      "cellId": "9928190459080829337",
                      "fprint": "3468916309070668204"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 63.0047371702421,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Peter Franchot",
          "address": [
              {
                  "line1": "80 Calvert Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 260-7980"
          ],
          "urls": [
              "https://www.marylandtaxes.gov/",
              "https://en.wikipedia.org/wiki/Peter_Franchot"
          ],
          "emails": [
              "mdcomptroller@comp.state.md.us"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "ComptrollerofMaryland"
              },
              {
                  "type": "Twitter",
                  "id": "MDComptroller"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "80 Calvert St, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671131752499427",
                      "fprint": "9678306513531095725"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 70.01928827323951,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Sarah K. Elfreth",
          "address": [
              {
                  "line1": "103 James Senate Office Building",
                  "line2": "11 Bladen Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 841-3578"
          ],
          "urls": [
              "http://mgaleg.maryland.gov/mgawebsite/Members/Details/elfreth01",
              "https://en.wikipedia.org/wiki/Sarah_K._Elfreth"
          ],
          "emails": [
              "sarah.elfreth@senate.state.md.us"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "SarahforSenate"
              },
              {
                  "type": "Twitter",
                  "id": "SenatorSarah"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "103 James Senate Office Building, 11 Bladen Street, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671128780132021",
                      "fprint": "3456932501250810746"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 109.98710591061592,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "Dana Jones",
          "address": [
              {
                  "line1": "152 HOUSE OFFICE BUILDING",
                  "line2": "6 Bladen Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 841-3211"
          ],
          "urls": [
              "http://mgaleg.maryland.gov/mgawebsite/Members/Details/jones01",
              "https://en.wikipedia.org/wiki/Dana_Jones_%28politician%29"
          ],
          "emails": [
              "dana.jones@house.state.md.us"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "DanaJones30A"
              },
              {
                  "type": "Twitter",
                  "id": "DanaCJones"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "152 HOUSE OFFICE BUILDING, 6 BLADEN ST, ANNAPOLIS MD 21401",
                  "featureId": {
                      "cellId": "9923671134784234021",
                      "fprint": "13169367592438156512"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 113.7837737578228,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "Shaneka Henson",
          "address": [
              {
                  "line1": "154 HOUSE OFFICE BUILDING",
                  "line2": "6 Bladen Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 841-3045"
          ],
          "urls": [
              "http://mgaleg.maryland.gov/mgawebsite/Members/Details/henson01",
              "https://en.wikipedia.org/wiki/Shaneka_Henson"
          ],
          "emails": [
              "shaneka.henson@house.state.md.us"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "ShanekaHensonD30A"
              },
              {
                  "type": "Twitter",
                  "id": "ShanekaHenson"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "154 HOUSE OFFICE BUILDING, 6 BLADEN ST, ANNAPOLIS MD 21401",
                  "featureId": {
                      "cellId": "9923671134784234021",
                      "fprint": "13169367592438156512"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 113.7837737578228,
                  "addressUnderstood": false
              }
          ]
      },
      {
          "name": "Steuart Pittman",
          "address": [
              {
                  "line1": "44 Calvert Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21404"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 222-1821"
          ],
          "urls": [
              "https://www.aacounty.org/departments/county-executive/"
          ],
          "emails": [
              "spittman@aacounty.org"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "AACoExec"
              },
              {
                  "type": "Twitter",
                  "id": "AACoExec"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "44 Calvert Street, Annapolis, MD 21404",
                  "featureId": {
                      "cellId": "9923671131406969313",
                      "fprint": "13819820189828273063"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 65.29288122470726,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Anne Colt Leitess",
          "address": [
              {
                  "line1": "8 Church Circle",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 222-1740"
          ],
          "urls": [
              "https://www.aacounty.org/departments/sao/"
          ],
          "emails": [
              "aacsao@aacounty.org"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "aacosao"
              },
              {
                  "type": "Twitter",
                  "id": "AnneArundelSAO"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "8 Church Circle, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671129271532875",
                      "fprint": "6195926536847520283"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 34.6311848695407,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Scott A. Poyer",
          "address": [
              {
                  "line1": "8 Church Circle",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 222-1397"
          ],
          "urls": [
              "http://www.circuitcourt.org/clerk-circuit-court/clerk-of-the-court"
          ],
          "emails": [
              "aaclerkadmin@mdcourts.gov"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "ClerkAnneArundel"
              },
              {
                  "type": "Twitter",
                  "id": "ClerkAA"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "8 Church Circle, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671129271532875",
                      "fprint": "6195926536847520283"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 34.6311848695407,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Jim Fredericks",
          "address": [
              {
                  "line1": "8 Church Circle",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Republican Party",
          "phones": [
              "(410) 222-1570"
          ],
          "urls": [
              "https://www.aacounty.org/departments/sheriff/"
          ],
          "emails": [
              "shwebmail@aacounty.org"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "Anne-Arundel-County-Sheriffs-Office-589875687849672"
              },
              {
                  "type": "Twitter",
                  "id": "AACOSHERIFF"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "8 Church Circle, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671129271532875",
                      "fprint": "6195926536847520283"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 34.6311848695407,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Lauren M. Parker",
          "party": "Republican Party",
          "phones": [
              "(410) 222-1430"
          ],
          "urls": [
              "http://registers.maryland.gov/main/annearundel.html"
          ],
          "emails": [
              "row.aacounty@registers.maryland.gov"
          ],
          "geocodingSummaries": [
              {
                  "queryString": "PO Box 2368, Annapolis, MD 21404",
                  "featureId": {
                      "cellId": "9923671128498836733",
                      "fprint": "4307388776833277590"
                  },
                  "featureType": "typePostalCode",
                  "positionPrecisionMeters": 500,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Lisa D. B. Rodvien",
          "address": [
              {
                  "line1": "44 Calvert Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 222-1401"
          ],
          "urls": [
              "https://www.aacounty.org/departments/county-council/councilmembers/district-6/"
          ],
          "emails": [
              "lisa.rodvien@aacounty.org"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "FriendsofLisaRodvien"
              },
              {
                  "type": "Twitter",
                  "id": "LisaRodvien"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "44 Calvert Street 1st Floor, Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671131406969313",
                      "fprint": "2967780225120704016"
                  },
                  "featureType": "typeCompoundSection",
                  "positionPrecisionMeters": 65.29288122470726,
                  "addressUnderstood": true
              }
          ]
      },
      {
          "name": "Gavin Buckley",
          "address": [
              {
                  "line1": "160 Duke of Gloucester Street",
                  "city": "Annapolis",
                  "state": "MD",
                  "zip": "21401"
              }
          ],
          "party": "Democratic Party",
          "phones": [
              "(410) 263-7997"
          ],
          "urls": [
              "https://www.annapolis.gov/371/Mayors-Office",
              "https://en.wikipedia.org/wiki/Gavin_Buckley"
          ],
          "emails": [
              "mayorbuckley@annapolis.gov"
          ],
          "channels": [
              {
                  "type": "Facebook",
                  "id": "GavinBuckley4Annapolis"
              },
              {
                  "type": "Twitter",
                  "id": "gavin4annapolis"
              }
          ],
          "geocodingSummaries": [
              {
                  "queryString": "160 Duke of Gloucester Annapolis, MD 21401",
                  "featureId": {
                      "cellId": "9923671081771193425",
                      "fprint": "4041237450501843849"
                  },
                  "featureType": "typeCompoundBuilding",
                  "positionPrecisionMeters": 31.27048141663268,
                  "addressUnderstood": true
              }
          ]
      }
  ]
};

//data structure is response.data = {
//offices[{levels[],name,roles[]}]
//officials[]
//{name:name,address[{line1,city,state,zip}],party,phone,urls,emails,channels{type,id}}
//]
//}
function App(props){
  //name.replace(/\s/g, '%20')  --fix the address
  const [data,setData] = useState(dummyData);
  const [fdata,setFData] = useState(dummyData);
  const address = '165%20Main%20St%2C%20Annapolis%2C%20MD%2021401'
  const address2 = '707%20W%20Main%20St%20Henryetta%20OK%2074437'
  const api_key = 'AIzaSyAE3Bh7L6FsXGrfzJk75EMj8PGaHtXfryI';
  const endpoint = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=' + address2 + '&includeOffices=true&key=' + api_key;
  
  /**
  useEffect(()=>{
    axios.get(endpoint)
    .then(response =>{
      console.log(response.data);
      setFData(response.data)
      setData(response.data);
      ;
    })
    .catch(error => console.log(error));
  },[endpoint])
*/
  const filterOffice = (indx) =>{
    return fdata.offices.filter((office)=>{
      return office.officialIndices.includes(indx);
    })
  }
  const stateLevel = data.officials.filter((official,indx)=>{
    return filterOffice(indx)[0].levels[0] !== 'country';
  });
  const localLevel = data.officials.filter((official,indx)=>{
    return filterOffice(indx)[0].levels[0] !== 'country' && filterOffice(indx)[0].levels[0] !== 'administrativeArea1';
  });
  console.log(stateLevel);
  const filterData = (type) =>{
    if(type==='country'){
      setFData(data);
    }
    if(type==='state'){
      setFData({...data,officials:stateLevel});
    }
    if(type==='local'){
      setFData({...data,officials:localLevel});
    }
  }

  return (
    <div className="App">
      <div id = 'selection-wrappers'>
        <div onClick = {()=>{filterData('country')}}><h1>Country</h1></div>
        <div onClick = {()=>{filterData('state')}}><h1>State</h1></div>
        <div onClick = {()=>{filterData('local')}}><h1>Locality</h1></div>
      </div>
      { 
        fdata.officials.map((official,indx)=>{
        return <OfficialComponent official = {official} office = {filterOffice(indx+data.officials.length-fdata.officials.length)} key = {indx}/>
        })
      }
    </div>
  );
}

  //Creating the basic component
export default App;

function OfficialComponent(props){
  const [closed,setClosed] = useState(true);
  const {name,address,party,phones,channels,photoUrl} = props.official;
  const office = props.office;
  const phone = phones[0];
  console.log(channels)
  return (
    
  <div className="wrapper" id = {closed? 'half': ''}>
  <div className="official-card" onClick = {()=>{setClosed(!closed)}}>
    <button onClick = {()=>{setClosed(!closed)}} id = 'minimize'/>
    <div className="name-wrapper">
      <h3><div id = 'name'>Name: {name===undefined? '' : name}</div><div id = 'office'> {office[0]===undefined? '' : office[0].name}</div></h3>
    </div>
    <div id = {closed? 'closed': 'open'}>
      <div className="photo-wrapper">
      <h4>Address: {address===undefined? '' : address[0].city + ' ' + address[0].line1 + ' ' +  address[0].state + ' ' +  address[0].zip}</h4> 
      {photoUrl===undefined? '' : <img src = {photoUrl} alt = 'official'></img>}
      </div>
      <div className="contact-wrapper">
        <div>
          <h4>Phone Number:</h4> <a href={'tel: ' + phone}>{phone}</a>
        </div>
        <div>
        {
          channels === undefined? '': channels.map((channel)=>{
          return <a href ={'http://www.' + channel.type+'.com/' + channel.id}><ion-icon size = 'large' name={'logo-'+channel.type.toLowerCase() } ></ion-icon></a>
        })
        }
        </div>
    </div>
    </div>
  </div>
</div>)
}

//<address>{address[0].city} {address[0].line1} {address[0].state} {address[0].zip}</address> <button onClick> </button>