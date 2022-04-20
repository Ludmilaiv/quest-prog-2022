import React, {useEffect, useState} from 'react';

type props = {maze: number[][]; hero: string; heroPosition: number[]; background: string, calibrate: number[], message: JSX.Element | undefined, heroSize?: number[], things?: {name: string, pos: number[], key: number}[]};

export const Scene = ({maze, hero, background, heroPosition, calibrate, message, heroSize, things}: props) => {
  const [absolutePos, setAbsolutePos] = useState(['0', '0']);

  useEffect(() => {
    const yPos = (29.7 / maze.length * heroPosition[0] + calibrate[0]).toFixed(4);
    const xPos = (29.7 / maze[0].length * heroPosition[1] + calibrate[1]).toFixed(4);
    setAbsolutePos([yPos + 'rem', xPos + 'rem']);
  }, [heroPosition]);

  return (
    <div className='level-b__scene' style={{backgroundImage: `url("./img/${background}")`}}>
      <div className='level-b__hero' id='hero' style={{backgroundImage: `url("./img/${hero}")`, top: absolutePos[0], left: absolutePos[1], width: heroSize ? `${heroSize[1]}rem` : '', height: heroSize ? `${heroSize[0]}rem` : ''}}></div>
      {!!message && <div className='level-b__message'>{message}</div>}
      {things?.map(thing => {
        const yPos = (29.7 / maze.length * thing.pos[0] + calibrate[0]).toFixed(4);
        const xPos = (29.7 / maze[0].length * thing.pos[1] + calibrate[1]).toFixed(4);
        return <div key={thing.key} className='level-b__hero' style={{backgroundImage: `url("./img/${thing.name}")`, top: yPos + 'rem', left: xPos + 'rem', width: heroSize ? `${heroSize[1]}rem` : '', height: heroSize ? `${heroSize[0]}rem` : ''}}></div>;
      })}
    </div>
  );
};