import { useContext, useState } from "react";
import { USERNAME, PASSWORD, SUBMIT } from "../constants/constants-en_us";
import "./LoginForm.css";
import { loginUser } from "../api/loginUser";
import { Context } from "../context/context";

function LoginForm() {
    const [usernameField, setUsernameField] = useState<string>("");
    const [passwordField, setPasswordField] = useState<string>("");

    const userContext = useContext(Context)

    if (!userContext) {
        throw new Error("LoginForm must be used within a UserContextProvider");
    }

    const { setUserId: setUser, setUsername, setToken } = userContext;


    function onLoginSubmit() {
        loginUser(usernameField, passwordField)
            .then((response) => {
                if (response.success) {
                    setUser(response.userId);
                    setUsername(response.username)
                    setToken(response.token);
                }
            })
            .catch((error) => {
                console.log("Login failed: ", error)
            });
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