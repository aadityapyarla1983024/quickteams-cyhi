import { Route, Routes } from "react-router-dom";
import LogoutFirstPage from "./pages/logoutFirstPage";
import { initializeApp } from "firebase/app";
import InitialProfileForm from "./pages/initialprofileform";
import TeamSelectPage from "./pages/teamselectpage";
import HomePage from "./pages/homepage";
import TeamCreateForm from "./pages/createteamformpage";
import TeamRequestsPage from "./pages/teamrequestslist";
import MyTeamsPage from "./pages/teamsjoineduser";
import TeamDetailsPage from "./pages/teamdetailspage";

const firebaseConfig = {
  apiKey: "AIzaSyB28KwHOCgWedsVJesIdsH_Mgz2B9b1hgA",
  authDomain: "quickteams-cyhi.firebaseapp.com",
  projectId: "quickteams-cyhi",
  storageBucket: "quickteams-cyhi.firebasestorage.app",
  messagingSenderId: "540112608792",
  appId: "1:540112608792:web:7fb272631ebc951a96ed6d",
};

const app = initializeApp(firebaseConfig);
export default function App(props) {
  return (
    <Routes>
      <Route path="/" element={<LogoutFirstPage />} />
      <Route path="/createnewprofile" element={<InitialProfileForm />} />
      <Route path="/selectteams" element={<TeamSelectPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/floatnewteam" element={<TeamCreateForm />} />
      <Route path="/teamrequests" element={<TeamRequestsPage />} />
      <Route path="/teamsjoined" element={<MyTeamsPage />} />
      <Route path="/teamdetails" element={<TeamDetailsPage />} />
    </Routes>
  );
}
