import {useState} from 'react';
import {Validator} from '../utils/Validators';

const useInput = (defaultValue: string, validationHandler: Validator[] = []) => {
    const [input, setInput] = useState(defaultValue);
    const [touched, setTouched] = useState(false);
    validationHandler.map(h => console.log(h.error, h.handler(input)))
    return {
        onChange: (event: any) => setInput(event.target.value),
        onBlur: (event: any) => setTouched(true),
        value: input,
        touched: touched,
        hasErrors: validationHandler.some(handler => !handler.handler(input)),
        errors: validationHandler.filter(handler => !handler.handler(input)).map(failingValidation => failingValidation.error)
    }
}

export default useInput;
