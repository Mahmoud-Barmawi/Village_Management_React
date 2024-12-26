import React from 'react';
import  './Overview.css'
import PieChart from './PieChart';

const Overview = () => {
    return (
        <>
          <main>
          <h1>Overview</h1> 
          <PieChart title={"test1"} colors={["#2F71A3","#A74C65"]} 
          xValues={["Male", "Female"]} yValues={[60,40]} id={"pie-chart-1"} />
          </main> 
        </>
    );
}

export default Overview;
