import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import AutoInsurance from "./pages/forms/AutoInsurance";
import HomeInsurance from "./pages/forms/HomeInsurance";
import HealthInsurance from "./pages/forms/HealthInsurance";
import PetInsurance from "./pages/forms/PetInsurance";
import ProInsurance from "./pages/forms/ProInsurance";

import MentionsLegales from "./pages/legal/MentionsLegales";
import Confidentialite from "./pages/legal/Confidentialite";
import GoogleAnalytics from "./components/analytics/GoogleAnalytics";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="auto" element={<AutoInsurance />} />
            <Route path="habitation" element={<HomeInsurance />} />
            <Route path="sante" element={<HealthInsurance />} />
            <Route path="animaux" element={<PetInsurance />} />
            <Route path="rc-pro" element={<ProInsurance />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="confidentialite" element={<Confidentialite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
