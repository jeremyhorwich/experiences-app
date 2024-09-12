import { Experience } from "../dataTypes/experiences";
import { ExperiencePreviewCard } from "./ExperiencePreviewCard";

type ExperiencePreviewProps = {
    experiences: Array<Experience>
}

function ExperiencePreview(props: ExperiencePreviewProps){
    return (
        <div>
            {props.experiences.length === 0 ? (
                <span>Sorry, no experiences found. Check back later!</span>
            ) : (
                props.experiences.map((experience: Experience) => 
                <ExperiencePreviewCard key={experience.activity + experience.schedule[0].toString()}{...experience} />)
            )}
        </div>
    )
}

export { ExperiencePreview };