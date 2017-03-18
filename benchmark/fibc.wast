(module
  (type (;0;) (func (param i32) (result i32)))
  (type (;1;) (func))
  (import "env" "memoryBase" (global (;0;) i32))
  (import "env" "memory" (memory (;0;) 256))
  (import "env" "table" (table (;0;) 0 anyfunc))
  (import "env" "tableBase" (global (;1;) i32))
  (func (;0;) (type 0) (param i32) (result i32)
    (local i32 i32)
    block i32  ;; label = @1
      get_local 0
      i32.const 2
      i32.lt_s
      if  ;; label = @2
        i32.const 1
        set_local 1
      else
        i32.const 1
        set_local 1
        loop  ;; label = @3
          get_local 0
          i32.const -1
          i32.add
          set_local 2
          get_local 0
          i32.const -2
          i32.add
          call 0
          get_local 1
          i32.add
          set_local 1
          get_local 0
          i32.const 3
          i32.ge_s
          if  ;; label = @4
            get_local 2
            set_local 0
            br 1 (;@3;)
          end
        end
      end
      get_local 1
    end)
  (func (;1;) (type 1)
    nop)
  (func (;2;) (type 1)
    block  ;; label = @1
      get_global 0
      set_global 2
      get_global 2
      i32.const 5242880
      i32.add
      set_global 3
      call 1
    end)
  (global (;2;) (mut i32) (i32.const 0))
  (global (;3;) (mut i32) (i32.const 0))
  (export "__post_instantiate" (func 2))
  (export "runPostSets" (func 1))
  (export "_fib" (func 0)))
