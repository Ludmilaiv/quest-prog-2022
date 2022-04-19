import React, {useEffect, useState} from 'react';

type props = {maze: number[][]; hero: string; heroPosition: number[]; background: string, calibrate: number[], message: JSX.Element | undefined};

export const Scene = ({maze, hero, background, heroPosition, calibrate, message}: props) => {
  const [absolutePos, setAbsolutePos] = useState(['0', '0']);

  useEffect(() => {
    const yPos = (29.7 / maze.length * heroPosition[0] + calibrate[0]).toFixed(4);
    const xPos = (29.7 / maze[0].length * heroPosition[1] + calibrate[1]).toFixed(4);
    setAbsolutePos([yPos + 'rem', xPos + 'rem']);
  }, [heroPosition]);

  return (
    <div className='level-b__scene' style={{backgroundImage: `url("./img/${background}")`}}>
      <div className='level-b__hero' id='hero' style={{backgroundImage: `url("./img/${hero}")`, top: absolutePos[0], left: absolutePos[1]}}></div>
      {!!message && <div className='level-b__message'>{message}</div>}
    </div>
  );
};