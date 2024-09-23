import { useState } from "react";
import thumbsDown from "../assets/thumbs-down-svgrepo-com.svg";
import thumbsUp from "../assets/thumbs-up-svgrepo-com.svg";
import "../styles/RatingButtonsStyles.css"

type RatingButtonsProps = {
    onChange: Function
}

enum RatingOptions {
    Positive,
    Negative,
    Report
}

function RatingButtons(props: RatingButtonsProps) {
    const [selection, SetSelection] = useState<RatingOptions>();

    function onClick(rating: RatingOptions) {
        SetSelection(rating);
        props.onChange(rating);
    }

    return (
        <div className="rating-buttons">
            <div 
                className={`button ${selection === RatingOptions.Positive ? 'selected up' : ''}`} 
                onClick={() => onClick(RatingOptions.Positive)}
            >
                <img src={thumbsUp} alt="Thumbs Up" />
            </div>
            <div 
                className={`button ${selection === RatingOptions.Negative ? 'selected down' : ''}`} 
                onClick={() => onClick(RatingOptions.Negative)}
            >
                <img src={thumbsDown} alt="Thumbs Down" />
            </div>
            <div
                className={`report ${selection === RatingOptions.Report ? 'selected' : ''}`}
                onClick={() => onClick(RatingOptions.Report)}
            >
                <span>Report User</span>
            </div>
        </div>
    )
}

export { RatingButtons };
export { RatingOptions };