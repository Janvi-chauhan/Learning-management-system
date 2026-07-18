// import { useParams } from "react-router-dom";
// import { JitsiMeeting } from "@jitsi/react-sdk";

// export default function LiveMeeting() {
//     const { roomName } = useParams();

//     return (
//         <div style={{ height: "100vh", width: "100%" }}>
//             <JitsiMeeting
//                 domain="meet.jit.si"
//                 roomName={roomName}
//                 getIFrameRef={(iframe) => {
//                     iframe.style.height = "100vh";
//                     iframe.style.width = "100%";
//                 }}
//             />
//         </div>
//     );
// }