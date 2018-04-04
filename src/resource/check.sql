select constraint_name
    from information_schema.table_constraints
    where table_name = $1
    and constraint_type = 'PRIMARY KEY'
