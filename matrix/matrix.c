#define LENGTH 4

void mul (double *A, double *B) {
  int i, j, k;

  for (i = 0; i < LENGTH; ++i) {
    for (j = 0; j < LENGTH; ++j) {
      for (k = 0; k < LENGTH; ++k) {
        A[i*LENGTH + j] += A[i*LENGTH + k] * B[j + k*LENGTH];
      }
    }
  }
}

double det_n (double *A, int n) {
  int i,j,x,y;
  double determinant = 0;
  double M[n*n];

  if (n == 1) {
    determinant = A[0];
  } else if (n == 2) {
    determinant = A[0] * A[3] - A[1] * A[2];
  } else {
    determinant = 0;
    for (x = 0; x < n; x++) {
      for (i = 1; i < n; i++) {
        y = 0;
        for (j = 0; j < n; j++) {
          if (j == x) continue;
          M[(i-1)*(n-1) + y] = A[i*n + j];
          y++;
        }
      }
      determinant += ((x%2 == 0) ? 1 : -1) * A[x] * det_n(M, n-1);
    }
  }

  return (determinant);
}

double det (double * A) {
  return det_n(A, LENGTH);
}

double start() {
  double A[LENGTH*LENGTH] = { 2.1, 3.5, 0, -3.6, -4, 7.8, -1, 5, -4.7, 1.5, -3.2, 8.9, -0.31, 6.5, -9.7, 0.1 };
  double B[LENGTH*LENGTH] = { 0, -3.6, 4, 2.1, -3.5, 4.7, 3.2, -1.5,- 0.1, 8.9, -0.31, 6.5, 9.7, -7.8, 1, -5 };
  double C[LENGTH*LENGTH] = { -4, -4.7, 1.5, -2.1, -3.2, -8.9, -6.5, 9.7, 0.1, 0.31, -7.8, 1, 5, 3.5, 0, 3.6 };

  mul(A, B);
  mul(B, A);
  return det(A) + det(B);
}
