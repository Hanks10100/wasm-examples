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

// double determinant(double **a, int n)
// {
//    int i,j,j1,j2;
//    double det = 0;
//    double **m = NULL;
//
//    if (n < 1) { /* Error */
//
//    } else if (n == 1) { /* Shouldn't get used */
//       det = a[0][0];
//    } else if (n == 2) {
//       det = a[0][0] * a[1][1] - a[1][0] * a[0][1];
//    } else {
//       det = 0;
//       for (j1=0;j1<n;j1++) {
//          m = malloc((n-1)*sizeof(double *));
//          for (i=0;i<n-1;i++)
//             m[i] = malloc((n-1)*sizeof(double));
//          for (i=1;i<n;i++) {
//             j2 = 0;
//             for (j=0;j<n;j++) {
//                if (j == j1)
//                   continue;
//                m[i-1][j2] = a[i][j];
//                j2++;
//             }
//          }
//          det += pow(-1.0,1.0+j1+1.0) * a[0][j1] * determinant(m, n-1);
//          for (i=0;i<n-1;i++)
//             free(m[i]);
//          free(m);
//       }
//    }
//    return(det);
// }
