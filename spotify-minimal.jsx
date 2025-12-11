/**
 * Spotify Minimal Widget for Übersicht
 *
 * 설치 방법:
 * 1. Übersicht 설치: https://tracesof.net/uebersicht/
 * 2. 이 파일을 ~/Library/Application Support/Übersicht/widgets/ 에 복사
 *
 * 위치 변경:
 * - 아래 className에서 bottom/right 값을 변경하세요
 * - 예: 좌측 상단 = { top: 40, left: 20 }
 * - 예: 우측 상단 = { top: 40, right: 20 }
 * - 예: 좌측 하단 = { bottom: 20, left: 20 }
 */

import { css, run } from "uebersicht";

// 1초마다 업데이트
export const refreshFrequency = 1000;

// Spotify 정보 가져오기
export const command = `osascript -e '
tell application "System Events"
  if not (exists process "Spotify") then
    return "NOT_RUNNING"
  end if
end tell
tell application "Spotify"
  if player state is stopped then
    return "STOPPED"
  end if
  set trackName to name of current track
  set artistName to artist of current track
  set albumArt to artwork url of current track
  set playerState to player state as string
  return trackName & "|||" & artistName & "|||" & albumArt & "|||" & playerState
end tell'`;

// 컨트롤 함수들
const playPause = () => run(`osascript -e 'tell application "Spotify" to playpause'`);
const prevTrack = () => run(`osascript -e 'tell application "Spotify" to previous track'`);
const nextTrack = () => run(`osascript -e 'tell application "Spotify" to next track'`);

// 글래스모피즘 스타일
export const className = css`
  position: absolute;
  bottom: 20px;
  right: 20px;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: white;

  * {
    box-sizing: border-box;
  }
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;

  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  min-width: 260px;
`;

const albumArtStyle = css`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const infoContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const trackNameStyle = css`
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffffff;
`;

const artistNameStyle = css`
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.7);
`;

const controlsStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const buttonStyle = css`
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: white;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const playButtonStyle = css`
  ${buttonStyle};
  width: 36px;
  height: 36px;
  background: #1DB954;

  &:hover {
    background: #1ed760;
  }
`;

const notRunningStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;

  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;

  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
`;

const spotifyIconStyle = css`
  width: 24px;
  height: 24px;
  color: #1DB954;
`;

// SVG 아이콘 컴포넌트
const PrevIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7L8 5z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const NextIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zm2 0V6l6.5 6L8 18zm8-12v12h2V6h-2z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg className={spotifyIconStyle} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// 메인 렌더 함수
export const render = ({ output }) => {
  // Spotify가 실행 중이 아닐 때
  if (!output || output.trim() === "NOT_RUNNING" || output.trim() === "STOPPED") {
    return (
      <div className={notRunningStyle}>
        <SpotifyIcon />
        <span>Spotify를 실행하세요</span>
      </div>
    );
  }

  // 데이터 파싱
  const parts = output.trim().split("|||");
  if (parts.length < 4) {
    return (
      <div className={notRunningStyle}>
        <SpotifyIcon />
        <span>재생 중인 곡이 없습니다</span>
      </div>
    );
  }

  const [trackName, artistName, albumArt, playerState] = parts;
  const isPlaying = playerState === "playing";

  return (
    <div className={containerStyle}>
      <img
        src={albumArt}
        alt="Album Art"
        className={albumArtStyle}
      />
      <div className={infoContainerStyle}>
        <div className={trackNameStyle} title={trackName}>
          {trackName}
        </div>
        <div className={artistNameStyle} title={artistName}>
          {artistName}
        </div>
        <div className={controlsStyle}>
          <button className={buttonStyle} onClick={prevTrack}>
            <PrevIcon />
          </button>
          <button className={playButtonStyle} onClick={playPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className={buttonStyle} onClick={nextTrack}>
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
