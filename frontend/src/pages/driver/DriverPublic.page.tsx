import {Button} from "../../components/system/InputText";
import {useState} from "react";
import {Redirect} from "react-router-dom";

const DriverPublicPage = () => {
    const [redirect, setRedirect] = useState(false);
    if(redirect) return <Redirect to="/driver/signup" />
    return (<div>
        <h1>Why you should become a driver?</h1>
        <p>Because being a driver is really cool and you also make money!</p>
        <Button onClick={() => setRedirect(true)}>Start with us!</Button>
    </div>);
}
export default DriverPublicPage;