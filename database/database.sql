<<<<<<< HEAD
CREATE DATABASE App;
=======
CREATE DATABASE geoApp;
>>>>>>> 3c4aec2d3e02c464d71b14bdb26aa88f9c1a2361


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
