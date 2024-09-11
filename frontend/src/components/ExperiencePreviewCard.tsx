import { Experience } from "../dataTypes/experiences";

function ExperiencePreviewCard(props: Experience) {
    return (
        <div className="experiencePreviewCard">
            <span>{props.activity}</span>
            <span>{props.schedule[0].toString()}</span>
            <span>{props.location}</span>
            <span>{props.peopleNeeded}/{props.peopleReserved} people reserved</span>
            {props.image && <img src={props.image} alt={props.activity} style={{width: "175px", height: "auto"}}/>}
        </div>
    )
}

export { ExperiencePreviewCard };