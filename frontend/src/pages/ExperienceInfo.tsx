import { ExperienceInfoDisplay } from "../components/ExperienceInfoDisplay";
import { Toolbar } from "../components/Toolbar";
import { useContext } from "react";
import { Context } from "../context/context";

function ExperienceInfo() {
    const context = useContext(Context);
    const currentUserId = context ? context.userId : "";
    const currentUsername = context ? context.username : "";
    const experience = context?.detailExperience

    return (
        <div>
            <Toolbar />
            {experience ? 
                <ExperienceInfoDisplay 
                    experience={experience} 
                    currentUser={currentUserId} 
                    currentUserName={currentUsername}
                /> : 
            <div> No experience found... </div>}
        </div>
    )
}

export { ExperienceInfo };