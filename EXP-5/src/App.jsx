import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Analytics from "./pages/analytics";
import Reports from "./pages/Reports";

function App() {
  const { theme } = useContext(AppContext);

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;