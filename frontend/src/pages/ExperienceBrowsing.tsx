import { Toolbar } from "../components/Toolbar";
import { ExperiencePreview } from "../components/ExperiencePreview";
import { PaginationControl } from "../components/PaginationControls";
import { useContext, useEffect, useRef, useState } from "react";
import { Experience } from "../dataTypes/experiences";
import "./ExperienceBrowsing.css"
import { Context } from "../context/context";
import { findExperiences } from "../api/findExperiences";

function ExperienceBrowsing() {
    const [experiences, setExperiences] = useState<Array<Experience>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [displayError, setDisplayError] = useState<boolean>(true);

    const userContext = useContext(Context);
    const currentUserId = userContext ? userContext.userId : "";
    
    const page = useRef<number>(1);
    const NUMBER_PER_PAGE = 7;

    async function fetchExperiences(currentPage: number) {
        try {
            const response = await findExperiences(currentUserId, currentPage, NUMBER_PER_PAGE)
            if (response) {
                setExperiences(response.results)
            }
        } catch (error) {
            setDisplayError(true);
            console.error("Error fetching experiences: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchExperiences(page.current);
    }, [])

    function handlePageChange(dir: -1 | 1) {
        if (page.current + dir < 0) {
            return
        }

        page.current = page.current + dir;
        fetchExperiences(page.current)
    }
    
    return (
        <div>
            <Toolbar />
            {displayError ? (
                (<div className="centered">Sorry, there was a problem fetching your data.</div>)
            ) : (
                loading ? (<div className="centered">Loading...</div>) : (
                    <>
                        <div className="centered">
                            <ExperiencePreview experiences={experiences} />
                        </div>
                        <div className="centered">
                            <PaginationControl currentPage={page.current} onChange={(dir: -1 | 1) => {handlePageChange(dir)}}/>
                        </div>
                    </>
                )
            )}
        </div>
    )
}

export { ExperienceBrowsing };