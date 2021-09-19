interface Props {
    title: string;
    description: string;
    icon: JSX.Element;
}

const InfoCard = (props: Props) => {
    return (
        <div
            className="info-card d-flex flex-column justify-content-around"
            style={{
                padding: "24px",
                background: "var(--light)",
                maxWidth: '40vw',
                minHeight: '100px'
            }}
        >
            {props.icon}
            <div>
                <div className="header3">{props.title}</div>
                <div className="body1">{props.description}</div>
            </div>
        </div>
    );
};

export default InfoCard;
