import { Toolbar } from "../components/Toolbar";
import { UserRatingForm } from "../components/UserRatingForm";
import "./UsersRatingPage.css"


function UsersRatingPage() {
    //I will handle activity/user context and fetching when I create the user login/signup page

    return (
        <div>
            <Toolbar/>
            <div className="form">
                <UserRatingForm userIds={[0,1]} userFirstNames={["Bob", "Tom"]} activity="Going to the beach"/>
            </div>
        </div>
    )
}

export { UsersRatingPage };