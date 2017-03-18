(module
 (export "inc" (func $inc))
 (func $inc (param $x i32) (result i32)
  (return
   (i32.add
    (get_local $x)
    (i32.const 1)
   )
  )
 )
)
