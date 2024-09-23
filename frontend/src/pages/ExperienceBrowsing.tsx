import { Toolbar } from "../components/Toolbar";
import { ExperiencePreview } from "../components/ExperiencePreview";
import { PaginationControl } from "../components/PaginationControls";
import { useEffect, useRef, useState } from "react";
import { Experience } from "../dataTypes/experiences";
import { DateTime } from "luxon";
import samples from "../assets/sampleExperiences.json";
import "./ExperienceBrowsing.css"

function ExperienceBrowsing() {
    const [experiences, setExperiences] = useState<Array<Experience>>([]);
    //Initialize above to empty array when connecting to API
    const [loading, setLoading] = useState<boolean>(true);
    
    const page = useRef<number>(0);
    const NUMBER_PER_PAGE = 7;

    useEffect(() => {
        //Later this will be replaced with a call to the API
        const sampleExperiences = samples["experiences"]
            .slice(0,NUMBER_PER_PAGE)
            .map(exp => ({
                ...exp,
                start: DateTime.fromISO(exp.start),
                end: DateTime.fromISO(exp.end)
            }));
        setExperiences(sampleExperiences);
        setLoading(false);
    }, [])

    function handlePageChange(dir: -1 | 1) {
        if (page.current + dir < 0) {
            return
        }

        page.current = page.current + dir;
        //Fetch from the API
        //Set experiences if fetch is successful - this will trigger rerender and display correct page #
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