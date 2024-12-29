import { ExperienceCreationForm } from "../components/ExperienceCreationForm";
import { Toolbar } from "../components/Toolbar";
import "./ExperienceCreationPage.css"


function ExperienceCreationPage() {
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