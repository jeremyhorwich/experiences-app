import { ExperienceInfoDisplay } from "../components/ExperienceInfoDisplay";
import { Toolbar } from "../components/Toolbar";
import { Experience } from '../dataTypes/experiences'
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function ExperienceInfo(props: {experience: Experience}) {
    const userContext = useContext(UserContext);
    const currentUserId = userContext ? userContext.userId : "";
    const currentUsername = userContext ? userContext.username : "";

    return (
        <div>
            <Toolbar />
            <ExperienceInfoDisplay 
                experience={props.experience} 
                currentUser={currentUserId} 
                currentUserName={currentUsername}
            />
        </div>
    )
}

export { ExperienceInfo };