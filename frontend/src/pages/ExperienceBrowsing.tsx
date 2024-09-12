import { Toolbar } from "../components/Toolbar";
import { ExperiencePreview } from "../components/ExperiencePreview";
import { PaginationControl } from "../components/PaginationControls";
import img from "../assets/perry-merrity-ii-IEuHjlWmJo0-unsplash.jpg";
import { useRef, useState } from "react";
import { Experience } from "../dataTypes/experiences";

//Beginning of sample data declaration
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
    activity: "Come eat lunch with me!",
    location: "Delicious Restaurant",
    peopleNeeded: 1,
    peopleReserved: 0,
    description: "",
    owner: sampleOwner,
    schedule: [startDate,endDate],
    image: img
}

const sampleExperienceArray = new Array(8).fill(sampleExperience);
//End of sample data declation, beginning of working code

function ExperienceBrowsing() {
    const [experiences, setExperiences] = useState<Array<Experience>>(sampleExperienceArray);
    //Initialize above to empty array when connecting to API
    const [loading, setLoading] = useState<boolean>(false);
    
    const page = useRef<number>(2);
    const NUMBER_PER_PAGE = 8;

    function handlePageChange(dir: -1 | 1) {
        page.current = page.current + dir;
        //Fetch from the API
        //Set experiences if fetch is successful - this will trigger rerender and display correct page #
        console.log(page.current)
    }
    
    return (
        <div>
            <Toolbar />
            <div>
                <ExperiencePreview experiences={experiences} />
            </div>
            <div className="centered">
                <PaginationControl currentPage={page.current} onChange={(dir: -1 | 1) => {handlePageChange(dir)}}/>
            </div>
        </div>
    )
}

export { ExperienceBrowsing };