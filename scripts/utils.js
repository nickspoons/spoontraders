const dbi = id => document.getElementById(id)

const dbt = (element, tag) => element.getElementsByTagName(tag)[0]

const totable = (items, genrow, header) => `
<table>${header ? `<tr>${header}</tr>` : ''}
  ${items.map(i => `<tr>${genrow(i)}</tr>`).join('\n')}
</table>
`
