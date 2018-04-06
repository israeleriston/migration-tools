  alter table ${current} add constraint fk_generic foreign key(${table}) REFERENCES ${pk} (${table})
