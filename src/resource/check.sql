select constraint_name
    from information_schema.table_constraints
    where table_name = '${table}'
    and constraint_type = 'PRIMARY KEY'
