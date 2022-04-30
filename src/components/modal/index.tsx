import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.sass';

type props = {trigger: JSX.Element, header?: string, content?: JSX.Element}

export const Modal = ({trigger, header='', content=<span></span>} : props) => {
  return (
    <Popup trigger={trigger} modal>
      {(close: () => void ) => {
        return (
          <div className='modal'>
            <button className="close" onClick={close}>
              &times;
            </button>
            <h2 className='modal__header'>{header}</h2>
            {content}
          </div>);
      }}
    </Popup>);
};
