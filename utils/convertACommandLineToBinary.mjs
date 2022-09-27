import { instructionsFilteredByTypeI, instructionsFilteredByTypeR, instructionsFilteredByTypeJ } from './instructionsFiltereds.mjs';
import { registerTable } from '../data/instructions.mjs';
import * as convert from '../utils/baseConverter.mjs';

// função que executa a lógica para as instruções do tipo R
function convertACommandLineToBinaryForTypeR(line) {
  const arrayLine = line.split(' '); // separa os valores da linhas 
  const arrayLineFiltered = arrayLine.filter((item) => item.trim()); // tira espaços vazios da linha

  let operator; // será a instrução Ex: add

  // verifico de tem label pois se tiver o valor da instrução estar na posição 1 do array
  // se não tem label a instrução é a primeira posição 0
  if (haveLabels(arrayLineFiltered)) {
    operator = arrayLineFiltered[1];
  } else {
    operator = arrayLineFiltered[0]
  }
  const register = arrayLine.filter((item) => item.includes('$')); // verifica se na linha tem $ assim filtrando todos os registradores dessa linha

  // separo por instruções que possuem três registradores
 if (
  operator == 'add' || operator == 'addu' || operator == 'sub' ||
  operator == 'subu' || operator == 'and' || operator == 'or' ||
  operator == 'slt' || operator == 'sltu' || operator == 'mul'
) {

  // pega a instrução que corresponde ao operator entre todas as do tipo R
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0]; // do array retorna só tem um possível então estar na posição 0
  // separando por virgulas temos todos os registradores separados
  const regRD = register[0].split(',')[0]; // pego o primeiro
  const regRS = register[1].split(',')[0]; // pego o segundo
  const regRT = register[2].split(',')[0]; // pego o terceiro

  // retorno uma string com os dados já convertidos em binário
  // pego o op correspondente ao da instrução pelo nome da chave da instrução modelo filtrada acima
  // desta mesma forma pego o registrador correspondente a partir do registerModel lá do pasta data
  // assim como a funct correspondente
  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  // pego as instruções que tem dois registradores

  operator == 'mult' || operator == 'multu' || 
  operator == 'div' || operator == 'divu'
) {

  // segue a mesma lógica da de cima
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRS = register[0].split(',')[0]; // pego o primeiro registrador
  const regRT = register[1].split(',')[0]; // pego o segundo
  
  // retorno a string como a de cima
  // usando as funções da pasta data para pegar os valores de op e funct correspondetes pelo nome da chave do objeto
  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${registerTable[regRT], 5}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  operator == 'mfhi' || operator == 'mflo'
) {
  // os que tem um registrador
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRD = register[0].split(',')[0]; // pego o único registrador

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(instructionModel[operator].rs, 5)}${convert.toConvertDecToBin(instructionModel[operator].rt, 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(instructionModel[operator].shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (
  operator == 'sll' || operator == 'srl'
) {
  // pego os que tem dois registradores e uma constant
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRD = register[0].split(',')[0]; // pego o primeiro registrador
  const regRT = register[1].split(',')[0]; // pego o segundo registrador 
  const shamt = arrayLine[arrayLine.length - 1]; // pego o valor pelo index - 1 para pegar o último elemento do array

  // usando as instruções da pasta data como base para obter os opcode e funct correponde ao operator
  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRD], 5)}${convert.toConvertDecToBin(shamt, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else if (operator == 'jr') {

  // o que possui apenas um registrador
  const instruction = instructionsFilteredByTypeR.filter((item) => 
    operator === Object.keys(item)[0]
  );

  const instructionModel = instruction[0];
  const regRS = register[0]; // pego o único registrador da linhas

  return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(instructionModel[operator].funct, 6)}`;
} else {
  return 'ERRO';
}
}

function convertACommandLineToBinaryForTypeI(line, index, address, labels) {
  // repete a mesma lógica da função acime 
  // poderia até ser uma outra função em uma versão futura do projeto
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
    // separo pelas instruções que possuem dois registradores

    // mesma funcionalidade da de cima apenas que agora é os do tipo I
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    // com o filter retorna um array e como só poderá ter uma elemento dentro desse array ele estará na posição 0
    const instructionModel = instruction[0];

    // ao separa a linha por '$' os elementos que teram os registradores terão uma ','
    // então faço outro split para pegar apenas o registrador
    // as funções acima também faz isso
    const regRT = register[0].split(',')[0]; // pego o primeiro registrador
    const regRS = register[1].split(',')[0]; // pego o segundo registrador
    const immediate = arrayLine[arrayLine.length - 1]; // pego o immediate pela posição do array. como ele sempre é o último elemento então é o index - 1

    // usa as instruções da pasta data como modelo para pegar opcode correspondente ao operator pelo nome da chave
    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else if (
    operator == 'bne' || operator == 'beq'
  ) {

    // separa os que tem dois registradores e label
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0]; // pego o primeiro registrador
    const regRS = register[1].split(',')[0]; // pego o segundo registrador
    const immediate = arrayLine[arrayLine.length - 1]; // pego o immediate que aqui pode ser uma constante ou address

    // pego a label que foi anotada lá no arquivo main.mjs e guardada em um array
    // então pego a label que corresponde ao immediate dessa linha
    const label = labels.filter((item) => item.label === immediate)[0];

    // se for igual ele faz a lógica pelo do address
    // se não faz a lógica de uma constante
    if (immediate === label.label) {
      // pego o endereço atual fazer o endereçõ dessa linhas menos a quantidade de linhas que foram somadas
      // obtendo pelo index * 4 ex. 0 * 4 = 4 não andam nenhuma linha
      const addressInitial = Number(address) - (index * 4); 
      // para saber o endereço da linha do que contêm a declaração do label
      // faz-se o endereço inical + a linha do label * 4
      const addressLineLabel = addressInitial + (Number(label.line) * 4); 
      // o endereço atual é endereço inical mas o index * 4
      const currentAddress = addressInitial + (index * 4);
      // para o cálculo do beq e bne faz-se o endereço da linha aonde foi declarado - o endereçõ atual * 4 tudo isso dividido para 4
      const addressImmediate = (addressLineLabel - (currentAddress + 4)) / 4;

      // igual as outros retornos mostrados anteriormente
      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(addressImmediate, 16)}`;
    } else {
      // e se não for uma label 
      // pego o valor e coloca no immediate
      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
    }
  } else if (
    operator == 'lw' || operator == 'sw'
  ) {

    // separando em dois registradores e também porquê eles tem uma declaração diferente
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0]; // pego o primeiro registrador

    // como a declaração é 0(registrador). separo por '(' assim resultando em dois 
    // 0( outro elemento é $t0)
    const regRS = register[1].split('(')[1].split(')')[0]; // então separo por ')' sendo assim o primeiro elemento é o registraodr
    const immediate = register[1].split('(')[0] // já o immediate tamvé é o primeiro elemento
    
    // faz a mesma funcionalidade que as outras 
    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(registerTable[regRS], 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else if (operator == 'lui') {
    // separa o que tem um registrador
    const instruction = instructionsFilteredByTypeI.filter((item) => 
      operator === Object.keys(item)[0]
    ); 

    const instructionModel = instruction[0];
    const regRT = register[0].split(',')[0]; // pego o único registrador
    const immediate = arrayLine[arrayLine.length - 1]; // pego o immediate pela posição pelo fato de o último

    return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(0, 5)}${convert.toConvertDecToBin(registerTable[regRT], 5)}${convert.toConvertDecToBin(immediate, 16)}`;
  } else {
    return 'ERRO';
  }
}

function convertACommandLineToBinaryForTypeJ(line, index, address, labels) {
  // segue a mesma lógicas das anteriores
  const arrayLine = line.split(' ');
  const arrayLineFiltered = arrayLine.filter((item) => item.trim());

  let operator;
  if (haveLabels(arrayLineFiltered)) {
    operator = arrayLineFiltered[1];
  } else {
    operator = arrayLineFiltered[0]
  }

  if (operator == 'j' || operator == 'jal') {
    // separo as últimas instruções que só recebem o endereço
    const instruction = instructionsFilteredByTypeJ.filter((item) => 
      operator === Object.keys(item)[0]
    ); 
    const immediate = arrayLineFiltered[1]; // como só duas instruções o segunda 1 é a do immediate

    const label = labels.filter((item) => item.label === immediate)[0]; // pego a label correspondente

    const instructionModel = instruction[0];

    if (immediate === label.label) {
      // das mesma forma já mostrada acima pego o endereço atual e o da declaração do label
      const addressInitial = Number(address) - (index * 4);
      const addressLineLabel = addressInitial + Number(label.line) * 4;

      // e no final é o endereço da declaração da label dividido por 4
      const addressImmediate = addressLineLabel / 4;

      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(addressImmediate, 26)}`;
    } else {
      // se for só um número apenas o coloco no immediate
      const addressImmediate = immediate;
      return `${convert.toConvertDecToBin(instructionModel[operator].op, 6)}${convert.toConvertDecToBin(addressImmediate, 26)}`;
    }
  } 
}

// função que verifica se a linha é do tipo R
function isTypeR(instruction) {
  const line = instruction.split(' ');

  // a função some retorna true se no array tive pelo menos da comparação
  const isR = instructionsFilteredByTypeR.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isR;
}

// verifica se a linha é do tipo I
// mesma lógica anterior
function isTypeI(instruction) {
  const line = instruction.split(' ');

  const isI = instructionsFilteredByTypeI.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isI;
}

// verifica se a linha é do tipo J
// mesma lógica anterior
function isTypeJ(instruction) {
  const line = instruction.split(' ');

  const isJ = instructionsFilteredByTypeJ.some((item) => { 
   return line.some((itemLine) => itemLine === Object.keys(item)[0]);
  });

  return isJ;
}

// verifica se tem label em uma linha
// utilizando a função some
function haveLabels(line) {
  return line.some((item) => item.includes(':'));
}

// exportando para os outros arquivos poderem usá-las
export { 
  convertACommandLineToBinaryForTypeR,
  convertACommandLineToBinaryForTypeI,
  convertACommandLineToBinaryForTypeJ,
  isTypeR,
  isTypeI,
  isTypeJ
 }