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

const sampleExperienceArray = new Array(7).fill(undefined).map(() => {
    const startDate = new Date();
    const endDate = new Date(startDate);

    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    endDate.setDate(startDate.getDate() + 1); // End date is one day after start date

    const sampleExperience = {
        activity: "Come eat lunch with me!",
        location: "Delicious Restaurant",
        peopleNeeded: 1,
        peopleReserved: 0,
        description: "",
        owner: sampleOwner,
        schedule: [startDate, endDate],
        image: img // Assuming img is defined elsewhere
    };

    return sampleExperience;
});
//End of sample data declation, beginning of working code

function ExperienceBrowsing() {
    const [experiences, setExperiences] = useState<Array<Experience>>(sampleExperienceArray);
    //Initialize above to empty array when connecting to API
    const [loading, setLoading] = useState<boolean>(false);
    
    const page = useRef<number>(1);
    const NUMBER_PER_PAGE = 7;

    function handlePageChange(dir: -1 | 1) {
        if (page.current + dir < 0) {
            return
        }

        page.current = page.current + dir;
        //Fetch from the API
        //Set experiences if fetch is successful - this will trigger rerender and display correct page #
        console.log(page.current)
    }
    
    return (
        <div>
            <Toolbar />
            {loading ? (<div className="centered">Loading...</div>) : (
                <>
                    <div className="centered">
                        <ExperiencePreview experiences={experiences} />
                    </div>
                    <div className="centered">
                        <PaginationControl currentPage={page.current} onChange={(dir: -1 | 1) => {handlePageChange(dir)}}/>
                    </div>
                </>
            )}
        </div>
    )
}

export { ExperienceBrowsing };