import React, { useState } from "react";
import { postCreateUser } from "../api/postCreateUser";
import { User, Credential } from "../dataTypes/users";
import { v4 as uuidv4 } from 'uuid';
import { NAME, AGE, GENDER, COMMUNICATION, SUBMIT } from "../constants/constants-en_us";
import { USERNAME, PASSWORD } from "../constants/constants-en_us";
import "./UserSignUpForm.css";

function UserSignUpForm() {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<"male"|"female"|"nonbinary">("male");
    const [pref, setPref] = useState<"text"|"email">("text");
    const [address, setAddress] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    type Gender = "male" | "female" | "nonbinary";

    function onGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Gender;
        setGender(value);
    };

    type Preference = "text" | "email";

    function onPreferenceChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Preference;
        setPref(value);
    }

    function submitUser() {
        if (name === "" || age === 0 || username === "" || password === "") {
            setError("Please fill all fields");
            return;
        }

        const addressIsValidPhone = (/^\d+$/.test(address) && address.length === 10);

        if (pref === "text" && !addressIsValidPhone) {
            setError("Please enter a valid phone number")
            return;
        }

        const addressIsValidEmail = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(address))

        if (pref === "email" && !addressIsValidEmail) {
            setError("Please enter a valid email address")
        }

        const newUser: User = {
            id: uuidv4(),
            name: name,
            age: age,
            gender: gender,
            communicationPreference: pref,
            communicationAddress: address,
            rating: 100
        }

        const newCredential: Credential = {
            id: uuidv4(),
            user: newUser.id,
            username: username,
            password: password
        }

        postCreateUser(newCredential, newUser)
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="signup-form">
            <div className="signup-fields">
                <div>
                    <span>{NAME}: </span>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <span>{AGE}: </span>
                    <input
                        value={age}
                        type="number"
                        min={18}
                        max={100}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                </div>
                <div>
                    <span>{GENDER}: </span>
                    <select value={gender} onChange={onGenderChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="nonbinary">Nonbinary</option>
                    </select>
                </div>
            </div>
            <div className="give-padding">
                <span>{COMMUNICATION} </span>
                <select value={pref} onChange={onPreferenceChange}>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                </select>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="give-padding">
                <span>{USERNAME}: </span>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="give-padding">
                <span>{PASSWORD}: </span>
                <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="signup-fields">
                <div>
                    <button onClick={submitUser}>{SUBMIT}</button>
                    <div className="error-text">
                        {error}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UserSignUpForm };