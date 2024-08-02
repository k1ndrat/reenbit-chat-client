// import { useState } from "react";
// import io from "socket.io-client";
// import Chat from "./Chat";

// const socket = io("http://localhost:3001");

// function JoinChat() {
//   // const [chat, setChat] = useState<string>("");
//   const [showChat, setShowChat] = useState<boolean>(false);
//   const [user, setUser] = useState<string>("");

//   const joinChat = () => {
//     if (user) {
//       socket.emit("join_chat", user);
//       setShowChat(true);
//     }
//   };

//   return (
//     <>
//       {!showChat ? (
//         <form>
//           <input
//             type="text"
//             placeholder="User"
//             onChange={(e) => {
//               setUser(e.target.value);
//             }}
//             value={user}
//           />
//           <button onClick={joinChat}>Join</button>
//         </form>
//       ) : (
//         <Chat socket={socket} user={user} />
//       )}
//     </>
//   );
// }

// export default JoinChat;
