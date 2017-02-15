function () {
  const LENGTH = 2;

  function mul (A, B) {
    for (let i = 0; i < LENGTH; ++i) {
      for (let j = 0; j < LENGTH; ++j) {
        for (let k = 0; k < LENGTH; ++k) {
          A[i*LENGTH + j] += A[i*LENGTH + k] * B[j + k*LENGTH];
        }
      }
    }
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

  function start() {
    const A = new Float32Array([ 2.1, 3.5, 0, -3.6, -4, 7.8, -1, 5, -4.7, 1.5, -3.2, 8.9, -0.31, 6.5, -9.7, 0.1 ]);
    const B = new Float32Array([ 0, -3.6, 4, 2.1, -3.5, 4.7, 3.2, -1.5,- 0.1, 8.9, -0.31, 6.5, 9.7, -7.8, 1, -5 ]);
    const C = new Float32Array([ -4, -4.7, 1.5, -2.1, -3.2, -8.9, -6.5, 9.7, 0.1, 0.31, -7.8, 1, 5, 3.5, 0, 3.6 ]);

    mul(A, B)
    mul(B, A)
    return det(A) + det(B)
  }

  return { start }
}
