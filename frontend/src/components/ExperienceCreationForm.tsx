import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";
import { ExperienceDateSelection } from "./ExperienceDateSelection";
import { CheckboxState, ExperienceFilteringSelection } from "./ExperienceFilteringSelection";
import "./ExperienceCreationForm.css"
import { Experience } from "../dataTypes/experiences";
import { sendNewExperience } from "../api/sendNewExperience";
import { UserContext } from "../context/userContext";

function ExperienceCreationForm() {
    const [peopleNeeded, setPeopleNeeded] = useState<number>(1);
    
    const activity = useRef<string>("");
    const description = useRef<string>("");
    const location = useRef<string>("");
    const startTime = useRef<DateTime>(DateTime.now());
    const endTime = useRef<DateTime>(DateTime.now().plus({hours: 2}));
    const minAge = useRef<number>(40);
    const maxAge = useRef<number>(50);
    const minRating = useRef<number>(100);
    const checkState = useRef<CheckboxState>({
        male: true,
        female: true,
        nonbinary: true
    })
    const file = useRef<string>(); //TODO: File upload

    const userContext = useContext(UserContext);
    const currentUserId = userContext ? userContext.userId : "";
    
    function handleSubmit() {
        if (activity.current === "" || description.current === "" || location.current === "") {
            return;
        }

        const newExperience: Experience = {
            id: uuidv4(),
            activity: activity.current,
            location: location.current,
            peopleNeeded: peopleNeeded,
            peopleReserved: [],
            description: description.current,
            ownerId: currentUserId,
            start: startTime.current,
            end: endTime.current,
            messages: [],
            image: file.current || undefined,
            minAge: minAge.current,
            maxAge: maxAge.current,
            minRating: minRating.current,
            maleIncluded: checkState.current.male,
            femaleIncluded: checkState.current.female,
            nonbinaryIncluded: checkState.current.nonbinary
        }

        sendNewExperience(newExperience)
            .catch((error) => console.error("Error posting experience: ", error))
    }

    function onDateChange(startDate: Date, duration: number) {
        startTime.current = DateTime.fromJSDate(startDate);
        endTime.current = DateTime.fromJSDate(startDate).plus({hours: duration})
    }

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const upload = e.target.files?.[0];
        if (upload) {
            file.current = URL.createObjectURL(upload);
        }
    }

    function onFilteringChange(newCheckedState: CheckboxState, newMinAge: number, newMaxAge: number, newMinRating: number) {
        checkState.current = newCheckedState;
        minAge.current = newMinAge;
        maxAge.current = newMaxAge;
        minRating.current = newMinRating
    }

    return (
        <div className="container">
            <div className="title-input">
                <span>What would you like to invite people to do?</span>
                <input
                    type="text"
                    placeholder="Come ride fun rollercoasters with me"
                    onChange={(e) => {activity.current = e.target.value}}
                    title="Please enter a title for your experience"
                    required
                />
            </div>
            <div>
                <span>Enter a description for your experience:</span>
                <textarea
                    className="description-input"
                    placeholder="Enjoy an afternoon in the sun. We'll meet up by the giant pretzel in the park center..."
                    onChange={(e) => {description.current = e.target.value}}
                    title="Please enter a description for your experience"
                    required
                />
            </div>
            <div className="logistics">
                <div>
                    <span>Where?</span>
                        <input
                            type="text"
                            placeholder="Six Flags, 555 W Main St"
                            onChange={(e) => {location.current = e.target.value}}
                            title="Please enter a location for your experience"
                            required
                        />
                </div>
                <div>
                    <ExperienceDateSelection onChange={onDateChange}/>
                </div>
                <div>
                    <span>People needed:</span>
                    <input 
                        type="number"
                        value={peopleNeeded}
                        min={1}
                        max={5}
                        step={1}
                        onChange={(e) => setPeopleNeeded(Number(e.target.value))}
                    />
                </div>
            </div>
            <div>
                <ExperienceFilteringSelection 
                    onChange={onFilteringChange}
                />
            </div>
            <div className="centered">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                />
                <button onClick={handleSubmit}>Submit!</button>
            </div>
        </div>
    )
}

export { ExperienceCreationForm };