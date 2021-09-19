import ComfortIcon from "./ComfortIcon";
import CovidIcon from "./CovidIcon";
import CarsIcon from "./CarsIcon";
import BookIcon from "./BookIcon";
import MoneyIcon from "./MoneyIcon";
import Feature from "./Feature";

const FeatureSection = () => {
    return (
        <div
            style={{
                height: "80vh",
                width: "100vw",
                padding: "96px",
                marginBottom: "64px",
                textAlign: "center",
            }}
        >
            <div className="d-flex flex-column justify-content-center">
                <div className="header2 center">A New Shared Experience</div>
            </div>
            <div className="d-flex row justify-content-around mt-4">
                <Feature
                    title="COVID Compilant!"
                    description="All passenger are checked and tracked, there are no grathering."
                    icon={<CovidIcon />}
                />
                <Feature
                    title="No more driving in traffic"
                    description="The driver has your back!"
                    icon={<CarsIcon />}
                />
            </div>
            <div className="d-flex row justify-content-around mt-4">
                <Feature
                    title="Relax"
                    description="During the travel you can relax reading a book or watching your favourite series"
                    icon={<BookIcon />}
                />
                <Feature
                    title="Affordable"
                    description="You pay the distance you travel and it doesn’t cost so much"
                    icon={<MoneyIcon />}
                />
            </div>
        </div>
    );
};

export default FeatureSection;
