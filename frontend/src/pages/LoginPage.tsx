import { LoginForm } from "../components/LoginForm";
import { Toolbar } from "../components/Toolbar";
import "./LoginPage.css"

function LoginPage() {
    return (
        <div>
            <Toolbar />
            <div className="center-form">
                <LoginForm />
            </div>
        </div>
    )
}

export { LoginPage };