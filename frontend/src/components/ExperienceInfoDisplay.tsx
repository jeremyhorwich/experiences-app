import { useState, useRef, useEffect } from "react";
import { DateTime } from "luxon";
import { ReservedInExperienceDisplay } from "./ReservedInExperienceDisplay";
import { Message } from "../dataTypes/messages";
import { Experience } from "../dataTypes/experiences";
import samples from "../assets/sampleMessages.json";
import { MessageBox } from "./MessageBox";
import "./ExperienceInfoDisplay.css"


type ExperienceInfoDisplayProps = {
    experience: Experience,
    currentUser: string,
    currentUserName: string
}


function ExperienceInfoDisplay(props: ExperienceInfoDisplayProps) {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const loading = useRef<Boolean>(true);
    
    //Placeholder for retrieving messages from API
    useEffect(() => {
        const sampleMessages = samples["messages"].map(message => ({
          ...message,
          timeSent: DateTime.fromISO(message.timeSent)
        }))
        setMessages(sampleMessages);
        loading.current = false;
    },[])
    //End placeholder
    
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
                    <MessageBox messages={messages} currentUser={props.currentUser} currentUserName={props.currentUserName} />}
                </div>
            </div>
        </div>
    )
}

export { ExperienceInfoDisplay };