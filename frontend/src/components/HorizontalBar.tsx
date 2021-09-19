interface Props {
    style?: any;
}

const HorizontalBar = (props: React.PropsWithChildren<Props>) => {
    return (
        <div
            className="bg-primary-c"
            style={{ ...props.style, width: "100%" }}
        >
            {props.children}
        </div>
    );
};

export default HorizontalBar;
