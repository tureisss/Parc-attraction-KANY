CREATE TABLE IF NOT EXISTS attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true,
    image_url varchar(500),
    hauteur int,
    vitesse int,
    longueur int,
    duree int,
    annee_construction int
);

CREATE TABLE IF NOT EXISTS critique (
    critique_id int auto_increment,
    primary key(critique_id),
    attraction_id int not null,
    texte varchar(1000) not null,
    note int not null,
    nom varchar(255),
    prenom varchar(255),
    anonyme bool default false,
    foreign key (attraction_id) references attraction(attraction_id)
);

CREATE TABLE IF NOT EXISTS users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);