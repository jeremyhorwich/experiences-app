import { ExperienceInfoDisplay } from "../components/ExperienceInfoDisplay";
import { Toolbar } from "../components/Toolbar";
import { Experience } from '../dataTypes/experiences'
import samples from "../assets/sampleExperiences.json"
import { DateTime } from 'luxon'

//Placeholder: will replace with context/routing
const experienceRaw = samples["experiences"][0]
const experience: Experience = {
  ...experienceRaw,
  start: DateTime.fromISO(experienceRaw.start),
  end: DateTime.fromISO(experienceRaw.end)
}

function ExperienceInfo() {
    return (
        <div>
            <Toolbar />
            <ExperienceInfoDisplay experience={experience} currentUser={"0"} currentUserName="John User"/>
        </div>
    )
}

export { ExperienceInfo };