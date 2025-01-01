import React, { useState } from "react";
import "./Gallery.css";
import MyButton from "../SharedComponents/MyButton.jsx";
import Popup from "../VillageManagment/Popup.jsx";
import request from "graphql-request";
import * as gql from "../VillageManagment/graphql.js"

const Gallery = () => {
  const [showPopupNewImg, setShowPopupNewImg] = useState(false);
  const addNewVillageImage = ["Upload Image", "Description about Village"];

  function closePopup() {
    setShowPopupNewImg(false);
  }
  function openPopup() {
    setShowPopupNewImg(true);
  }
  function addNewVillageImg(data){
    console.log(data["Description about Village"])
    console.log(data["Upload Image"])
    console.log("-----------");
    
    // async function fetchUploadImage() {
    //   let response = await request(
    //     "http://localhost:3000/graphql/",
    //     const test=gql.uploadImage(data["Description about Village"])

    //     test({variables:{data["Upload Image"]}});
    //   );
    //   console.log(response);
    // }
    // fetchUploadImage();
  }
  return (
    <>
      <main>
        <MyButton
          value={"Add New Image"}
          id={"addImageBtn"}
          btnFn={() => openPopup()}
        />

        {showPopupNewImg && (
          <Popup
            type={"form"}
            title={"Add New Village Image"}
            formBtnFn={addNewVillageImg}
            fields={addNewVillageImage}
            btn={"Add Village Image"}
            closeFn={() => closePopup()}
          />
        )}

        <div className="gallery">

        {/* here i will put map */}
          <div className="gallery-item">
            <div className="content">
              <img src="https://via.placeholder.com/150" alt="Village Image" />
              <p>Description of the village image.</p>
            </div>
          </div>
        {/*  */}
        </div>
      </main>
    </>
  );
};

export default Gallery;
