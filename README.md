# migration-tools
> The simple command-line tools (CLI), to recreate the primary keys and foreign key of your database, recommended for use in denormalized databases

## Introduction

migration-tools is a CLI, to recreating Primary Key's and Foreing Key's the databases desnormalized.
It is designed to be simple in both usage.

## Warning
only a database postgresql is supported, for a while :/

## How to use

The tool will look for all the tables that use this id, passed as parameter,
and will create Primary key (if it does not exist, for the table passed as parameter),
and will create the foreing keys linking the table and the pk passed as parameter,
so in the end you will get a base structure with its respective constraints.

required only the params

* db - url of connection with database
* table - using as reference
* pk - primary key using as based of searching

It's simple example the usage
```
 migration --db=postgresql://postgres:password@localhost:5432/migration --table=users --pk=id_users
```
## disclaimer
any error can be reported, as issue and I am accepting PR's :)
