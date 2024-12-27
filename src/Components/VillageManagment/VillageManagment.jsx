import React, { useState } from "react";
import './VillageManagment.css'
import MyButton from "../SharedComponents/MyButton";
import MyTextInput from "../SharedComponents/MyTextInput";
import VillageElement from "./villageElement";
import { useEffect } from "react";

const VillageManagment = () => {
  const addNewVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image","Categories/Tags"]
  const updateVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image"]
  const updateDemographicData=["Population Size","Age Distribution","Gender Ratios","Population Growth Rate"]

  const [showPopup,setShowPopup]=useState(true);
  const [villages,setVillages] = useState([]);

  function ClosePopup(){
    setShowPopup(false);
  }
  function OpenPopup(){
    setShowPopup(true);
  }
  useEffect(()=>{
    //fetch data
    setVillages([
      {id:1,villageName:'aboJalal',regionDistrict:'abomouse'},
      {id:2,villageName:'abo',regionDistrict:'two'},
      {id:3,villageName:'test',regionDistrict:'testo'}
    ]);
  },[])

  function viewFn(id){
    console.log(id);
  }

  function updateFn(id){

  }

  function updateDFn(id){

  }

  function deleteFn(id){

  }

  return (
    <>
      <main>
        {showPopup&& <Popup type={"form"} title={"Add New Village"} fields={addNewVillage} btn={"Add Village"} closeFn={ClosePopup} />}      
        {showPopup && <Popup type={"view"} title={"Village Details"} fields={addNewVillage} closeFn={ClosePopup} />}
        {showPopup && <Popup type={"form"} title={"Update Village"} fields={updateVillage} btn={"Update Village"} closeFn={ClosePopup} />}
        {showPopup && <Popup type={"form"} title={"Add Demographic Data for Beit Sahour"} fields={updateDemographicData} btn={"Add Demographic Data"} closeFn={ClosePopup} />}

        <MyButton value={"Add New Village"} id={'addVillageBtn'} />
        <div className="content">
          <h2>View Village List</h2>
          <MyTextInput id={'searchVillagesIn'} placeholder={'Search Villages...'} />
          <div className="orderAndPagination">

            <div className="select-box">
              <label className="label">Sort by:</label>
              <select id="village-sort">
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

            <div className="pagination">
              <label className="label">Page:</label>
              <MyButton value={"Prev"} id={'prev'} />
              <MyButton value={"Next"} id={'next'} />
            </div>
          </div>

          <div id="villages">
            {/* <VillageElement villageName={'jalal'} regionDistrict={"abo mouse"} admin={false} /> */}
            {
              villages.map((v)=>{
                return(
                  <VillageElement key={v.id} villageName={v.villageName} regionDistrict={v.regionDistrict} admin={true}
                  id={v.id} viewFn={viewFn} updateFn={updateFn} updateDFn={updateDFn} deleteFn={deleteFn} />
                )
              })
            }
          </div>

        </div>
      </main>
    </>
  );
};

export default VillageManagment;
