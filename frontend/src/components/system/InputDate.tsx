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
    touched: boolean;
    errors: ValidatorError[];
}
export const InputDate = ({onBlur, onChange, value, hasErrors, touched,errors}: DatePickerProps) => (
    <div>
        <DatePicker onBlur={onBlur} onChange={onChange} selected={value} className={(touched && hasErrors) ? 'is-invalid' : ''}/>
        {errors && <div className="invalid-feedback">
            {errors.length > 0 ? errors[0].printable : ''}
        </div> }
    </div>
);

export default InputDate;

type ButtonType = {
    onClick: () => void;
}

export const Button = ({onClick, children}: PropsWithChildren<ButtonType>) => (
    <BootstrapButton onClick={onClick}>{children}</BootstrapButton>
)
