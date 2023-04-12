import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GameLobby({
  socket,
  setInRoom,
  userName,
  availableRooms,
  setAvailableRooms,
  room,
  setRoom,
}) {
  // Navigation
  let navigate = useNavigate();

  // NEW as of 4/5
  const createRoom = () => {
    socket.emit("create_room", userName);
    setInRoom(true);
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  const joinRoom = () => {
    if (room !== "") socket.emit("join_room", { room, userName });
    setInRoom(true);
    navigate("/GameRoom"); // Navigate to GameRoom
  };

  const handleSetRoom = (event) => {
    event.preventDefault();
    console.log("event.target.value:", event.target.value);
    setRoom(event.target.value);
  };

  // Maybe use later for dropdown
  // const roomsToJoin = () => {
  //   return availableRooms.map((room) => {
  //     <option>{room}</option>;
  //   });
  // };

  return (
    <div >
      {/* NEW as of 4/5 */}
      {availableRooms.length === 0 ? (
        <div >
          <title>Game Lobby</title>
          <h1>Game Lobby</h1>
          <hr></hr>
          <div>
            {/* //////////////////////////////////// */}
            {/* Create a room section */}
            {/* //////////////////////////////////// */}
            <h2>Create a room!</h2>

            <button onClick={createRoom}>Create</button>

            <br></br>
            {/* //////////////////////////////////// */}
            {/* Need a hint section */}
            {/* //////////////////////////////////// */}
            <br></br>
            <br></br>

            <div>
              <p>
                <em>
                  <strong>Hint:</strong> No rooms available to join yet, create
                  the first room above ^^ to play!
                </em>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div >
          <title>Game Lobby</title>
          <h1>Game Lobby</h1>
          <hr></hr>
          <div>
            {/* //////////////////////////////////// */}
            {/* Create a room section */}
            {/* //////////////////////////////////// */}
            <h2>Create a room!</h2>

            <button onClick={createRoom}>Create</button>

            <br></br>
          </div>

          {/* //////////////////////////////////// */}
          {/* Join a room section */}
          {/* //////////////////////////////////// */}
          <br></br>
          <br></br>

          <div>
            <h1>
              <em>OR</em>
            </h1>

            <br></br>

            <h2>Join a Room!</h2>
            <h3>The available rooms are:</h3>
            <p>{availableRooms.join(" - ")}</p>
          </div>

          <div>
            <input
              placeholder="Enter Room to Join..."
              onChange={(event) => {
                handleSetRoom(event);
              }}
            />
            {/* <div>
              Maybe use below to eventually do a dropdown instead of input above

              <select>
                {/* Current games dropdown
                {roomsToJoin} */}
            {/* <option>Select a game to join</option> */}
            {/* <option>
                  {availableRooms.length > 0 ? availableRooms.join("-") : " "}
                </option>
                <option>
                  {availableRooms.length > 1 ? availableRooms.join("-") : " "}
                </option>
                <option>
                  {availableRooms.length > 2 ? availableRooms.join("-") : " "}
                </option>
                <option>
                  {availableRooms.length > 3 ? availableRooms.join("-") : " "}
                </option>
                <option>
                  {availableRooms.length > 4 ? availableRooms.join("-") : " "}
                </option>
                <option>
                  {availableRooms.length > 5 ? availableRooms.join("-") : " "}
                </option> */}
            {/* </select> */}

            <br></br>
            <br></br>

            <button onClick={joinRoom}>Join</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameLobby;