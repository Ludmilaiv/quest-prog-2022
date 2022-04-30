import React, {useState, useEffect} from 'react';
import { LevelHeader } from '../level-header';
import { Scene } from '../scene';
import Blockly from 'blockly';
import { createCustomBlocks } from '../../../../utils/custom-blocks';

createCustomBlocks();

const clueText = <span>
  Нужна дверь коричневого цвета.<br/>Чтобы до неё дойти, пока справа свободно, двигайся вправо.<br/>Затем, 
  пока сверху свободно двигайся вверх.<br/>Далее, сделай один шаг влево, три шага вверх, и двигайся вправо, пока цель не будет достигнута.
</span>;

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 1],
  [1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 1],
  [1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 1],
  [1, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 2, 2, 2, 1],
  [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 1],
  [1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
  [1, 2, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1],
  [1, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
  [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'category',
      'name': 'Движение',
      'colour': '60',
      'cssConfig': {
        'container': 'blockly__category_1',
      },
      'contents': [
        {
          'kind': 'block',
          'type': 'right'
        },
        {
          'kind': 'block',
          'type': 'left'
        },
        {
          'kind': 'block',
          'type': 'up'
        },
        {
          'kind': 'block',
          'type': 'down'
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'Цикл',
      'colour': '0',
      'cssConfig': {
        'container': 'blockly__category_2',
      },
      'contents': [
        {
          'kind': 'block',
          'type': 'while_right_empty'
        },
        {
          'kind': 'block',
          'type': 'while_left_empty'
        },
        {
          'kind': 'block',
          'type': 'while_up_empty'
        },
        {
          'kind': 'block',
          'type': 'while_down_empty'
        },
        {
          'kind': 'block',
          'type': 'while_not_goal'
        },
      ]
    },
  ]
};

const startPos = [12, 0];
const calibrate = [-2, -0.3];

let currentPosition = [...startPos];
let isStop = true;
let loopLimit = 1000;

export const Level1 = () => {
  const [heroPosition, setHeroPosition] = useState(startPos);
  const [message, setMessage] = useState<JSX.Element>();
  const [workspace, setWorkspace] = useState<object>();

  useEffect(() => {
    const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
    setWorkspace(workspace);
    const state = localStorage.getItem('fd347');
    if (state) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(state), workspace);
    }
    workspace.addChangeListener(() => {
      const xml = Blockly.Xml.workspaceToDom(workspace);
      localStorage.setItem('fd347', Blockly.Xml.domToText(xml));
    });
  }, []);

  const stepRight = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[1] >= maze[0].length - 1) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        if (!rightEmpty()) {
          console.log('Стена');
          setMessage(<span>Ой, стена :(</span>);
          stop();
          res(false);
          return;
        } 
        currentPosition[1] += 1;
        setHeroPosition([...currentPosition]);
        isGoal();
        res(true);
      }, 500);     
    });
  };

  const stepLeft = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[1] <= 0) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        if (!leftEmpty()) {
          console.log('Стена');
          setMessage(<span>Ой, стена :(</span>);
          stop();
          res(false);
          return;
        } 
        currentPosition[1] -= 1;
        setHeroPosition([...currentPosition]);
        isGoal();
        res(true);
      }, 500);     
    });
  };

  const stepUp = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[0] <= 0) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        if (!upEmpty()) {
          console.log('Стена');
          setMessage(<span>Ой, стена :(</span>);
          stop();
          res(false);
          return;
        } 
        currentPosition[0] -= 1;
        setHeroPosition([...currentPosition]);
        isGoal();
        res(true);
      }, 500);     
    });
  };

  const stepDown = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[0] >= maze.length - 1) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        if (!downEmpty()) {
          console.log('Стена');
          setMessage(<span>Ой, стена :(</span>);
          stop();
          res(false);
          return;
        } 
        currentPosition[0] += 1;
        setHeroPosition([...currentPosition]);
        isGoal();
        res(true);
      }, 500);     
    });
  }; 

  const isGoal = () => {
    if (maze[currentPosition[0]][currentPosition[1]] === 3) {
      stop();
      setMessage(<><div>Ура! Мы нашли нужную дверь!</div><a className='level-b__scene-btn' href='https://quest.itgen.io/olimpiad/04euy6e5'>Дальше</a></>);
      return true;
    }
    if (maze[currentPosition[0]][currentPosition[1]] === 2) {
      stop();
      setMessage(<span>Не та дверь :(</span>);
      return true;
    }
    return false;
  };

  const rightEmpty = () => {
    return maze[currentPosition[0]][currentPosition[1] + 1] !== 1;
  };

  const leftEmpty = () => {
    return maze[currentPosition[0]][currentPosition[1] - 1] !== 1;
  };

  const upEmpty = () => {
    return maze[currentPosition[0] - 1][currentPosition[1]] !== 1;
  };

  const downEmpty = () => {
    return maze[currentPosition[0] + 1][currentPosition[1]] !== 1;
  };

  const reset = () => {
    setMessage(undefined);
    setHeroPosition([...startPos]);
    currentPosition = [...startPos];
  };

  const stop = () => {
    isStop = true;
    for(let i = 1; i < 1000; i++) {
      clearTimeout(i);
    }
  };

  return (
    <div className='level-b'>
      <audio id='level1-task' src='./sounds/level1-task.mp3'></audio>
      <audio id='level1-clue' src='./sounds/level1-clue.mp3'></audio>
      <div className='level-b__container'>
        <LevelHeader className='level-b' taskSound='level1-task' clueSound='level1-clue' clueText={clueText} />
        <div className='level-b__workspace-wrp'>
          <div className='level-b__workspace'>
            <div className='level-b__control'>
              <button className='level-b__control-btn' onClick={() => {stop(); reset();}}>
                <img className='level-b__control-btn-img' src="./img/return.png" alt="Вернуть" />
              </button>
              <button className='level-b__control-btn' onClick={() => {
                stop();
                reset();
                isStop = false;
                if (!workspace) return;
                const code = Blockly.JavaScript.workspaceToCode(workspace);
                loopLimit = 1000;
                eval(`async function go() {${code}}; go();\n`);
              }}>
                <img className='level-b__control-btn-img' src="./img/play.png" alt="Play" />
              </button>
            </div>

            <div id="blocklyDiv" className='level-b__blockly-div' style={{height: '100%', width: '100%'}}></div>

          </div>
          <Scene maze={maze} hero='hero1.png' background='level1-back.svg' heroPosition={heroPosition} heroCalibrate={calibrate} message={message}/>
        </div>
      </div>
    </div>
  );
};
