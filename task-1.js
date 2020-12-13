console.log('task-1 run');

function factorial(n) {
   let incN = BigInt(n);
   let result = BigInt(1);
   while(incN) {
      result *= incN--;
   }
   return result;
}

function getNumOfFactorialEnsZero(n) {
   const fact = factorial(n);
   const zeroObj = /0+$/.exec(fact.toString());
   if (zeroObj) {
      return zeroObj[0].length;
   }
   return 0;
}

for (let i = 0; i < 501; i += 1) {
   console.log( i, factorial(i), getNumOfFactorialEnsZero(i) );
}