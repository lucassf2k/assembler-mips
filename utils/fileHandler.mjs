import { open, writeFile } from 'node:fs/promises';

// função para ler o arquivo
async function read(filename) {
let fileHandle;
let usefulLines;

try {
     fileHandle = await open(filename, 'r');

     const file = await fileHandle.readFile({ encoding: 'utf-8' });
     
     usefulLines = file.split('\n').filter((line) => line.trim()); // tira as linhas que estão completamentes vazias

     fileHandle?.close();
     
} catch (err) {
     console.log(err);
     await fileHandle?.close();
}

return usefulLines; // retorna as linhas uteis
}

// função para salvar os dados no arquivo
async function write(filename, data) {
     try {
          await writeFile(filename, data);
     } catch (err) {
          console.log(err);
     }
}


 // colocar os labels com sua respecitiva linha em uma tabela
function getLabelsTable(usefulLines) {
     let labelsTable = [];

     //const fileFormated = usefulLines.filter((line) => line.trim());
     //console.log(fileFormated)
     // percorre as linhas já uteis que são as linhas que possuem instruções e sem linhas vazias
     usefulLines.forEach((line, index) => {
          // separa a linha por ':' assim obtemos label
          if (line.includes(':')) {
               labelsTable.push({
                    label: line.trim().split(' ')[0].split(':')[0], // no caso quando separa por ':' têm-se dois valores e o primeiro do array é o label
                    line: index, // guardando o index para saber qual a linha é esse label
               });
          } 
     });

     return labelsTable;
}

export { read, getLabelsTable, write };