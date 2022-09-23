import { instructionsFilteredByTypeI, instructionsFilteredByTypeR, instructionsFilteredByTypeJ } from './instructionsFiltereds.mjs';

function convertACommandLineToBinaryForTypeR({ 
  type = 'R', 
  op = 10, 
  rs, 
  rt, 
  rd, 
  shamt, 
  funct 
}) {}

function convertACommandLineToBinaryForTypeI({ 
  type = 'I', 
  op, 
  rs, 
  rt, 
  immediate 
}) {}

function convertACommandLineToBinaryForTypeJ({ 
  type = 'J', 
  op, 
  address = 1000 
}) {}

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

export { 
  convertACommandLineToBinaryForTypeR,
  convertACommandLineToBinaryForTypeI,
  convertACommandLineToBinaryForTypeJ,
  isTypeR,
  isTypeI,
  isTypeJ
 }