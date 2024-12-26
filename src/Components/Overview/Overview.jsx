import React from 'react';
import  './Overview.css'
import InfoCard from './InfoCard.jsx';

const Overview = () => {
    return (
        < >
          <main>
          <h1>Overview</h1> 
          <div className="grid-div">
          <InfoCard content={'Total Number of Villages 8'} number={'info-1'} />
          <InfoCard content={'Total Number of Urban Areas 3'} number={'info-2'} />
          <InfoCard content={'Total Population Size 660000'} number={'info-3'} />
          <InfoCard content={'Average Land Area 11.88'} number={'info-4'} />
          </div>
          </main> 
        </>
    );
}

export default Overview;
