(module
 (export "fib" (func $fib))
 (func $fibonacci (param $n i32) (param $a i32) (param $b i32) (result i32)
  (if
   (i32.le_s
    (get_local $n)
    (i32.const 2)
   )
   (return
    (get_local $b)
   )
  )
  (return
   (call $fibonacci
    (i32.sub
     (get_local $n)
     (i32.const 1)
    )
    (get_local $b)
    (i32.add
     (get_local $a)
     (get_local $b)
    )
   )
  )
 )
 (func $fib (param $n i32) (result i32)
  (return
   (call $fibonacci
    (get_local $n)
    (i32.const 1)
    (i32.const 1)
   )
  )
 )
)
