import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
  className: string;
  options: videojs.PlayerOptions;
}

const breakpoints = {
  tiny: 210,
  xsmall: 320,
  small: 425,
  medium: 768,
  large: 1440,
  xlarge: 2560
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  aspectRatio: "16:9",
  fill: true,
  controlBar: {
    volumePanel: {
      inline: false,
      volumeControl: {
        vertical: true
      }
    },
    durationDisplay: true,
    currentTimeDisplay: true,
  },
  breakpoints: breakpoints
};

const checkAndSetLayoutClass = (player: videojs.Player) => {
  const width = player.currentWidth();

  let layoutClass = 'vjs-layout-large';

  if (width < breakpoints.tiny) layoutClass = 'vjs-layout-tiny';
  else if (width < breakpoints.xsmall) layoutClass = 'vjs-layout-xsmall';
  else if (width < breakpoints.small) layoutClass = 'vjs-layout-small';
  else if (width < breakpoints.medium) layoutClass = 'vjs-layout-medium';
  else if (width < breakpoints.large) layoutClass = 'vjs-layout-large';
  else if (width < breakpoints.xlarge) layoutClass = 'vjs-layout-xlarge';

  const classList = player.el().classList;
  classList.forEach(className => {
    if (className.startsWith('vjs-layout-')) {
      classList.remove(className);
    }
  });

  classList.add(layoutClass);
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
        checkAndSetLayoutClass(this);
      });      
    }

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
