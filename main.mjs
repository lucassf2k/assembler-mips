// importações das funções 
import { question } from 'readline-sync'; 

import { getLabelsTable, read, write } from './utils/fileHandler.mjs'; 
import { 
  isTypeI, 
  isTypeJ, 
  isTypeR, 
  convertACommandLineToBinaryForTypeR,
  convertACommandLineToBinaryForTypeI,
  convertACommandLineToBinaryForTypeJ
} from './utils/convertACommandLineToBinary.mjs'; 
import * as convert from './utils/baseConverter.mjs'; 

// pega o nome do arquivo pelo terminal
const filename = question("Digite o nome do arquivo: ");


try {
  const file = await read(filename); // ler o arquivo que foi obtido pelo terminal

const labels = getLabelsTable(file); // pega todos os labels do arquivo

//console.log(labels)

let address = Number(convert.toConvertHexToDec('0x00400000')); // transforma o endereço inical em binário
let codeAsm = []; // array aonde será colocado todas as instruções já convertidas em binário 

// percorre todas as linhas do arquivo e separa por tipos e chama a função correspondente aquele tipo da instrução
file.forEach((line, index) => {
  //console.log(line)
  if (isTypeR(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeR(line)); // adiciona no array que será colocado no arquivo.bin
    address += 4; // soma mais 4 para obter a próxima linha do arquivo
  } else if (isTypeI(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeI(line, index, address, labels)); // adiciona no array que será colocado no arquivo.bin
    address += 4; // soma mais 4 para obter a próxima linha do arquivo
  } else if (isTypeJ(line)) {
    codeAsm.push(convertACommandLineToBinaryForTypeJ(line, index, address, labels)); // adiciona no array que será colocado no arquivo.bin
    address += 4; // soma mais 4 para obter a próxima linha do arquivo
  } else {
    console.log("Erro ao analisar o arquivo");
    console.log(line);
  }
});

const code  = codeAsm.map((line) => line.concat('\n')); // adiiona em cada linha um \n para quebrar a linha

const fileSaved = filename.split('.')[0].concat('.bin'); // pegar o nome do arquivo obtido pelo terminal e o coloca com o mesmo nome com a extensão .bin
await write(fileSaved, code); // salva o array das linhas já convetidas em binário em um arquivo .bin

} catch (err) {
  console.log(err);
}
