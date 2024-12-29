import { Experience } from "../dataTypes/experiences";
import { DateTime } from "luxon";
import "./ExperiencePreviewCard.css"


function ExperiencePreviewCard(props: Experience) {
    function onClick() {
        //TODO: Routing to experience info page
    }

    return (
        <div className="experience-preview-card" onClick={onClick}>
            <div className="experience-details">
                <div>{props.activity}</div>
                <div>{props.start.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</div>
            </div>
            <div className="experience-details">
                <div>at {props.location}</div>
                <div>{props.peopleReserved.length}/{props.peopleNeeded} people reserved</div>
            </div>
            {props.image && <img src={props.image} alt={props.activity} className="preview-image"/>}
        </div>
    )
}

export { ExperiencePreviewCard };