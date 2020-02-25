import React from "react";

// css
import "./App.css";

// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <div>
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
