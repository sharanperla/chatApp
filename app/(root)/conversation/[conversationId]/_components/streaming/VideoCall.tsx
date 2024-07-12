import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import { Phone } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";


type Props = {
  userId: Id<"users">;
  peerId: Id<"users">;
};

const VideoCall = ({ userId, peerId }: Props) => {
  const [receivingCall, setReceivingCall] = useState(false);

  const [callAccepted, setCallAccepted] = useState(false);

  const callUserMutation = useMutation(api.Stream.callUser);
  const acceptCallMutation = useMutation(api.Stream.acceptCall);
  const declineCallMutation = useMutation(api.Stream.declineCall);

  const signals = useQuery(api.Stream.incomingCall, { userId });


  useEffect(() => {
    if (signals) {
      setReceivingCall(true);
    }
  }, [signals]);


//   const handleCall = async () => {
//     try {
//       const call = videoClient.createCall({
//         type: 'video',
//         to: peerId,
//       });

//       setCurrentCall(call);
//       await callUserMutation({ userId, peerId, callId: call.id });
//       await call.start();
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

  return (
    <div>
      {/* <video ref={userVideo} autoPlay muted className="absolute top-0 left-0 w-full h-full object-cover" />
  <video ref={partnerVideo} autoPlay className="absolute top-0 left-0 w-full h-full object-cover" /> */}
      <Button>
        <Phone />
      </Button>
      {receivingCall && !callAccepted && (
        <div>
          <h1>Someone is calling...</h1>
          <Button>Accept</Button>
          <Button>Decline</Button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
