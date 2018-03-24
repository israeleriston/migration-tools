
const queryPrimaryKey = (column) => ({
  text: ' select table_name from information_schema.columns where column_name = $1 ',
  values: [ column ]
})


module.exports = queryPrimaryKey
