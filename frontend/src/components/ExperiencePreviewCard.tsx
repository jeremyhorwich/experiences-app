import { Experience } from "../dataTypes/experiences";
import "../styles/ExperienceBrowsingStyles.css"

function ExperiencePreviewCard(props: Experience) {
    return (
        <div className="experiencePreviewCard">
            <div className="experienceDetails">
                <div>{props.activity}</div>
                <div>{formatDate(props.schedule[0])}</div>
            </div>
            <div className="experienceDetails">
                <div>{props.location}</div>
                <div>{props.peopleReserved}/{props.peopleNeeded} people reserved</div>
            </div>
            {props.image && <img src={props.image} alt={props.activity} className="previewImage"/>}
        </div>
    )
}

function formatDate(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const amPM = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedDate = `${day} ${month} ${dayOfMonth}, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${amPM}`;

    return formattedDate;
}

export { ExperiencePreviewCard };