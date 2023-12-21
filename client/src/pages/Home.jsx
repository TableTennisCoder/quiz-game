import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AnswerBtn from "../components/play/game/AnswerBtn";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8800");

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("receive-users", (allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  const handlePlay = () => {
    if (users.length < 2) return;

    navigate("/play");
  };

  return (
    <main className="mainContainer">
      <AnswerBtn onClick={handlePlay} className="startBtn">
        Play
      </AnswerBtn>
      <h2 className="message">Active Payers:</h2>
      {users.map((user, index) => (
        <h2 key={user.userId} className="message">
          Player {index + 1}: {user.userId}
        </h2>
      ))}
    </main>
  );
};

export default Home;
