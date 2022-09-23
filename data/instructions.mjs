const instructions = [
   { sll: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 3, funct: 0 } },
   { slr: { type: 'R', op: 0, rs: 0, rt: 10, rd: 8, shamt: 3, funct: 2 } },
   { jr: { type: 'R', op: 0, rs: 8, rt: 0, rd: 0, shamt: 0, funct: 8 } },
   { mfhi: { type: 'R', op: 0, rs: 0, rt: 0, rd: 8, shamt: 0, funct: 16 } },
   { mflo: { type: 'R', op: 0, rs: 0, rt: 0, rd: 8, shamt: 0, funct: 18 }},
   { mult: { type: 'R', op: 0, rs: 9, rt: 10, rd: 0, shamt: 0, funct: 24 } },
   { multu: { type: 'R', op: 0, rs: 9, rt: 10, rd: 0, shamt: 0, funct: 25 } },
   { div: { type: 'R', op: 0, rs: 9, rt: 10, rd: 0, shamt: 0, funct: 26 } },
   { divu: { type: 'R', op: 0, rs: 9, rt: 10, rd: 0, shamt: 0, funct: 27 } },
   { add: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 32 } },
   { addu: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 33 } },
   { sub: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 34 } },
   { subu: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 35 } },
   { and: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 36 } },
   { or: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 37 } },
   { slt: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 42 } },
   { sltu: { type: 'R', op: 0, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 43 } },
   { mul: { type: 'R', op: 28, rs: 9, rt: 10, rd: 8, shamt: 0, funct: 2 } },
   { beq: { type: 'I', op: 4, rs: 8, rt: 9, immediate: 3 } },
   { bne: { type: 'I', op: 5, rs: 8, rt: 9, immediate: 3 } },
   { addi: { type: 'I', op: 8, rs: 8, rt: 9, immediate: 3 } },
   { addiu: { type: 'I', op: 9, rs: 9, rt: 8, immediate: 3 } },
   { slti: { type: 'I', op: 10, rs: 9, rt: 8, immediate: 3 } },
   { sltiu: { type: 'I', op: 11, rs: 9, rt: 8, immediate: 3 } },
   { andi: { type: 'I', op: 12, rs: 9, rt: 8, immediate: 3 } },
   { ori: { type: 'I', op: 13, rs: 9, rt: 8, immediate: 3 } },
   { lui: { type: 'I', op: 15, rs: 0, rt: 8, immediate: 3 } },
   { lw: { type: 'I', op: 35, rs: 9, rt: 8, immediate: 4 } },
   { sw: { type: 'I', op: 43, rs: 9, rt: 8, immediate: 4 } },
   { j: { type: 'J', op: 2, address: 1000 } },
   { jal: { type: 'J', op: 3, address: 1000 } },
];

const registerTable = {
   
}

export { instructions };