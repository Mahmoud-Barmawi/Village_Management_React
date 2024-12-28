import React, { useState } from "react";
import './VillageManagment.css'
import MyButton from "../SharedComponents/MyButton";
import MyTextInput from "../SharedComponents/MyTextInput";
import VillageElement from "./villageElement";
import { useEffect } from "react";
import Popup from "./Popup";

const VillageManagment = () => {
  const addNewVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image","Categories/Tags"]
  const updateVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image"]
  const updateDemographicData=["Population Size","Age Distribution","Gender Ratios","Population Growth Rate"]

  const [showPopup,setShowPopup]=useState([false,false,false,false]);
  const [villages,setVillages] = useState([]);

  function closePopup(i){
    const showArray=[...showPopup];
    showArray[i]=false;
    setShowPopup(showArray);
  }

  function openPopup(i){
    const showArray=[...showPopup];
    showArray[i]=true;
    setShowPopup(showArray);
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
    openPopup(1);
  }
  function updateFn(id){
    openPopup(2);
  }
  function updateDFn(id){
    openPopup(3);
  }
  function deleteFn(id){
    //delete
  }

  return (
    <>
      <main>
        {showPopup[0] && <Popup type={"form"} title={"Add New Village"} fields={addNewVillage} btn={"Add Village"} closeFn={()=>closePopup(0)} />}      
        {showPopup[1] && <Popup type={"view"} title={"Village Details"} fields={addNewVillage} closeFn={()=>closePopup(1)} />}
        {showPopup[2] && <Popup type={"form"} title={"Update Village"} fields={updateVillage} btn={"Update Village"} closeFn={()=>closePopup(2)} />}
        {showPopup[3] && <Popup type={"form"} title={"Add Demographic Data for Beit Sahour"} fields={updateDemographicData} btn={"Add Demographic Data"} closeFn={()=>closePopup(3)} />}

        <MyButton value={"Add New Village"} id={'addVillageBtn'} btnFn={()=>openPopup(0)}/>
        <div className="content">
          <h2>View Village List</h2>
          <MyTextInput type={"text"} id={'searchVillagesIn'} placeholder={'Search Villages...'} />
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
