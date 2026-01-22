import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import PromotionList from "./Pages/Promotion/PromotionList";
import FormationList from "./Pages/Formation/FormationList";
import EnseignantList from "./Pages/Enseignant/EnseignantList";
import EtudiantList from "./Pages/Etudiant/EtudiantList";
import EtudiantDetail from "./Pages/Etudiant/EtudiantDetails";
import PromotionDetail from "./Pages/Promotion/PromotionDetails";
import FormationDetail from "./Pages/Formation/FormationDetails";
import EnseignantDetail from "./Pages/Enseignant/EnseignantDetails";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/etudiants" element={<EtudiantList title="ETUDIANTS" subtitle="Liste des étudiants :" />} />

              <Route path="/promotions" element={<PromotionList title="PROMOTIONS" subtitle="Liste des promotions :" />} />

              <Route path="/formations" element={<FormationList title="FORMATIONS" subtitle="Liste des formations :" />} />

              <Route path="/enseignants" element={<EnseignantList title="ENSEIGNANTS" subtitle="Liste des enseignants :" />} />


              <Route path="/etudiants" element={<EtudiantList title="ETUDIANTS" subtitle="Liste des étudiants :" />} />
              <Route path="/etudiants/:slug" element={<EtudiantDetail />} />

              <Route path="/promotions" element={<PromotionList title="PROMOTIONS" subtitle="Liste des promotions :" />} />
              <Route path="/promotions/:slug" element={<PromotionDetail />} />

              <Route path="/formations" element={<FormationList title="FORMATIONS" subtitle="Liste des formations :" />} />
              <Route path="/formations/:slug" element={<FormationDetail />} />

              <Route path="/enseignants" element={<EnseignantList title="ENSEIGNANTS" subtitle="Liste des enseignants :" />} />
              <Route path="/enseignants/:slug" element={<EnseignantDetail />} />






              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
