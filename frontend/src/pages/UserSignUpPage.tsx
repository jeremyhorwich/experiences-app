import { Toolbar } from "../components/Toolbar";
import { UserSignUpForm } from "../components/UserSignUpForm";
import "./UserSignUpPage.css"

function UserSignUpPage() {
    return (
        <div>
            <Toolbar />
            <div className="center-form">
                <UserSignUpForm />
            </div>
        </div>
    )
}

export { UserSignUpPage };