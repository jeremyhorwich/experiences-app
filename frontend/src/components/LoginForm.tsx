import { useState } from "react";
import { USERNAME, PASSWORD, SUBMIT } from "../constants/constants-en_us";
import "./LoginForm.css";

function LoginForm() {
    const [usernameField, setUsernameField] = useState<string>("");
    const [passwordField, setPasswordField] = useState<string>("");


    function onLoginSubmit() {
        //Placeholder - in the future we will verify using API
        console.log(usernameField, passwordField)
    }

    return (
        <div className="login-box">
            <span>{USERNAME}</span>
            <div>
                <input 
                    value={usernameField}
                    onChange={((e) => setUsernameField(e.target.value))}
                />
            </div>
            <span>{PASSWORD}</span>
            <div>
                <input 
                    type="password"
                    value={passwordField}
                    onChange={((e) => setPasswordField(e.target.value))}
                />
            </div>
            <button onClick={onLoginSubmit}>{SUBMIT}</button>
        </div>
    )
}

export { LoginForm };