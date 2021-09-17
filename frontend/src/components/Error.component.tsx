import {Alert} from 'react-bootstrap';

const ErrorComponent = ({error}: {error: string}) => (
    <Alert variant={'danger'}>{error}</Alert>
);

export default ErrorComponent;
