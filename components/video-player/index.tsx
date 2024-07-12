import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Response } from '@/types/response';
import { LessonProgressDetails } from '@/types/schema';

interface IVideoPlayerProps {
  className: string;
  options: videojs.PlayerOptions;
  lessonProgress?: Response<LessonProgressDetails>;
  apiHandler?: (progress: number) => Promise<void>;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  aspectRatio: '16:9',
  fill: true,
  controlBar: {
    volumePanel: {
      inline: false,
      volumeControl: {
        vertical: true,
      },
    },
    durationDisplay: true,
    currentTimeDisplay: true,
    remainingTimeDisplay: false,
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ className, options, lessonProgress, apiHandler }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const handleRouteChangeRef = useRef<() => void>();

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    if (!playerRef.current) {
      playerRef.current = videojs(videoElement, {
        ...options,
        ...initialOptions,
      }).ready(function () {
        const player = this as videojs.Player;

        if (apiHandler) {
          player.on('ready', function() {
            const contentProgress = lessonProgress?.data?.lessonProgress ? lessonProgress?.data?.lessonProgress?.contentProgress as number : 0;
            const duration = lessonProgress?.data?.duration as number;
            const startTime = (contentProgress * 1.0 / 100) * duration;
            player.currentTime(startTime);
          });

          const handleUpdateTime = async () => {
            const currentTime = player.currentTime() || 0;
            const durationTime = player.duration() || 0;

            const percentageTime = Math.round((currentTime / durationTime) * 100);
            if (percentageTime >= 80) {
              if (!lessonProgress?.data?.lessonProgress || !lessonProgress.data.lessonProgress.isCompleted) {
                setTimeout(async () => {
                  await apiHandler(percentageTime);
                  player.off('timeupdate');
                }, 400);
              }
            }
          };

          const handleUpdateProgress = async () => {
            const currentTime = player.currentTime() || 0;
            const durationTime = player.duration() || 0;
            const percentageTime = Math.round((currentTime / durationTime) * 100);
            setTimeout(async () => {
              await apiHandler(percentageTime);
            }, 200)
          };

          const handleRouteChange = async () => {
            const currentTime = player.currentTime() || 0;
            const durationTime = player.duration() || 0;
            const percentageTime = Math.round((currentTime / durationTime) * 100);
            setTimeout(async () => {
              await apiHandler(percentageTime);
            }, 100)
          }

          handleRouteChangeRef.current = handleRouteChange;

          player.on('play', () => {
            player.on('timeupdate', handleUpdateTime);
            router.events.on('routeChangeStart', handleRouteChangeRef.current!);
            window.addEventListener('beforeunload', handleRouteChangeRef.current!);
          });

          player.on('pause', async () => {
            player.off('timeupdate', handleUpdateTime);
            await handleUpdateProgress();
          });

          player.on('ended', async () => {
            player.off('timeupdate', handleUpdateTime);
            await handleUpdateProgress();
          });
        }
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current = null;
        }
        router.events.off('routeChangeStart', handleRouteChangeRef.current!);
        window.removeEventListener('beforeunload', handleRouteChangeRef.current!);
      }
    }
  }, [options, router.events]);

  return (
    <div data-vjs-player className={className}>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered video-js vjs-paused vjs-fluid vjs_video_3-dimensions vjs-controls-enabled vjs-workinghover vjs-v8 vjs-user-active"
      />
    </div>
  );
};

export default VideoPlayer;
