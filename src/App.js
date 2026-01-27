import {useState} from "react";
import {Routes, Route, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
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
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Calendar from "./scenes/calendar/calendar";
import PromotionList from "./Pages/Promotion/PromotionList";
import FormationList from "./Pages/Formation/FormationList";
import EnseignantList from "./Pages/Enseignant/EnseignantList";
import EtudiantList from "./Pages/Etudiant/EtudiantList";
import EtudiantDetail from "./Pages/Etudiant/EtudiantDetails";
import PromotionDetail from "./Pages/Promotion/PromotionDetails";
import FormationDetail from "./Pages/Formation/FormationDetails";
import EnseignantDetail from "./Pages/Enseignant/EnseignantDetails";

// Page transition wrapper component
import PageTransition from "./components/PageTransition";
import CreateEnseignantForm from "./Pages/Enseignant/CreateEnseignantForm";
import CreateFormationForm from "./Pages/Formation/CreateFormationForm";
import CreatePromotionForm from "./Pages/Promotion/CreatePromotionForm";
import CreateEtudiantForm from "./Pages/Etudiant/CreateEtudiantForm";
import EditEnseignantForm from "./Pages/Enseignant/EditEnseignantForm";
import EditFormationForm from "./Pages/Formation/EditFormationForm";
import EditPromotionForm from "./Pages/Promotion/EditPromotionForm";
import EditEtudiantForm from "./Pages/Etudiant/EditEtudiantForm";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const location = useLocation();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar isSidebar={isSidebar}/>
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar}/>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<PageTransition><Dashboard/></PageTransition>}/>

                                <Route
                                    path="/etudiants"
                                    element={
                                        <PageTransition>
                                            <EtudiantList title="ETUDIANTS" subtitle="Liste des étudiants :"/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/etudiant/:slug"
                                    element={
                                        <PageTransition>
                                            <EtudiantDetail/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/etudiant/add"
                                    element={
                                        <PageTransition>
                                            <CreateEtudiantForm/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/etudiant/edit/:slug"
                                    element={
                                        <PageTransition>
                                            <EditEtudiantForm/>
                                        </PageTransition>
                                    }
                                />

                                <Route
                                    path="/promotions"
                                    element={
                                        <PageTransition>
                                            <PromotionList title="PROMOTIONS" subtitle="Liste des promotions :"/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/promotion/:slug"
                                    element={
                                        <PageTransition>
                                            <PromotionDetail/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/promotion/add"
                                    element={
                                        <PageTransition>
                                            <CreatePromotionForm/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/promotion/edit/:slug"
                                    element={
                                        <PageTransition>
                                            <EditPromotionForm/>
                                        </PageTransition>
                                    }
                                />

                                <Route
                                    path="/formations"
                                    element={
                                        <PageTransition>
                                            <FormationList title="FORMATIONS" subtitle="Liste des formations :"/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/formation/:slug"
                                    element={
                                        <PageTransition>
                                            <FormationDetail/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/formation/add"
                                    element={
                                        <PageTransition>
                                            <CreateFormationForm/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/formation/edit/:slug"
                                    element={
                                        <PageTransition>
                                            <EditFormationForm/>
                                        </PageTransition>
                                    }
                                />

                                <Route
                                    path="/enseignants"
                                    element={
                                        <PageTransition>
                                            <EnseignantList title="ENSEIGNANTS" subtitle="Liste des enseignants :"/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/enseignant/:slug"
                                    element={
                                        <PageTransition>
                                            <EnseignantDetail/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/enseignant/add"
                                    element={
                                        <PageTransition>
                                            <CreateEnseignantForm/>
                                        </PageTransition>
                                    }
                                />
                                <Route
                                    path="/enseignant/edit/:slug"
                                    element={
                                        <PageTransition>
                                            <EditEnseignantForm/>
                                        </PageTransition>
                                    }
                                />


                                <Route path="/team" element={<PageTransition><Team/></PageTransition>}/>
                                <Route path="/contacts" element={<PageTransition><Contacts/></PageTransition>}/>
                                <Route path="/invoices" element={<PageTransition><Invoices/></PageTransition>}/>
                                <Route path="/form" element={<PageTransition><Form/></PageTransition>}/>
                                <Route path="/bar" element={<PageTransition><Bar/></PageTransition>}/>
                                <Route path="/pie" element={<PageTransition><Pie/></PageTransition>}/>
                                <Route path="/line" element={<PageTransition><Line/></PageTransition>}/>
                                <Route path="/faq" element={<PageTransition><FAQ/></PageTransition>}/>
                                <Route path="/calendar" element={<PageTransition><Calendar/></PageTransition>}/>
                                <Route path="/geography" element={<PageTransition><Geography/></PageTransition>}/>
                            </Routes>
                        </AnimatePresence>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;