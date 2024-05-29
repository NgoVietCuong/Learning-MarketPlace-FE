import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  options: videojs.PlayerOptions
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options }) => {
  const videoRef = useRef<HTMLVideoElement>();
  const playerRef = useRef<videojs.Player>();

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    if (!playerRef.current) {
      const videoJsOptions: VideoJsPlayerOptions = {
        autoplay: false,
        controls: true,
        sources: [{
          type: 'application/x-mpegURL',
        }],
        fluid: true,
      };

      playerRef.current = videojs(videoElement, videoJsOptions);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>
    </div>
  );
};

export default VideoPlayer;
