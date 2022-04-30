import React from 'react';
import { playSound } from '../../../../utils';
import { Modal } from '../../../modal';
import { Clue } from '../clue';

type props = {className: string; clueText?: JSX.Element; clueSound?: string; taskSound?: string};

export const LevelHeader = ({className, clueText, clueSound, taskSound}: props) => {

  const playTask = () => {
    if (!taskSound) return;
    playSound(taskSound);
  };

  const playClue = () => {
    if (!clueSound) return;
    playSound(clueSound);
  };

  const buttonTask = <button className={className + '__button'} type='button' onClick={playTask}>
    <img className={className + '__button-img'} src='./img/sound.png' alt='Задание' />
    <span>Задание</span>
  </button>;

  const buttonClue = <button className={className + '__button'} type='button'>
    <img className={className + '__button-img'} src='./img/question.png' alt='Подсказка' />
  </button>;

  return (
    <div className={className + '__header'}>
      {buttonTask}
      <Modal trigger={buttonClue} header='Подсказка' content={<Clue clueText={clueText} playClue={playClue}/>}/>      
    </div>  
  );
};