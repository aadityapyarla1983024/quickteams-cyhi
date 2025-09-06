import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoutFirstPage from "./pages/logoutFirstPage";
import InitialProfileForm from "./pages/initialprofileform";
import TeamSelectPage from "./pages/teamselectpage";
import HomePage from "./pages/homepage";
import TeamCreateForm from "./pages/createteamformpage";
import TeamRequestsPage from "./pages/teamrequestslist";
import FCAppBar from "./components/FCAppBar";
import MyTeamsPage from "./pages/teamsjoineduser";
import TeamDetailsPage from "./pages/teamdetailspage";
import { AuthProvider } from "./contexts/AuthContext";
import UserProfileView from "./pages/profileviewuserpage";
import RequireAuth from "./contexts/authrequired";
import TeamEditPage from "./pages/editteampage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FCAppBar />
        <Routes>
          {/* Public route */}
          <Route path="/" element={<LogoutFirstPage />} />

          {/* Protected routes */}
          <Route
            path="/createnewprofile"
            element={
              <RequireAuth>
                <InitialProfileForm />
              </RequireAuth>
            }
          />
          <Route
            path="/homepage"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <UserProfileView />
              </RequireAuth>
            }
          />
          <Route
            path="/floatnewteam"
            element={
              <RequireAuth>
                <TeamCreateForm />
              </RequireAuth>
            }
          />
          <Route
            path="/selectteams"
            element={
              <RequireAuth>
                <TeamSelectPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teamrequests"
            element={
              <RequireAuth>
                <TeamRequestsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teamsjoined"
            element={
              <RequireAuth>
                <MyTeamsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teamdetails/:id"
            element={
              <RequireAuth>
                <TeamDetailsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/editteam/:id"
            element={
              <RequireAuth>
                <TeamEditPage />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
