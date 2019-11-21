create table people (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    email varchar,
    password varchar,
    birthday date
)

create table holidays (
    id serial primary key,
    name varchar,
    date_added TIMESTAMP,
    is_active BOOLEAN
)

create table items (
    id serial primary key,
    name varchar,
    price varchar,
    holiday_id int,
    img varchar,
    creator_id int,
    rating int,
    reserved_by_user_id int,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    foreign key(creator_id) REFERENCES people(id),
    foreign key(reserved_by_user_id) references people(id),
    foreign key(holiday_id) REFERENCES holidays(id)
)