import React, { useEffect } from 'react';

type props = {clueText?: JSX.Element; playClue: () => void};

export const Clue= ({clueText, playClue}: props) => {

  useEffect(() => {
    playClue();
  }, []);

  return (
    <div className='modal__flex-container'>
      <button className='modal__button' onClick={() => playClue()}>
        <img className='modal__button-img' src="./img/sound.png" alt="Читать" />
      </button>
      {clueText} 
    </div>  
  );
};