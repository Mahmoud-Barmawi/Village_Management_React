import React from 'react';
import  './Overview.css'
import PieChart from './PieChart';
import InfoCard from './InfoCard.jsx';
import Map from './Map.jsx';
import BarChart from './BarChart.jsx';

const Overview = () => {
    return (
        <>
          <main>
          <h1>Overview</h1> 
        <div className="grid-div">
          <Map/>
          <InfoCard content={'Total Number of Villages '} value={8} id={'info-1'} />
          <InfoCard content={'Total Number of Urban Areas '} value={3} id={'info-2'} />
          <InfoCard content={'Total Population Size '} value={11.5} id={'info-3'} />
          <InfoCard content={'Average Land Area '} value={650} id={'info-4'} />

          <PieChart title={"test1"} colors={["#2F71A3", "#A74C65"]}
            xValues={["Male", "Female"]} yValues={[60, 40]} id={"pie-chart-1"} />
          <PieChart title={"test1"} colors={[
            "#A74C65",
            "#2F71A3",
            "#A58C4D",
            "#3C8489",
            "#684EAF"]}
            xValues={["0-18", "19-35", "36-50", "51-65", "65+"]} yValues={[55, 49, 44, 24, 15]} id={"pie-chart-2"} />
            <BarChart/>
        </div>
      </main>
    </>
  );
}

export default Overview;
