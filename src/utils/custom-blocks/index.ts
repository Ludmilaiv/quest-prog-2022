import Blockly from 'blockly';

export const createCustomBlocks = () => {

  Blockly.Blocks['right'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Вправо')
        .appendField(new Blockly.FieldImage('img/arrow-right.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['right'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepRight();\n';
    return code;
  };

  Blockly.Blocks['left'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Влево')
        .appendField(new Blockly.FieldImage('img/arrow-left.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['left'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepLeft();\n';
    return code;
  };

  Blockly.Blocks['up'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Вверх')
        .appendField(new Blockly.FieldImage('img/arrow-up.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['up'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepUp();\n';
    return code;
  };

  Blockly.Blocks['down'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Вниз')
        .appendField(new Blockly.FieldImage('img/arrow-down.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['down'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepDown();\n';
    return code;
  };

  Blockly.Blocks['while_right_empty'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Пока справа свободно')
        .appendField(new Blockly.FieldImage('img/arrow-right.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.appendStatementInput('loop_body')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['while_right_empty'] = function(block: unknown) {
    const statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');
    // TODO: Assemble JavaScript into code variable.
    const code = `while(rightEmpty()) {if (--loopLimit <= 0) break; ${statements_loop_body}}\n`;
    return code;
  };

  Blockly.Blocks['while_left_empty'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Пока слева свободно')
        .appendField(new Blockly.FieldImage('img/arrow-left.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.appendStatementInput('loop_body')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['while_left_empty'] = function(block: unknown) {
    const statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');
    // TODO: Assemble JavaScript into code variable.
    const code = `while(leftEmpty()) {if (--loopLimit <= 0) break; ${statements_loop_body}}\n`;
    return code;
  };

  Blockly.Blocks['while_up_empty'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Пока сверху свободно')
        .appendField(new Blockly.FieldImage('img/arrow-up.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.appendStatementInput('loop_body')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['while_up_empty'] = function(block: unknown) {
    const statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');
    // TODO: Assemble JavaScript into code variable.
    const code = `while(upEmpty()) {if (--loopLimit <= 0) break; ${statements_loop_body}}\n`;
    return code;
  };

  Blockly.Blocks['while_down_empty'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Пока снизу свободно')
        .appendField(new Blockly.FieldImage('img/arrow-down.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.appendStatementInput('loop_body')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['while_down_empty'] = function(block: unknown) {
    const statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');
    // TODO: Assemble JavaScript into code variable.
    const code = `while(downEmpty()) {if (--loopLimit <= 0) break; ${statements_loop_body}}\n`;
    return code;
  };

  Blockly.Blocks['while_not_goal'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Пока цель не достигнута')
        .appendField(new Blockly.FieldImage('img/goal.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.appendStatementInput('loop_body')
        .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['while_not_goal'] = function(block: unknown) {
    const statements_loop_body = Blockly.JavaScript.statementToCode(block, 'loop_body');
    // TODO: Assemble JavaScript into code variable.
    const code = `while(!isGoal()) {if (--loopLimit <= 0) break; ${statements_loop_body}}\n`;
    return code;
  };

  Blockly.Blocks['right3'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Вправо 3 шага')
        .appendField(new Blockly.FieldImage('img/arrow-right.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['right3'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepRight3();\n';
    return code;
  };

  Blockly.Blocks['left2'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('Влево 2 шага')
        .appendField(new Blockly.FieldImage('img/arrow-left.png', 15, 15, { alt: '*', flipRtl: 'FALSE' }));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.JavaScript['left2'] = function() {
    // TODO: Assemble JavaScript into code variable.
    const code = 'await stepLeft2();\n';
    return code;
  };
};

