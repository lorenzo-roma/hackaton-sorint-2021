import {FormControl} from 'react-bootstrap';
import {ChangeEventHandler, EventHandler, FocusEventHandler, PropsWithChildren, ReactChildren} from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';
import {ValidatorError} from '../../utils/Validators';
import DatePicker from "react-datepicker";

type DatePickerProps = {
    onChange: (date: Date) => void;
    onBlur: FocusEventHandler;
    value: Date;
    hasErrors: boolean;
    placeholder?: string;
    selectsEnd?: boolean;
    startDate?: Date;
    selectsStart?: boolean;
    endDate?: Date;
    touched: boolean;
    minDate?: Date;
    errors: ValidatorError[];
}
export const InputDateTime = ({onBlur, onChange, value, hasErrors, touched,errors, minDate, placeholder, selectsStart, selectsEnd, endDate, startDate}: DatePickerProps) => {
    return (
        <div>
            <DatePicker minDate={minDate} placeholderText={placeholder} endDate={endDate} timeFormat="H:mm" dateFormatCalendar="dd MMM H:mm" startDate={startDate} selectsStart={selectsStart} selectsEnd={selectsEnd}
                        dateFormat="dd MMM H:mm" showTimeSelect={true} onBlur={onBlur} onChange={onChange} selected={value} className={((touched && hasErrors) ? 'is-invalid' : '') + ' w-100 form-control'}/>
            {errors && <div className="text-danger">
                {errors.length > 0 ? errors[0].printable : ''}
            </div> }
        </div>
    );
}

export default InputDateTime;

type ButtonType = {
    onClick: () => void;
}

export const Button = ({onClick, children}: PropsWithChildren<ButtonType>) => (
    <BootstrapButton onClick={onClick}>{children}</BootstrapButton>
)
