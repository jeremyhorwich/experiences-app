import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExperienceBrowsing } from "./pages/ExperienceBrowsing";
import { ExperienceCreationPage } from "./pages/ExperienceCreationPage";
import { ExperienceInfo } from "./pages/ExperienceInfo";
import { LoginPage } from "./pages/LoginPage";
import { UserSignUpPage } from "./pages/UserSignUpPage";
import { UsersRatingPage } from "./pages/UsersRatingPage";

//TODO: Index
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/experiences" element={<ExperienceBrowsing/>}/>
                <Route path="/experienceInfo/" element={<ExperienceInfo/>}/>
                <Route path="/createExperience" element={<ExperienceCreationPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<UserSignUpPage/>}/>
                <Route path="/rateusers" element={<UsersRatingPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export { App }