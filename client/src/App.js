
// components
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home"



// dependencies
import { useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import webFont from "webfontloader";


function App() {
  useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Driod Sans","Chilanka"]
      }
    })
  },[])
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>} />
      </Routes>
      <Footer/>
      </>
   
     
      
    
  );
}

export default App;
