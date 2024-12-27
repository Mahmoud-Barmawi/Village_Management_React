import React from "react";
import './VillageManagment.css'
import Popup from "./Popup.jsx";
import { useState } from "react";

const VillageManagment = () => {
  const addNewVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image","Categories/Tags"]
  const updateVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image"]
  const updateDemographicData=["Population Size","Age Distribution","Gender Ratios","Population Growth Rate"]
  let [showPopup,setShowPopup]=useState(true);
  function ClosePopup(){
    setShowPopup(false);
  }
  function OpenPopup(){
    setShowPopup(true);
  }
  return (
    
    <main>
      Village Managment
     {showPopup&& <Popup type={"form"} title={"Add New Village"} fields={addNewVillage} btn={"Add Village"} closeFn={ClosePopup} />}      
     {/* {showPopup&& <Popup type={"view"} title={"Village Details"} fields={addNewVillage}  closeFn={ClosePopup} />}       */}
     {/* {showPopup&& <Popup type={"form"} title={"Add New Village"} fields={addNewVillage} btn={"Add Village"} closeFn={ClosePopup} />}       */}
     {/* {showPopup&& <Popup type={"form"} title={"Add Demographic Data for Beit Sahour"} fields={updateDemographicData} btn={"Add Demographic Data"} closeFn={ClosePopup} />}       */}

    </main>
  );
};

export default VillageManagment;
