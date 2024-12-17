import React from "react";
import './VillageManagment.css'

const VillageManagment = () => {
  return (
    <>
      <div>
        <main>
          <input
            type="button"
            defaultValue="Add New Village"
            id="addVillageBtn"
          />
          <div className="content">
            <h2>View Village List</h2>
            <input
              type="text"
              name
              id="searchVillagesIn"
              placeholder="Search villages..."
            />
            <div className="orderAndPagination">
              <div className="select-box">
                <label htmlFor="village-sort" className="label">
                  Sort by:
                </label>
                <select id="village-sort">
                  <option value="default">Default</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="pagination">
                <label className="label">Page: </label>
                <input type="button" name id="prev" defaultValue="Prev" />
                <input type="button" name id="next" defaultValue="Next" />
              </div>
            </div>
            <div id="villages"></div>
          </div>
          <div className="stylePopups addNewVillage" id="addNewVillageDiv">
            <div className="title">
              <h2>Add New Village</h2>
              <p data-close-button className="close-button">
                ×
              </p>
            </div>
            <div className="villageDetails">
              <label htmlFor="villageName">Village Name:</label>
              <input type="text" id="villageName" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="region">Region/District:</label>
              <input type="text" id="region" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="area">Land Area (sq km):</label>
              <input type="text" id="area" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="latitude">Latitude:</label>
              <input type="text" id="latitude" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="longitude">Longitude:</label>
              <input type="text" id="longitude" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="img">Upload Image:</label>
              <input type="file" id="img" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="tag">Categories/Tags:</label>
              <input type="text" id="tag" className="btns" />
            </div>
            <input
              type="button"
              defaultValue="Add Village"
              className="btns"
              id="addVillage"
            />
          </div>
          <div className="stylePopups" id="view-village-div">
            <div className="title">
              <h2>Village Details</h2>
              <p data-close-button className="close-button">
                ×
              </p>
            </div>
            <div id="content">
              <p>
                <span className="view-title">Village Name: </span>
                <span id="view-name">hello test</span>
              </p>
              <p>
                <span className="view-title">Region/District: </span>
                <span id="view-region">hello test</span>
              </p>
              <p>
                <span className="view-title">Land Area (sq km): </span>
                <span id="view-area">hello test</span>
              </p>
              <p>
                <span className="view-title">Latitude: </span>
                <span id="view-latitude">hello test</span>
              </p>
              <p>
                <span className="view-title">Longitude: </span>
                <span id="view-longitude">hello test</span>
              </p>
              <p>
                <span className="view-title">Tags: </span>
                <span id="view-tags">hello test</span>
              </p>
              <img src alt="Village Image" />
            </div>
          </div>
          <div className="stylePopups" id="update-village-div">
            <div className="title">
              <h2>Update Village</h2>
              <p data-close-button className="close-button">
                ×
              </p>
            </div>
            <div className="villageDetails">
              <label htmlFor="villageName">Village Name:</label>
              <input type="text" id="update-name" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="region">Region/District:</label>
              <input type="text" id="update-region" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="area">Land Area (sq km):</label>
              <input type="text" id="update-area" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="latitude">Latitude:</label>
              <input type="text" id="update-latitude" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="longitude">Longitude:</label>
              <input type="text" id="update-longitude" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="img">Upload Image:</label>
              <input type="file" id="update-img" className="btns" />
            </div>
            <input
              type="button"
              defaultValue="Update Village"
              className="btns"
              id="updateVillage"
            />
          </div>
          <div className="stylePopups" id="updateD-village-div">
            <div className="title">
              <h2>
                Add Demographic Data for <span id="demo-village-name" />
              </h2>
              <p data-close-button className="close-button">
                ×
              </p>
            </div>
            <div className="villageDetails">
              <label htmlFor="villageName">Population Size:</label>
              <input type="text" id="villagePopSize" className="btns" />
            </div>
            <div className="villageDetails">
              <label htmlFor="region">Age Distribution:</label>
              <input
                placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%"
                type="text"
                id="villageAgeDist"
                className="btns"
              />
            </div>
            <div className="villageDetails">
              <label htmlFor="area">Gender Ratios:</label>
              <input
                placeholder="e.g., Male: 51%, Female: 49%"
                type="text"
                id="villageGenderRatios"
                className="btns"
              />
            </div>
            <div className="villageDetails">
              <label htmlFor="latitude">Population Growth Rate:</label>
              <input type="text" id="villagePopGrowth" className="btns" />
            </div>
            <input
              type="button"
              defaultValue="Add Demographic Data"
              className="btns"
              id="updateDBtnVillage"
            />
          </div>
        </main>
        <div id="overlay" />
      </div>
    </>
  );
};

export default VillageManagment;
