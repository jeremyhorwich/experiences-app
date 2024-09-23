import { ExperienceCreationForm } from "../components/ExperienceCreationForm";
import { Toolbar } from "../components/Toolbar";
import "./ExperienceCreationPage.css"


function ExperienceCreationPage() {
    //I will handle user context when I create the user login/signup page

    return (
        <div>
            <Toolbar/>
            <div className="form">
                <ExperienceCreationForm />
            </div>
        </div>
    )
}

export { ExperienceCreationPage };