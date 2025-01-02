import React, { useEffect, useState } from "react";
import "./Gallery.css";
import MyButton from "../SharedComponents/MyButton.jsx";
import Popup from "../VillageManagment/Popup.jsx";
import * as gql from "../VillageManagment/graphql.js"
import request from "graphql-request";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [showPopupNewImg, setShowPopupNewImg] = useState(false);
  const addNewVillageImage = ["Upload Image", "Description about Village"];
  const [images,setImages]=useState([]);
  const [addImageFlag,setAddImageFlag]=useState();

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    async function fetchImages() {
      let response = await request(
        "http://localhost:3000/graphql",
        gql.getImages()
      );
      console.log(response.Images);
      setImages(response.Images);
    }

    fetchImages();
  }, [addImageFlag])

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


  function closePopup() {
    setShowPopupNewImg(false);
  }
  function openPopup() {
    setShowPopupNewImg(true);
  }

  function addNewVillageImg(data) {
    const file = data["Upload Image"];
    const desc = data["Description about Village"];

    async function fetchUploadImage() {
      const formData = new FormData();

      formData.append('operations', JSON.stringify({
        query: gql.uploadImage(desc),
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

      const data = await response.json();
      console.log(data);
      setAddImageFlag(data);
    }
    fetchUploadImage();
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

          {images && images.map((img,index)=>{
            return(
            <div key={index} className="gallery-item">
              <div className="content">
                <img src={img.url} alt="Village Image" />
                <p>{img.desc}</p>
              </div>
            </div>
            )
          })}

        </div>
      </main>
    </>
  );
};

export default Gallery;
