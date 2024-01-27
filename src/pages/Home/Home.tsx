import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/helpers";

const Home = () => {
	const user = getUser();
	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
		return null;
	}

	return <div>{JSON.stringify(user)}</div>;
};

export default Home;
