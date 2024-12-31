import { useState, useRef } from "react";
import { RatingButtons, RatingOptions } from "./RatingButtons";
import "./UserRatingForm.css"
import { updateUserRating } from "../api/updateUserRating";
import { useNavigate } from "react-router-dom";

type UserRatingFormProps = {
    userIds: Array<string>,
    userFirstNames: Array<string>,
    activity: string
}

function UserRatingForm(props: UserRatingFormProps) {
    const [currentRatee, setCurrentRatee] = useState<number>(0);
    const [showCommentPrompt, setShowCommentPrompt] = useState<boolean>(false);
    const ratingSelection = useRef<null|RatingOptions>(null);
    const comment = useRef<string>("");
    
    const navigate = useNavigate();

    function handleSubmit() {
        if (ratingSelection.current === null) {
            return;
        }

        const ratingIsNegativeOrReport = 
            ratingSelection.current === RatingOptions.Negative || 
            ratingSelection.current === RatingOptions.Report;
             
        if (ratingIsNegativeOrReport && (comment.current === "")) {
            setShowCommentPrompt(true);
            return;
        }

        const incrementValue = ratingIsNegativeOrReport ? -1 : 1

        //TODO: Validate user token on backend for this action
        updateUserRating(props.userIds[currentRatee], incrementValue)
            .catch((error) => {
                console.log("Login failed: ", error)
            });


        if (currentRatee < props.userIds.length - 1) {
            ratingSelection.current = null;
            comment.current = "";
            setShowCommentPrompt(false);
            setCurrentRatee(currentRatee + 1);
        } else {
            navigate("/experiences");
        }
    }

    return (
        <div className="container">
            <div>
                <div>
                    <span>We hope you had a great time at {props.activity}. </span>
                    <span>How was your experience with {props.userFirstNames[currentRatee]}? </span>

                </div>
                <div>
                    <span>(Please rate based on how polite and respectful they were, even if you didn't click with them.)</span>
                </div>
            </div>
            <div className="rating-area">
                <RatingButtons key={currentRatee + 1} onChange={(e: RatingOptions) => ratingSelection.current = e} />
                <textarea
                    className="comment"
                    key={currentRatee}
                    placeholder = {`${props.userFirstNames[currentRatee]} was a wonderful person to go to ${props.activity} with. He arrived early and...`}
                    onChange={(e) => {comment.current = e.target.value}}
                    title="Please add any necessary comments to your rating"
                />
            </div>
            <div className="submission">
                <div className="comment-prompt">
                    {showCommentPrompt && <span>Please write a comment for a negative review or report</span>}
                </div>
                <div>
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export { UserRatingForm };