import { instructions } from '../data/instructions.mjs';

const instructionsFilteredByTypeI = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'I');

const instructionsFilteredByTypeR = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'R');

const instructionsFilteredByTypeJ = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'J');

export { 
  instructionsFilteredByTypeR,  
  instructionsFilteredByTypeI, 
  instructionsFilteredByTypeJ 
};