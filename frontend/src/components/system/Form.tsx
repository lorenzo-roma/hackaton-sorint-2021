import {FormEventHandler, PropsWithChildren} from 'react';
import {FormGroup} from 'react-bootstrap';

interface FormType {
    onSubmit: FormEventHandler
}

const Form = ({children, onSubmit}: PropsWithChildren<FormType>) => {

    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}
