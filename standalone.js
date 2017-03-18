WebAssembly.compile(new Uint8Array(`
  00 61 73 6d  01 00 00 00
  01 06 01 60  01 7f 01 7f
  03 02 01 00  07 0a 01 06
  73 71 75 61  72 65 00 00
  0a 0a 01 08  00 20 00 20
  00 6c 0f 0b`.trim().split(/[\s\r\n]+/g).map(str => parseInt(str, 16))
)).then(module => {
  const instance = new WebAssembly.Instance(module)
  const { square } = instance.exports

  console.log('2^2 =', square(2))
  console.log('3^2 =', square(3))
  console.log('(2 + 5)^2 =', square(2 + 5))
})

// (module
//   (export "square" (func $square))
//   (func $square (param $x i32) (result i32)
//     (return
//       (i32.mul
//         (get_local $x)
//         (get_local $x)
//       )
//     )
//   )
// )

// func (param i32) (result i32)
//   get_local 0
//   get_local 0
//   i32.mul
//   return
// end
