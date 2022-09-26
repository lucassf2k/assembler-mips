import { open, writeFile } from 'node:fs/promises';

async function readFile(filename) {
let fileHandle;
let usefulLines;

try {
     fileHandle = await open(filename, 'r');

     const file = await fileHandle.readFile({ encoding: 'utf-8' });
     
     usefulLines = file.split('\n').filter((line) => line.trim());

     fileHandle?.close();
     
} catch (err) {
     console.log(err);
     await fileHandle?.close();
}

return usefulLines;
}

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
     usefulLines.forEach((line, index) => {
          if (line.includes(':')) {
               labelsTable.push({
                    label: line.split(' ')[0].split(':')[0],
                    line: index,
               });
          } 
     });

     return labelsTable;
}

export { readFile, getLabelsTable, write };