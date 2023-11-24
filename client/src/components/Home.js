import "./Home.css";
import LoginButton from "./LoginButton";
import getRandomQuote from "../utils/RandomQuote";

const Home = () => {
  return (
    <div className="home">
      <h1>XXX</h1>
      <p>{getRandomQuote}</p>
      <LoginButton />
    </div>
  );
};

export default Home;
