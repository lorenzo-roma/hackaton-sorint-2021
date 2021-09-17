interface Config {
    baseUrl: string;
}

const appConfig: Config = {
    baseUrl: process.env.REACT_APP_API_BASE_URL!,
};

export default appConfig;
