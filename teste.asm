L1: add $t0, $t2, $t3
L2: sub $t1, $t2, $t3
 beq $t0, $t1, L1
 j L2
 j L1
