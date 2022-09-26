import { instructionsFilteredByTypeI, instructionsFilteredByTypeR, instructionsFilteredByTypeJ } from './instructionsFiltereds.mjs';
import { instructions, registerTable } from '../data/instructions.mjs';
import * as convert from '../utils/baseConverter.mjs';

function convertACommandLineToBinaryForTypeR(line) {
  const arrayLine = line.split(' ');
  const arrayLineFiltered = arrayLine.filter((item) => item.trim());

  let operator;
  if (haveLabels(arrayLineFiltered)) {
    operator = arrayLineFiltered[1];
  } else {
    operator = arrayLineFiltered[0]
  }
  const register = arrayLine.filter((item) => item.includes('$'));

 if (
  operator == 'add' || operator == 'addu' || operator == 'sub' ||
  operator == 'subu' || operator == 'and' || operator == 'or' ||
  operator == 'slt' || operator == 'sltu' || operator == 'mul'
) {
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRD = register[0].split(',')[0];
  const regRS = register[1].split(',')[0];
  const regRT = register[2].split(',')[0];

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  operator == 'mult' || operator == 'multu' || 
  operator == 'div' || operator == 'divu'
) {
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRS = register[0].split(',')[0];
  const regRT = register[1].split(',')[0];
  
  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${registerTable[regRT], 5}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  operator == 'mfhi' || operator == 'mflo'
) {
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRD = register[0].split(',')[0];

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(instructionModel[operator].rs, 5)}${convert.toConvertDecToBin(instructionModel[operator].rt, 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  operator == 'sll' || operator == 'srl'
) {
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRD = register[0].split(',')[0];
  const regRT = register[1].split(',')[0];
  const shamt = arrayLine[arrayLine.length - 1];

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (operator == 'jr') {
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRS = register[0];

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else {
  return 'ERRO';
}
}

function convertACommandLineToBinaryForTypeI(line, index, address, labels) {
  const arrayLine = line.split(' ');
  const arrayLineFiltered = arrayLine.filter((item) => item.trim());

  let operator;
  if (haveLabels(arrayLineFiltered)) {
    operator = arrayLineFiltered[1];
  } else {
    operator = arrayLineFiltered[0]
  }
  const register = arrayLine.filter((item) => item.includes('$'));

  if (
    operator == 'addi' || operator == 'addiu' || operator == 'slti' ||
    operator == 'sltiu' || operator == 'andi' || operator == 'ori'
  ) {
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0];
    const regRS = register[1].split(',')[0];
    const immediate = arrayLine[arrayLine.length - 1];

    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else if (
    operator == 'bne' || operator == 'beq'
  ) {
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0];
    const regRS = register[1].split(',')[0];
    const immediate = arrayLine[arrayLine.length - 1];

    const label = labels.filter((item) => item.label === immediate)[0];

    if (immediate === label.label) {
      const addressInitial = Number(address) - (index * 4);
      const addressLineLabel = addressInitial + (Number(label.line) * 4);
      const currentAddress = addressInitial + (index * 4);
      const addressImmediate = (addressLineLabel - (currentAddress + 4)) / 4;

      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(addressImmediate, 16)}`;
    } else {
      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
    }
  } else if (
    operator == 'lw' || operator == 'sw'
  ) {
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0];
    const regRS = register[1].split('(')[1].split(')')[0];
    const immediate = register[1].split('(')[0]
    
    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else if (operator == 'lui') {
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0];
    const immediate = arrayLine[arrayLine.length - 1];

    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else {
    return 'ERRO';
  }
}

function convertACommandLineToBinaryForTypeJ(line, index, address, labels) {
  const arrayLine = line.split(' ');
  const arrayLineFiltered = arrayLine.filter((item) => item.trim());

  let operator;
  if (haveLabels(arrayLineFiltered)) {
    operator = arrayLineFiltered[1];
  } else {
    operator = arrayLineFiltered[0]
  }

  if (operator == 'j' || operator == 'jal') {
    const instruction = instructionsFilteredByTypeJ.filter((item) => 
      operator === Object.keys(item)[0]
    ); 
    const immediate = arrayLineFiltered[1];

    const label = labels.filter((item) => item.label === immediate)[0];

    const instructionModel = instruction[0];

    if (immediate === label.label) {
      const addressInitial = Number(address) - (index * 4);
      const addressLineLabel = addressInitial + Number(label.line) * 4;
      const addressImmediate = addressLineLabel / 4;

      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(addressImmediate, 26)}`;
    } else {
      const addressImmediate = immediate;
      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(addressImmediate, 26)}`;
    }
  } 
}

function isTypeR(instruction) {
  const line = instruction.split(' ');

  const isR = instructionsFilteredByTypeR.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isR;
}

function isTypeI(instruction) {
  const line = instruction.split(' ');

  const isI = instructionsFilteredByTypeI.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isI;
}

function isTypeJ(instruction) {
  const line = instruction.split(' ');

  const isJ = instructionsFilteredByTypeJ.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isJ;
}

function haveLabels(line) {
  return line.some((item) => item.includes(':'));
}

export { 
  convertACommandLineToBinaryForTypeR,
  convertACommandLineToBinaryForTypeI,
  convertACommandLineToBinaryForTypeJ,
  isTypeR,
  isTypeI,
  isTypeJ
 }