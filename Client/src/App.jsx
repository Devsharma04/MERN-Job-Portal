import "./App.css";
import AllPages from "./Components/AllPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainPage from "./Pages/mainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" autoClose={5000} theme="light" />
        <AllPages />
        {/* <MainPage /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
