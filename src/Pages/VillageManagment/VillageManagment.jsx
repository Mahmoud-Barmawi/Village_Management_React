import React, { useRef, useState } from "react";
// import "./VillageManagment.css";
import "../../styles/VillageManagment.css";
import MyButton from "../../Components/MyButton.jsx";
import MyTextInput from "../../Components/MyTextInput.jsx";
import VillageElement from "./villageElement.jsx";
import { useEffect } from "react";
import Popup from "./Popup.jsx";
import { request } from "graphql-request";
import { useNavigate } from "react-router-dom";

import * as gql from "../../graphql.js";

const VillageManagment = () => {
  const addNewVillage = [
    "Village Name",
    "Region/District",
    "Land Area (sq km)",
    "Latitude",
    "Longitude",
    "Upload Image",
    "Categories/Tags",
  ];
  const updateVillage = [
    "Village Name",
    "Region/District",
    "Land Area (sq km)",
    "Latitude",
    "Longitude",
    "Upload Image",
  ];
  const updateDemographicData = [
    "Population Size",
    "Age Distribution",
    "Gender Ratios",
    "Population Growth Rate",
  ];

  const [showPopup, setShowPopup] = useState([false, false, false, false]);
  const [villages, setVillages] = useState([]);
  const [villageView, setVillageView] = useState({ id: 2 });
  const [dataChanged, setDataChanged] = useState({});
  const [currentID, setCurrentID] = useState({});
  const [vName, setVName] = useState();

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();

  const [page, setPage] = useState(1);
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");
  const maxCountRef = useRef(0);
  const limit = 10;

  function nextPage() {
    const maxPage = Math.ceil(maxCountRef.current / limit);
    if (page != maxPage) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page != 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const userId = localStorage.getItem("userId") || null;

    async function fetchUserRole() {
      try {
        let response = await request(
          "http://localhost:3000/graphql",
          gql.userGQL(userId),
          null,
          { token: token }
        );
        if (response.User.role == "ADMIN") {
          setUserRole(true);
        } else {
          setUserRole(false);
        }
      } catch (error) {
        console.log("error::", error);

        setUserRole(null);
        navigate("/");
      }
    }
    fetchUserRole();
  }, []);

  function handleSelect(event){
    const value=event.target.value;
    if(value=='alphabetical'){
      setIsSort(true);
    }else{
      setIsSort(false);
    }
  }

  function handleSearch(event){
    const value=event.target.value;
    setSearch(value)
  }
  function closePopup(i) {
    const showArray = [...showPopup];
    showArray[i] = false;
    setShowPopup(showArray);
  }

  function openPopup(i) {
    const showArray = [...showPopup];
    showArray[i] = true;
    setShowPopup(showArray);
  }

  useEffect(() => {
    async function fetchVillages() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.villagesGQL(page, limit,isSort,search)
      );
      setVillages(response.villages.villages);
      maxCountRef.current = response.villages.count;
    }

    fetchVillages();
  }, [dataChanged, page,search,isSort]);

  function viewFn(id) {
    async function fetchVillageView() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.viewVillageGQL(id)
      );
      console.log(response.village);
      setVillageView(response.village);
      openPopup(1);
    }
    fetchVillageView();
  }

  function updateFn(id) {
    setCurrentID(id);
    openPopup(2);
  }

  function updateDFn(id) {
    async function fetchVillageName() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.villageNameGQL(id)
      );
      setCurrentID(id);
      setDataChanged(response);
      setVName(response.village.villageName);
    }

    fetchVillageName();
    openPopup(3);
  }
  function deleteFn(id) {
    async function fetchDeleteVillage() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.deleteVillageGQL(id)
      );
      setDataChanged(response);
    }
    fetchDeleteVillage();
  }

  function addVillage(data) {
    console.log(data);
    const file =data["Upload Image"];
    console.log("----",file);
    

    async function fetchAddVilage() {
      const formData = new FormData();

      formData.append('operations', JSON.stringify({
        query: gql.addVillageGQL(data),
        variables: {
          file: null,
        }
      }));

      formData.append('map', JSON.stringify({
        0: ['variables.file']
      }));

      formData.append('0', file, file.name);

      const response = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        body: formData
      });

      const output = await response.json();
      console.log(output);
      setDataChanged(output);

      // let response = await request(
      //   "http://localhost:3000/graphql",
      //   gql.addVillageGQL(data)
      // );
    }
    fetchAddVilage();
  }

  function updateVillageFn(data) {
    async function fetchUpdateVilage() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.updateVillageGQL(currentID, data)
      );
      setDataChanged(data);
    }
    fetchUpdateVilage();
  }

  function updateDVillageFn(data) {
    async function fetchUpdateVilage() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.updateDVillageGQL(currentID, data)
      );
      setDataChanged(data);
    }
    fetchUpdateVilage();
  }

  return (
    <>
      <main>
        {showPopup[0] && (
          <Popup
            type={"form"}
            title={"Add New Village"}
            formBtnFn={addVillage}
            fields={addNewVillage}
            btn={"Add Village"}
            closeFn={() => closePopup(0)}
          />
        )}
        {showPopup[1] && (
          <Popup
            type={"view"}
            title={"Village Details"}
            villageView={villageView}
            fields={addNewVillage}
            closeFn={() => closePopup(1)}
          />
        )}
        {showPopup[2] && (
          <Popup
            type={"form"}
            title={"Update Village"}
            formBtnFn={updateVillageFn}
            fields={updateVillage}
            btn={"Update Village"}
            closeFn={() => closePopup(2)}
          />
        )}
        {showPopup[3] && (
          <Popup
            type={"form"}
            title={"Add Demographic Data for " + vName}
            formBtnFn={updateDVillageFn}
            fields={updateDemographicData}
            btn={"Add Demographic Data"}
            closeFn={() => closePopup(3)}
          />
        )}

        {userRole && (
          <MyButton
            value={"Add New Village"}
            id={"addVillageBtn"}
            btnFn={() => openPopup(0)}
          />
        )}
        <div className="content">
          <h2>View Village List</h2>
          <MyTextInput
            onChange={handleSearch}
            type={"text"}
            id={"searchVillagesIn"}
            placeholder={"Search Villages..."}
          />
          <div className="orderAndPagination">
            <div className="select-box">
              <label className="label">Sort by:</label>

              <select id="village-sort" onChange={handleSelect}>
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
              </select>

            </div>

            <div className="pagination">
              <label className="label">Page:</label>
              <MyButton btnFn={prevPage} value={"Prev"} id={"prev"} />
              <MyButton btnFn={nextPage} value={"Next"} id={"next"} />
            </div>
          </div>

          <div id="villages">
            {/* <VillageElement villageName={'jalal'} regionDistrict={"abo mouse"} admin={false} /> */}
            {villages.length != 0 ? (
              villages.map((v) => {
                return (
                  <VillageElement
                    key={v.id}
                    villageName={v.villageName}
                    regionDistrict={v.regionDistrict}
                    admin={userRole}
                    id={v.id}
                    viewFn={viewFn}
                    updateFn={updateFn}
                    updateDFn={updateDFn}
                    deleteFn={deleteFn}
                  />
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default VillageManagment;
