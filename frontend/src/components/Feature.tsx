interface Props {
    title: string;
    description: string;
    icon: JSX.Element;
}

const Feature = (props: Props) => {
    return (
        <div
            className="d-flex flex-column justify-content-around"
            style={{
                width: "30vw",
                height: "20vw",
                padding: "32px",
                background: "var(--light)",
            }}
        >
            <div className="row d-flex">{props.icon}</div>
            <div>
                <div className="header3" style={{ fontSize: "14px" }}>
                    {props.title}
                </div>
                <div className="body1">{props.description}</div>
            </div>
        </div>
    );
};

export default Feature;
