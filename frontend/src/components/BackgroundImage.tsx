import img from "../assets/background.png";

const BackgroundImage = () => (
    <div
        style={{ backgroundImage: `url(${img})` }}
        className="background-image"
    ></div>
);
export default BackgroundImage;
