import { useEffect, useState } from "react";
import { LOADING, MORE } from "../constants/constants-en_us";
import "./ReservedInExperienceDisplay.css"
import { findMultipleUsers, findUser } from "../api/findUser";

type ReservedInExperienceDisplayProps = {
    owner: string
    reserved: Array<string>
}

function ReservedInExperienceDisplay(props: ReservedInExperienceDisplayProps) {
    const [loading, setLoading] = useState<Boolean>(false);
    const [owner, setOwner] = useState<string>();
    const [reserved, setReserved] = useState<Array<string>>([]);
    const [showMore, setShowMore] = useState<Boolean>(false);
    
    const DEFAULT_DISPLAY = 2;

    useEffect(() => {
        async function fetchData() {
            try {
                const [ownerResponse, reservedResponse] = await Promise.all([
                    findUser(props.owner),
                    findMultipleUsers(props.reserved),
                ]);

                setOwner(ownerResponse?.name)

                const reservedNames = reservedResponse?.map((user) => user.name);
                if (reservedNames) {
                    setReserved(reservedNames);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [])
    
    return (
        <div>
            {loading ? (<div>{LOADING}</div>) : (
                <div>
                    <div>{owner}</div>
                    {reserved.slice(0,DEFAULT_DISPLAY).map((name, index) => (
                        <div key={index}>{name}</div>
                    ))}
                    {reserved.length > DEFAULT_DISPLAY && (
                        <button onClick={() => setShowMore(true)} style={{ cursor: 'pointer' }}>
                            {MORE}
                        </button>)}
                </div>
            )}
            {showMore && (
                <div className="popup">
                    <div className="popup-content">
                        {owner}
                        {reserved.map((name, index) => (
                            <div key={index}>{name}</div>
                        ))}
                        <button onClick={() => setShowMore(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { ReservedInExperienceDisplay }