interface Config {
    auth_secret: string;
    routeXL: {
        username: string;
        password: string;
    }
}

export default {
    auth_secret: "hackaton",
    routeXL: {
        username: 'DCampagnola',
        password: 'asdasd123'
    }
} as Config;