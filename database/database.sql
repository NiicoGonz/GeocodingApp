CREATE DATABASE App;


CREATE TABLE  users
(
    id SERIAL PRIMARY KEY,
    name character varying(40) ,
    lastname character varying(60),
    addres character varying(80),
    city character varying(90),
    latitude double precision,
    long double precision,
    geostatus character(1) 
)
