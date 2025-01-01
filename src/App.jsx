import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overview from "./Components/Overview/Overview.jsx";
import Gallery from "./Components/Gallery/Gallery.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import VillageManagment from "./Components/VillageManagment/VillageManagment.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Signin from "./Components/Signin/Signin.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Dashboard />
        {/* <Routes>
          <Route path="/overView" element={<Overview />} />
          <Route path="/villageManagment" element={<VillageManagment />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<Signin />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes> */}
      </BrowserRouter>
      <Chat/>
      {/* <Gallery/> */}
      {/* <Signin/> */}
      {/* <Signup/> */}
    </>
  );
}

export default App;
