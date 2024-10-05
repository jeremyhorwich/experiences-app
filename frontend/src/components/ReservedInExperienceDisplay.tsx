import { useEffect, useState } from "react";
import samples from "../assets/sampleUsers.json";
import { LOADING, MORE } from "../constants/constants-en_us";
import "./ReservedInExperienceDisplay.css"

type ReservedInExperienceDisplayProps = {
    owner: number
    reserved: Array<number>
}

function ReservedInExperienceDisplay(props: ReservedInExperienceDisplayProps) {
    const [loading, setLoading] = useState<Boolean>(false);
    const [owner, setOwner] = useState<string>();
    const [reserved, setReserved] = useState<Array<string>>([]);
    const [showMore, setShowMore] = useState<Boolean>(false);
    
    const DEFAULT_DISPLAY = 2;

    //Begin placeholder. Later will replace with fetching owners by ownerID from API
    useEffect(() => {
        const sampleUsers = samples["Users"]
            .slice(0,props.reserved.length + 1)
            .map(user => user.name);
        setOwner(sampleUsers[props.owner])
    
        if (props.reserved.length > 0) {
            const reservedNames = props.reserved
                .map(i => sampleUsers[i])
            setReserved(reservedNames);
        }
    
        setLoading(false);
    }, [])

    //End placeholder
    
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