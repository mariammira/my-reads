//import "./comp1.css";
//import { useState } from "react";
import Comp1 from "./comp1";
import Search from "./search";
import { Route, Routes } from "react-router-dom";

function App() {
  //const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    
    <Routes>
        <Route exact path="/" element={<Comp1/>} />
        <Route path="/search" element={<Search/>}/>
      
      </Routes>
   
    );
}

export default App;