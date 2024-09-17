import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useState, useRef, ChangeEvent } from "react";

type ExperienceDateSelectionProps = {
    onChange: Function
}

function ExperienceDateSelection(props: ExperienceDateSelectionProps) {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [duration, setDuration] = useState<number>(1);
    const length = useRef<number>(2);

    function onDateChange(e: Date) {
        setStartDate(e);
        props.onChange(e,length.current);
    }

    function onDurationChange(e: ChangeEvent<HTMLInputElement>) {
        setDuration(Number(e.target.value));
        props.onChange(startDate, e.target.value);
    }

    return (
        <div>
            <div>
                <span>Start of event:</span>
                <DatePicker
                    selected={startDate}
                    onChange={(e) => onDateChange(e as Date)}
                    minDate={new Date()}
                    dateFormat={"MM/dd/yy h:mm aa"}
                    showTimeSelect
                />
            </div>
            <div>
                <span>Number of hours:</span>
                <input
                    type="number"
                    value={duration}
                    onChange={onDurationChange}
                    step={"1"}
                    min={"1"}
                    max={"10"}
                />
            </div>
        </div>
    )

}

export { ExperienceDateSelection }