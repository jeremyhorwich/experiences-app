import { useContext } from "react";
import { Toolbar } from "../components/Toolbar";
import { UserRatingForm } from "../components/UserRatingForm";
import "./UsersRatingPage.css"
import { Context } from "../context/context";

function UsersRatingPage() {
    const context = useContext(Context)
    const userIds = context ? context.usersToRate : [""]
    const userFirstNames = context ? context.usersToRateFirstNames : [""]
    const activity = context ? context.activityToRate : ""

    return (
        <div>
            <Toolbar/>
            <div className="form">
                {/* TODO: Send notification to user and set context  info from there */}
                <UserRatingForm userIds={userIds} userFirstNames={userFirstNames} activity={activity}/>
            </div>
        </div>
    )
}

export { UsersRatingPage };