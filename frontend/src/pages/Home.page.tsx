import {useSelector} from "react-redux";
import {useAppSelector} from "../stores/store";

export default function HomePage() {
    const authStore = useAppSelector(state => state.auth);
    return (<div>
        This is the home {authStore.token}
    </div>);
}
