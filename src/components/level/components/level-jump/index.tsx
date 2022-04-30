import React, {useState, useEffect} from 'react';
import { LevelHeader } from '../level-header';
import { Scene } from '../scene';
import Blockly from 'blockly';
import { createCustomBlocks } from '../../../../utils/custom-blocks';

createCustomBlocks();

const clueText = <span>
  Чемодан может двигаться только на 3 шага вправо, и на 2 влево.<br/>Сначала перемести его вправо, чтобы забрать Демимаску.<br/>Затем, вернись влево за Драконом.<br/>После этого перемещайся влево, пока не поймаешь Пикси.<br/>Чтобы забрать последнюю волшебную тварь, переместись вправо, затем влево.
</span>;

const maze = [
  [0, 0, 1, 2, 0, 0, 3, 0, 4, 0, 0],
];

const toolbox = {
  'kind': 'flyoutToolbox',
  'contents': [
    {
      'kind': 'block',
      'type': 'right3'
    },
    {
      'kind': 'block',
      'type': 'left2'
    },
  ]
};

const startPos = [0, 5];
const calibrate = [14, -1];
const heroSize = [4.5, 4.5];
const thingsSize = [4.5, 4.5];

const things = [
  {name: 'boompotam.png', pos: [0, 3], key: 2},
  {name: 'demimask.png', pos: [0, 8], key: 4},
  {name: 'docsy.png', pos: [0, 2], key: 1},
  {name: 'dragon.png', pos: [0, 6], key: 3},
];

let currentPosition = [...startPos];
let isStop = true;
let suitcase: {name: string; pos: number[]; key: number}[] = [];

export const LevelJump = () => {
  const [heroPosition, setHeroPosition] = useState(startPos);
  const [message, setMessage] = useState<JSX.Element>();
  const [workspace, setWorkspace] = useState<object>();
  const [thingsOnScene, setThingsOnScene] = useState([...things]);

  useEffect(() => {
    const workspace = Blockly.inject('blocklyDiv', {toolbox: toolbox});
    setWorkspace(workspace);
    const state = localStorage.getItem('78vcn');
    if (state) {
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(state), workspace);
    }
    workspace.addChangeListener(() => {
      const xml = Blockly.Xml.workspaceToDom(workspace);
      localStorage.setItem('78vcn', Blockly.Xml.domToText(xml));
    });
  }, []);

  const stepRight3 = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[1] >= maze[0].length - 3) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        
        currentPosition[1] += 3;
        setHeroPosition([...currentPosition]);
        isThing();
        res(true);
      }, 500);     
    });
  };

  const stepLeft2 = async () => {
    if (isStop) return;
    return new Promise((res) => {
      setTimeout(() => {
        if (currentPosition[1] <= 1) {
          console.log('Выход за пределы поля');
          setMessage(<span>Нам туда не надо :(</span>);
          stop();
          res(false);
          return;
        }
        currentPosition[1] -= 2;
        setHeroPosition([...currentPosition]);
        isThing();
        res(true);
      }, 500);     
    });
  };

  const isGoal = () => {
    if (suitcase.length === 4) {
      setMessage(<><div>Ура! Мы собрали всех волшебных тварей!</div><a className='level-b__scene-btn' href='https://quest.itgen.io/olimpiad/10ef7w7f4'>Дальше</a></>);
      return true;
    }
    return false;
  };

  const isThing = () => {
    if (maze[currentPosition[0]][currentPosition[1]] > 0) {
      const thing = things.find(el => el.key === maze[currentPosition[0]][currentPosition[1]]);
      if (!thing) return;
      suitcase.push(thing);
      setThingsOnScene(things.filter(el => !(suitcase.find(th => th.name === el.name))));
      isGoal();
      return true;
    }
    return false;
  };

  const reset = () => {
    setMessage(undefined);
    setHeroPosition([...startPos]);
    currentPosition = [...startPos];
    suitcase = [];
    setThingsOnScene([...things]);
  };

  const stop = () => {
    isStop = true;
    for(let i = 1; i < 1000; i++) {
      clearTimeout(i);
    }
  };

  return (
    <div className='level-b'>
      <audio id='level-jump-task' src='./sounds/level-jump-task.mp3'></audio>
      <audio id='level-jump-clue' src='./sounds/level-jump-clue.mp3'></audio>
      <div className='level-b__container'>
        <LevelHeader className='level-b' taskSound='level-jump-task' clueSound='level-jump-clue' clueText={clueText} />
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
                eval(`async function go() {${code}}; go();\n`);
              }}>
                <img className='level-b__control-btn-img' src="./img/play.png" alt="Play" />
              </button>
            </div>

            <div id="blocklyDiv" className='level-b__blockly-div' style={{height: '100%', width: '100%'}}></div>

          </div>
          <Scene maze={maze} hero='suitcase.png' heroSize={heroSize}background='level-jump-back.png' thingsSize={thingsSize} heroPosition={heroPosition} heroCalibrate={calibrate} things={thingsOnScene} thingsCalibrate={calibrate} message={message}/>
        </div>
      </div>
    </div>
  );
};
