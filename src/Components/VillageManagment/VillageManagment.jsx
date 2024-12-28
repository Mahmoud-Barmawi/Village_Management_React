import React, { useState } from "react";
import './VillageManagment.css'
import MyButton from "../SharedComponents/MyButton";
import MyTextInput from "../SharedComponents/MyTextInput";
import VillageElement from "./villageElement";
import { useEffect } from "react";
import Popup from "./Popup";
import { gql, request } from 'graphql-request'

const VillageManagment = () => {
  const addNewVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image","Categories/Tags"]
  const updateVillage=["Village Name","Region/District","Land Area (sq km)","Latitude","Longitude","Upload Image"]
  const updateDemographicData=["Population Size","Age Distribution","Gender Ratios","Population Growth Rate"]

  const [showPopup,setShowPopup]=useState([false,false,false,false]);
  const [villages,setVillages] = useState([]);
  const [villageView, setVillageView] = useState({ id: 2 });
  const [dataChanged,setDataChanged] = useState({});

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

  useEffect(() => {
    //fetch data
    const document = gql`
    query ExampleQuery {
      villages {
        id,
        villageName,
        regionDistrict,
      }
    }`

    async function fetchVillages(){
      let response=await request('http://localhost:3000/graphql', document)
      setVillages(response.villages);
    }

    fetchVillages();
  },[dataChanged])

  function viewFn(id) {
    const document = gql`
    query ExampleQuery {
      village(id: "${id}") {
        id
        villageName
        regionDistrict
        landArea
        latitude
        longitude
        image
        populationSize
        populationGrowthRate
        ageDistribution
        genderRatios
      }
    }
  `;

    async function fetchVillageView() {
      let response = await request('http://localhost:3000/graphql', document);
      console.log(response.village);//log correclty
      setVillageView(response.village);
      openPopup(1);
    }
    fetchVillageView();

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


  function addVillage(data) {
    setDataChanged(data);
    const map = {
      "Village Name": "villageName",
      "Region/District": "regionDistrict",
      "Land Area (sq km)": "landArea",
      "Latitude": "latitude",
      "Longitude": "longitude",
      "Upload Image": "image",
      "Categories/Tags": "categories",
      "Population Size": "populationSize",
      "Age Distribution": "ageDistribution",
      "Gender Ratios": "genderRatios",
      "Population Growth Rate": "populationGrowthRate"
    };

    const document = gql`
    mutation ExampleQuery{
      addVillage(
        villageName: "${data["Village Name"]}",
        regionDistrict:"${data["Region/District"]}",
        landArea:${data["Land Area (sq km)"]},
        latitude:${data["Latitude"]},
        longitude:${data["Longitude"]},
        tags:["${data["Categories/Tags"]}"],
        image:"hello.png"
    ) {
      id
      }
  }
  `;
    async function fetchAddVilage() {
      try {
        let response = await request('http://localhost:3000/graphql', document);
        console.log(response);
      }catch(error){
        console.log(error);
        
      }
    }
    fetchAddVilage();
  }

  return (
    <>
      <main>
        {showPopup[0] && <Popup type={"form"} title={"Add New Village"} formBtnFn={addVillage} fields={addNewVillage} btn={"Add Village"} closeFn={()=>closePopup(0)} />}      
        {showPopup[1] && <Popup type={"view"} title={"Village Details"} villageView={villageView} fields={addNewVillage} closeFn={()=>closePopup(1)} />}
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
              ((villages.length!=0)?villages.map((v)=>{
                return(
                  <VillageElement key={v.id} villageName={v.villageName} regionDistrict={v.regionDistrict} admin={true}
                  id={v.id} viewFn={viewFn} updateFn={updateFn} updateDFn={updateDFn} deleteFn={deleteFn} />
                )
              }):<div></div>)
            }
          </div>

        </div>
      </main>
    </>
  );
};

export default VillageManagment;
