import { Toolbar } from "../components/Toolbar";
import { ExperiencePreview } from "../components/ExperiencePreview";
import { PaginationControl } from "../components/PaginationControls";
import img from "../assets/perry-merrity-ii-IEuHjlWmJo0-unsplash.jpg";


const sampleOwner = {
    name: "John Owner",
    age: 35,
    gender: "male" as const,
    communicationPreference: "text" as const,
    communicationAddress: 0,
    rating: 100
}

const startDate: Date = new Date();
startDate.setDate(0);
const endDate: Date = new Date();
endDate.setDate(1);

const sampleExperience = {
    activity: "Eating",
    location: "Delicious Restaurant",
    peopleNeeded: 1,
    peopleReserved: 0,
    description: "",
    owner: sampleOwner,
    schedule: [startDate,endDate],
    image: img
}

const sampleExperienceArray = new Array(7).fill(sampleExperience)

function ExperienceBrowsing() {
    return (
        <div>
            <Toolbar />
            <ExperiencePreview experiences={sampleExperienceArray} />
            <PaginationControl currentPage={0} onChange={() => {}}/>
        </div>
    )
}

export { ExperienceBrowsing };