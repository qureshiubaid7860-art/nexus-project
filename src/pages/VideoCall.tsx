import React, { useState, useRef } from "react";

function VideoCall() {
  // ✅ State variables
  const [callStarted, setCallStarted] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Video refs for future WebRTC integration
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // ✅ Button handlers
  const handleStartCall = () => setCallStarted(true);
  const handleEndCall = () => setCallStarted(false);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleAudio = () => setAudioEnabled(!audioEnabled);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📹 Video Meeting Room</h1>

      {/* Video Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Local Video */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="bg-black h-60 rounded-lg w-full"
        />
        {/* Remote Video */}
        <video
          ref={remoteVideoRef}
          autoPlay
          className="bg-black h-60 rounded-lg w-full"
        />
        <div className="bg-black h-60 rounded-lg"></div>
        <div className="bg-black h-60 rounded-lg"></div>
      </div>

      {/* ✅ Control Buttons */}
      <div className="flex gap-2">
        {!callStarted && (
          <button
            onClick={handleStartCall}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Start Call
          </button>
        )}

        {callStarted && (
          <>
            <button
              onClick={handleEndCall}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              End Call
            </button>

            <button
              onClick={toggleVideo}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {videoEnabled ? "Turn Video Off" : "Turn Video On"}
            </button>

            <button
              onClick={toggleAudio}
              className="bg-yellow-500 text-black px-4 py-2 rounded"
            >
              {audioEnabled ? "Mute" : "Unmute"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoCall;