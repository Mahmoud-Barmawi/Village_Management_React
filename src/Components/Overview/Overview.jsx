import React, { useEffect, useState } from 'react';
import  './Overview.css'
import PieChart from './PieChart';
import InfoCard from './InfoCard.jsx';
import Map from './Map.jsx';
import BarChart from './BarChart.jsx';
import { request } from "graphql-request";
import * as gql from "../VillageManagment/graphql.js";
import {useNavigate } from 'react-router-dom'

const Overview = () => {
  const navigate=useNavigate();
  const [stat,setStat]=useState(null);

  useEffect(()=>{
    const token=localStorage.getItem("Token");
    const userId=localStorage.getItem("userId") || null
    
    async function fetchUserRole() {
      try {
        let response = await request(
          "http://localhost:3000/graphql",
          gql.userGQL(userId),
          null,
          { token: token }
        );

      }catch(error){
        console.log("error::",error);
        
        navigate('/');
      }
    }

    async function fetchStat() {
      try {
        let response = await request(
          "http://localhost:3000/graphql",
          gql.getStatGQL(),
          null,
          { token: token }
        );

        console.log(response);
        setStat(response.getStatistics);

      }catch(error){
        console.log("error::",error);
        
        navigate('/');
      }
    }

    fetchUserRole();
    fetchStat();
  },[]);

    return (
        <>
          <main>
          <h1>Overview</h1> 
        <div className="grid-div">
          <Map/>
          <InfoCard content={'Total Number of Villages '} value={(stat)?(stat.totalNumVillages):"--"} id={'info-1'} />
          <InfoCard content={'Total Number of Urban Areas '} value={(stat)?(stat.totalNumUrban):"--"} id={'info-2'} />
          <InfoCard content={'Total Population Size '} value={(stat)?stat.totalPopSize:"--"} id={'info-3'} />
          <InfoCard content={'Average Land Area '} value={(stat)?stat.avgLandArea:"--"} id={'info-4'} />

          <PieChart title={"test1"} colors={["#2F71A3", "#A74C65"]}
            xValues={["Male", "Female"]} yValues={(stat)?stat.genderArray:[]} id={"pie-chart-1"} />
          <PieChart title={"test1"} colors={[
            "#A74C65",
            "#2F71A3",
            "#A58C4D",
            "#3C8489",
            "#684EAF"]}
            xValues={["0-18", "19-35", "36-50", "51-65", "65+"]} yValues={(stat)?stat.AgesArray:[]} id={"pie-chart-2"} />
            <BarChart data={(stat)?stat.popArray:[]}/>
        </div>
      </main>
    </>
  );
}

export default Overview;
