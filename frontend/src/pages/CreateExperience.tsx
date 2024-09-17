import { ExperienceCreationForm } from "../components/ExperienceCreationForm";
import { Toolbar } from "../components/Toolbar";
import "../styles/ExperienceCreationFormPageStyles.css"


function CreateExperience() {
    //I will handle user context when I create the user login/signup page

    return (
        <div>
            <Toolbar/>
            <div className="form">
                <ExperienceCreationForm id={1}/>
            </div>
        </div>
    )
}

export { CreateExperience };