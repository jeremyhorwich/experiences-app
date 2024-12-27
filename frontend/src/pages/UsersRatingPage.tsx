import { Toolbar } from "../components/Toolbar";
import { UserRatingForm } from "../components/UserRatingForm";
import "./UsersRatingPage.css"


function UsersRatingPage() {
    return (
        <div>
            <Toolbar/>
            <div className="form">
                {/* Sample test data */}
                <UserRatingForm userIds={["ae8d2e05-45c9-4220-94b1-594eb36c937c"]} userFirstNames={["Bob", "Tom"]} activity="Going to the beach"/>
            </div>
        </div>
    )
}

export { UsersRatingPage };