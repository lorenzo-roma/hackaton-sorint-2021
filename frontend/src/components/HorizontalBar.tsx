interface Props {
    style?: any;
}

const HorizontalBar = (props: React.PropsWithChildren<Props>) => {
    return (
        <div
            className="bg-primary-c"
            style={{ ...props.style, width: "100%", height: "25vh" }}
        >
            {props.children}
        </div>
    );
};

export default HorizontalBar;
