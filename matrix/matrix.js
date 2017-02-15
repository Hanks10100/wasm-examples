function () {
  const LENGTH = 2;

  function mul (A, B) {
    const C = new Float32Array(LENGTH * LENGTH)
    for (let i = 0; i < LENGTH; ++i) {
      for (let j = 0; j < LENGTH; ++j) {
        for (let k = 0; k < LENGTH; ++k) {
          C[i*LENGTH + j] += A[i*LENGTH + k] * B[j + k*LENGTH];
        }
      }
    }
    return C;
  }

  return { mul }
}
