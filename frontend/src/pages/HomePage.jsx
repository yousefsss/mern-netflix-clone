import { useAuthStore } from "../store/authUser";
import AuthScreen from "./home/AuthScreen";
import HomeScreen from "./home/HomeScreen";
const HomePage = () => {
  // const { user } = useAuthStore();
  const user = true;
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
