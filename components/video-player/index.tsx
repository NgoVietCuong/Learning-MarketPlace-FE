import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  className: string;
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  aspectRatio: "16:9",
  controlBar: {
    volumePanel: {
      inline: false,
      volumeControl: {
        vertical: true
      }
    }
  },
};


const VideoPlayer: React.FC<IVideoPlayerProps> = ({ className, options }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        ...options,
        ...initialOptions
      }).ready(function() {

      });
    }

    // Cleanup the Video.js player on component unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div data-vjs-player className={className}>
      <video ref={videoRef} className="video-js vjs-big-play-centered video-js vjs-paused vjs-fluid vjs_video_3-dimensions vjs-controls-enabled vjs-workinghover vjs-v8 vjs-user-active vjs-layout-small" />
    </div> 
  );
};

export default VideoPlayer;
