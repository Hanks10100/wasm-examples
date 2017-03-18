function loadJS (url, imports = {}) {
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
