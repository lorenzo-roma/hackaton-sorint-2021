import {FormEventHandler} from 'react';

const useForm = (): {onSubmit: FormEventHandler} => {
    return {
        onSubmit: event => {
            event.preventDefault();
        }
    }
}
export default useForm;
