export const getMinutesSecondsFromMilliseconds = (ms: number) => {
    const totalSeconds = ms / 1000
    const seconds = String(Math.floor(totalSeconds % 60))
    const minutes = String(Math.floor(totalSeconds / 60))
  
    return minutes.padStart(1, '0') + ':' + seconds.padStart(2, '0')
  }
  