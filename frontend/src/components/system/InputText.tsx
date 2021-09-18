import {FormControl} from 'react-bootstrap';
import {ChangeEventHandler, EventHandler, FocusEventHandler, PropsWithChildren, ReactChildren} from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';
import {ValidatorError} from '../../utils/Validators';

type InputTextType = {
    type: 'text' | 'password' | "number";
    onChange: ChangeEventHandler;
    onBlur: FocusEventHandler;
    placeholder?: string;
    value: string;
    hasErrors: boolean;
    touched: boolean;
    errors: ValidatorError[];
}
export const InputText = ({type, onBlur, onChange, placeholder, value, hasErrors, touched,errors}: InputTextType) => (
    <div>
        <FormControl onBlur={onBlur} type={type} onChange={onChange} placeholder={placeholder} value={value} className={(touched && hasErrors) ? 'is-invalid' : ''}/>
        {errors && <div className="invalid-feedback">
            {errors.length > 0 ? errors[0].printable : ''}
        </div> }
    </div>
);

type ButtonType = {
    onClick: () => void;
}

export const Button = ({onClick, children}: PropsWithChildren<ButtonType>) => (
    <BootstrapButton onClick={onClick}>{children}</BootstrapButton>
)
