import { instructions } from '../data/instructions.mjs';

// são as instruções filtradas por tipo
const instructionsFilteredByTypeI = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'I'); // a função filter retorna o novo array com os dados que passam na condição

const instructionsFilteredByTypeR = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'R');

const instructionsFilteredByTypeJ = instructions
  .filter((instruction) => instruction[Object.keys(instruction)].type === 'J');

export { 
  instructionsFilteredByTypeR,  
  instructionsFilteredByTypeI, 
  instructionsFilteredByTypeJ 
};