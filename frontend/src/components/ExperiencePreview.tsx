import { Experience } from "../dataTypes/experiences";
import { ExperiencePreviewCard } from "./ExperiencePreviewCard";

type ExperiencePreviewProps = {
    experiences: Array<Experience>
}

function ExperiencePreview(props: ExperiencePreviewProps){
    return (
        <>
            {props.experiences.length === 0 ? (
                <span>Sorry, no experiences found. Check back later!</span>
            ) : (
                props.experiences.map((experience: Experience) => <ExperiencePreviewCard {...experience} />)
            )}
        </>
    )
}

export { ExperiencePreview };