import { useState } from "react"
import "../styles/ExperienceFilteringSelectionStyles.css"

type ExperienceFilteringSelectionProps = {
    onChange: Function
}

export type CheckboxState = {
    male: boolean,
    female: boolean,
    nonbinary: boolean
}

function ExperienceFilteringSelection(props: ExperienceFilteringSelectionProps) {
    const [checkedItems, setCheckedItems] = useState<CheckboxState>({
        male: true,
        female: true,
        nonbinary: true
    })

    const [minAge, setMinAge] = useState<number>(40);
    const [maxAge, setMaxAge] = useState<number>(50);
    const [minRating, setMinRating] = useState<number>(100);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newCheckedItems = {
            ...checkedItems,
            [e.target.name]: e.target.checked
        }
        setCheckedItems(newCheckedItems)
        props.onChange(newCheckedItems, minAge, maxAge, minRating);
    }
    
    function onMinAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let newMinAge = Number(e.target.value);
        if (newMinAge < 18) {
            newMinAge = 18
        }
        setMinAge(newMinAge); 
        if (maxAge < newMinAge) {
            setMaxAge(newMinAge);
        }
        props.onChange(checkedItems, newMinAge, maxAge, minRating);
    }

    function onMaxAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let newMaxAge = Number(e.target.value);
        if (newMaxAge > 100) {
            newMaxAge = 100
        }
        setMaxAge(newMaxAge); 
        if (minAge > newMaxAge) {
            setMinAge(18);
        }
        props.onChange(checkedItems, minAge, newMaxAge, minRating);
    }

    function onMinRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
        const newMinRating = Number(e.target.value);
        setMinRating(newMinRating);
        props.onChange(checkedItems, minAge, maxAge, newMinRating);
    }

    return (
        <div className="filtering-container">
        <span>Who would you like to join your experience?</span>
        <div className="age-container">
            <label>Min Age:
                <input
                    type="number"
                    value={minAge}
                    onChange={onMinAgeChange}
                    min="18"
                    max={maxAge}
                />
            </label>
            <label>Max Age:
                <input
                    type="number"
                    value={maxAge}
                    onChange={onMaxAgeChange}
                    min={minAge}
                    max="100"
                />
            </label>
        </div>
        <div className="checkbox-container">
            <label>
                Male:
                <input
                    type="checkbox"
                    name="male"
                    checked={checkedItems.male}
                    onChange={onChange}
                />
            </label>
            <label>
                Female:
                <input
                    type="checkbox"
                    name="female"
                    checked={checkedItems.female}
                    onChange={onChange}
                />
            </label>
            <label>
                Nonbinary:
                <input
                    type="checkbox"
                    name="nonbinary"
                    checked={checkedItems.nonbinary}
                    onChange={onChange}
                />
            </label>
        </div>
        <div>
            <label>Min Rating:
                <input
                    type="number"
                    value={minRating}
                    onChange={onMinRatingChange}
                    min="70"
                    max="100"
                />
            </label>
        </div>
    </div>
    )
}

export { ExperienceFilteringSelection };