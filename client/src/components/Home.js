import "./Home.css";
import LoginButton from "../utils/LoginButton";

const Home = () => {
  return (
    <div className="home">
      <h1>MooDoo</h1>
      <p>NOTE: This is a privatley hosted application with limited access.</p>
      <LoginButton />
    </div>
  );
};

export default Home;
