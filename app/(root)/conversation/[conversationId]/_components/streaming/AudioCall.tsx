import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Phone } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";

type Props = {
  userId: Id<"users">;
  peerId: Id<"users">;
};

const AudioCall = ({ userId ,peerId}: Props) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<SimplePeer.SignalData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const myPeer = useRef<SimplePeer.Instance | null>(null);
  const userAudio = useRef<HTMLAudioElement>(null);
  const partnerAudio = useRef<HTMLAudioElement>(null);

  const callUserMutation = useMutation(api.Stream.callUser);
  const acceptCallMutation = useMutation(api.Stream.acceptCall);

  const signals = useQuery(api.Stream.incomingCall, { userId });

  

  const callUser = async (id: Id<"users">) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (signal) => {
      callUserMutation({
        userToCall: id,
        signalData: signal,
        from: userId,
      });
    });

    peer.on('stream', (stream) => {
      if (partnerAudio.current) {
        partnerAudio.current.srcObject = stream;
      }
    });

    myPeer.current = peer;
    
  }


  const acceptCall = async () => {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (signal) => {
      acceptCallMutation({to: userId, signal });
    });

    peer.on('stream', (stream) => {
      if (partnerAudio.current) {
        partnerAudio.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal as SimplePeer.SignalData);
    myPeer.current = peer;
  };
 


  return (
    <div>
      <audio ref={userAudio} autoPlay muted />
      <audio ref={partnerAudio} autoPlay />
      <button onClick={() => callUser(peerId)}>Call</button>
      {receivingCall && !callAccepted && (
        <div>
          <h1>Someone is calling...</h1>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default AudioCall;
