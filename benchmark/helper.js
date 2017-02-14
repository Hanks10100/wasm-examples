function loadWebAssembly (url, imports = {}) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => WebAssembly.compile(buffer))
    .then(module => {
      imports.env = imports.env || {}
      imports.env.memoryBase = imports.env.memoryBase || 0
      imports.env.tableBase = imports.env.tableBase || 0
      if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({ initial: 256 })
      }
      if (!imports.env.table) {
        // In the MVP, the only valid element type is "anyfunc"
        imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
      }
      return new WebAssembly.Instance(module, imports)
    })
}

function loadAsmJS (url, imports = {}) {
  return fetch(url)
    .then(response => response.text())
    .then(code => new Function('imports', `return (${code})()`))
    .then(factory => ({ exports: factory(imports) }))
}


function createTable (result) {
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  let hasHead = false
  result.forEach(group => {
    if (!hasHead) {
      const row = document.createElement('tr')
      Object.keys(group).forEach(key => {
        const th = document.createElement('th')
        th.innerHTML = key
        row.appendChild(th)
      })
      thead.appendChild(row)
      hasHead = true
    }

    const tr = document.createElement('tr')
    Object.keys(group).forEach(key => {
      const td = document.createElement('td')
      td.innerHTML = parseFloat(group[key].toFixed(4))
      tr.appendChild(td)
    })
    tbody.appendChild(tr)
  })

  table.appendChild(thead)
  table.appendChild(tbody)

  return table
}

function startTest (filename, fn) {
  return loadAsmJS(`${filename}.js`).then(instance => {
    fn('asm.js', instance)
    if (typeof WebAssembly !== 'undefined') {
      return loadWebAssembly(`${filename}.wasm`).then(ins => fn('WebAssembly', ins))
    }
    return instance
  })
}
