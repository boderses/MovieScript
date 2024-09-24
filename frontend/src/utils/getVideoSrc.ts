import desktopVideo from '../assets/video/movie-trailer.webm';
import tabletVideo from '../assets/video/movie-trailer.webm';
import mobileVideo from '../assets/video/movie-trailer.webm';

export const getVideoSrc = (width: number) => {
  if (width >= 1080) {
    return desktopVideo;
  }

  if (width >= 720) {
    return tabletVideo;
  }

  return mobileVideo;
};