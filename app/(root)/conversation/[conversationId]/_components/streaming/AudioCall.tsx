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

const AudioCall = ({ userId, peerId }: Props) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState<SimplePeer.SignalData | null>(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const myPeer = useRef<SimplePeer.Instance | null>(null);
  const userAudio = useRef<HTMLAudioElement>(null);
  const partnerAudio = useRef<HTMLAudioElement>(null);

  const callUserMutation = useMutation(api.Stream.callUser);
  const acceptCallMutation = useMutation(api.Stream.acceptCall);
  const declineCallMutation = useMutation(api.Stream.declineCall);

  const signals = useQuery(api.Stream.incomingCall, { userId });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userAudio.current) {
          userAudio.current.srcObject = stream;
        }
        console.log('Stream obtained:', stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });

    if (signals?.length) {
      const { signalData } = signals[0];
      setReceivingCall(true);
      setCallerSignal(signalData);
    }

    return () => {
      if (myPeer.current) {
        myPeer.current.destroy();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [signals]);

  const callUser = async (id: Id<"users">) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (signal) => {
      console.log('Sending signal:', signal);
      callUserMutation({
        userToCall: id,
        signalData: signal,
        from: userId,
      });
    });

    peer.on('stream', (remoteStream) => {
      console.log('Received remote stream:', remoteStream);
      if (partnerAudio.current) {
        partnerAudio.current.srcObject = remoteStream;
      }
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    myPeer.current = peer;
  };

  const acceptCall = async () => {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream as MediaStream,
    });

    peer.on('signal', (signal) => {
      console.log('Accepting signal:', signal);
      acceptCallMutation({ to: userId, signal });
    });

    peer.on('stream', (remoteStream) => {
      console.log('Received remote stream:', remoteStream);
      if (partnerAudio.current) {
        partnerAudio.current.srcObject = remoteStream;
      }
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    if (callerSignal) {
      peer.signal(callerSignal);
    }

    myPeer.current = peer;
  };

  const declineCall = async () => {
    setReceivingCall(false);
    setCallerSignal(null);
    declineCallMutation({ id: userId });

    // Stop the local stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <audio ref={userAudio} autoPlay muted />
      <audio ref={partnerAudio} autoPlay />
      <Button onClick={() => callUser(peerId)}>
        <Phone />
        Call
      </Button>
      {receivingCall && !callAccepted && (
        <div>
          <h1>Someone is calling...</h1>
          <Button onClick={acceptCall}>Accept</Button>
          <Button onClick={declineCall}>Decline</Button>
        </div>
      )}
    </div>
  );
};

export default AudioCall;
