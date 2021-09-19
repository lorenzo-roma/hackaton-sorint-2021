import {PropsWithChildren} from "react";
import {Card as BootstrapCard} from "react-bootstrap";

const Card = (props: PropsWithChildren<{}>) => (
    <div className="custom-card">
        {props.children}
    </div>
);
export default Card;