#define LENGTH 4
#include <stdlib.h>

double* mul (double *A, double *B) {
  int i, j, k;
  double* C = malloc((LENGTH * LENGTH)*sizeof(double *));

  for (i = 0; i < LENGTH; ++i) {
    for (j = 0; j < LENGTH; ++j) {
      for (k = 0; k < LENGTH; ++k) {
        C[i*LENGTH + j] += A[i*LENGTH + k] * B[j + k*LENGTH];
      }
    }
  }

  return C;
}

double det(double *A, int n) {
  int i,j,j1,j2;
  double determinant = 0;
  double *M = NULL;

  if (n == 1) {
    determinant = A[0];
  } else if (n == 2) {
    determinant = A[0] * A[3] - A[1] * A[2];
  } else {
    determinant = 0;
    for (j1 = 0; j1 < n; j1++) {
      M = malloc((n-1)*(n-1)*sizeof(double *));
      for (i = 1; i < n; i++) {
        j2 = 0;
        for (j = 0; j < n; j++) {
          if (j == j1) continue;
          M[(i-1)*(n-1) + j2] = A[i*n + j];
          j2++;
        }
      }
      determinant += ((j1%2 == 0) ? 1 : -1) * A[j1] * det(M, n-1);
      free(M);
    }
  }

  return(determinant);
}
