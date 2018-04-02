const { PreparedStatement } = require('pg-promise')

const findColumn = (...args) =>
  new PreparedStatement('find-column', 'select table_name from information_schema.columns where column_name = $1', ...args)

const createFK = (...args) =>
  new PreparedStatement('create-fk', 'alter table $1  add constraint fk_ || $1 || $$_$$ || $2 foreign key( $3 )  REFERENCES $2( $3 )', ...args)

module.exports = {
  findColumn,
  createFK
}