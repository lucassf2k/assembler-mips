	L1: add $t1,$t2,$t3
	L2:	sub $t1,$t2,$t3
		addi $t1,$t2,100
		addu $t1,$t2,$t3
		subu $t1,$t2,$t3
		addiu $t1,$t2,100
		mul $t1,$t2,$t3
		mult $t2,$t3
		multu $t2,$t3
		div $t2,$t3
		and $t1,$t2,$t3
		or $t1,$t2,$t3
		andi $t1,$t2,100
		or $t1,$t2,100
		sll $t1,$t2,10
		srl $t1,$t2,10
		lw $t1,100($t2)
		sw $t1,100($t2)
		lui $t1,100
		mfhi $t2
		mflo $t2
	L3:	beq $t1,$t2,L1
	 	bne $t1,$t2,L2
		slt $t1,$t2,$t3
		slti $t1,$t2,100
		j L1
		jr $t1
		jal L3
