import Dashboard from "./Components/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Overview from "./Pages/Overview/Overview.jsx";
import Gallery from "./Pages/Gallery/Gallery.jsx";
import Chat from "./Pages/Chat/Chat.jsx";
import VillageManagment from "./Pages/VillageManagment/VillageManagment.jsx";
import Signup from "./Pages/Signup/Signup.jsx";
import Signin from "./Pages/Signin/Signin.jsx";
import { useEffect, useState } from "react";
function App() {
  const [dashShow,setDashShow]=useState(false);

  useEffect(()=>{
    if(localStorage.getItem("Token")){
      setDashShow(true);
    }else{
      setDashShow(false);
    }
  },[])

  return (
    <>
      <BrowserRouter>
        {dashShow && <Dashboard setDashShow={setDashShow} />}
        <Routes>
          <Route path="/overView" element={<Overview />} />
          <Route path="/villageManagment" element={<VillageManagment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<Signin setDashShow={setDashShow} />} />
          <Route path="/signUp" element={<Signup setDashShow={setDashShow} />} />
        </Routes>
      </BrowserRouter>
      {/* <Chat/> */}
      {/* <Gallery/> */}
      {/* <Signin/> */}
      {/* <Signup/> */}
    </>
  );
}

export default App;
