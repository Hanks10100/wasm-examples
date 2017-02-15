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

  function det (A, n = LENGTH) {
    let determinant = 0

    if (n == 1) {
      determinant = A[0]
    } else if (n == 2) {
      determinant = A[0] * A[3] - A[1] * A[2]
    } else {
      determinant = 0
      for (let x = 0; x < n; x++) {
        const M = new Float32Array((n-1)*(n-1))
        for (let i = 1; i < n; i++) {
          let y = 0
          for (let j = 0; j < n; j++) {
            if (j == x) continue
            M[(i-1)*(n-1) + y] = A[i*n + j]
            y++
          }
        }
        determinant += ((x%2 == 0) ? 1 : -1) * A[x] * det(M, n-1)
      }
    }

    return determinant
  }

  return { mul, det }
}
