import { useState, useRef, useEffect } from "react";
import { DateTime } from "luxon";
import { ReservedInExperienceDisplay } from "./ReservedInExperienceDisplay";
import { Message } from "../dataTypes/messages";
import { Experience } from "../dataTypes/experiences";
import { MessageBox } from "./MessageBox";
import "./ExperienceInfoDisplay.css"
import { findExperienceMessages } from "../api/findExperienceMessages";


type ExperienceInfoDisplayProps = {
    experience: Experience,
    currentUser: string,
    currentUserName: string
}

function ExperienceInfoDisplay(props: ExperienceInfoDisplayProps) {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const loading = useRef<Boolean>(true);
    
    useEffect(() => {
        async function fetchData() {
            try {
                //TODO: Build endpoint to get messages directly instead of searching for experience first
                const messages = await findExperienceMessages(props.experience.id, 1, 10)  //TODO: add pagination controls
                
                if (messages) {
                    setMessages(messages)
                }
            } catch (error){
                console.error("Error fetching data: ", error)
            } finally {
                loading.current = false;
            }
        }

        fetchData()
    },[])
    
    return (
        <div className="experience-container">
            <div className="top-info">
                <div className="activity">{props.experience.activity}</div>
                <div>
                    <ReservedInExperienceDisplay  owner={props.experience.ownerId} reserved={props.experience.peopleReserved}/>
                </div>
            </div>
            <div>
                {props.experience.image &&
                <div>
                    <img src={props.experience.image} />
                </div>}
                <div className="logistics">
                    <div className="logistics-item">
                        <span>
                            {props.experience.start.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
                            -
                            {props.experience.end.toLocaleString(DateTime.TIME_SIMPLE)}
                        </span>
                    </div>
                    <div className="logistics-item">
                        <span>{props.experience.location}</span>
                    </div>
                </div>
                <div className="description">
                    {props.experience.description}
                </div>
                <div>
                    {!loading.current && 
                    <MessageBox 
                        experienceId={props.experience.id}
                        messages={messages} 
                        currentUser={props.currentUser} 
                        currentUserName={props.currentUserName} 
                    />}
                </div>
            </div>
        </div>
    )
}

export { ExperienceInfoDisplay };