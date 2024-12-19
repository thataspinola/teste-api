/* CREATE DATABASE estacionamento;

USE estacionamento;

CREATE TABLE estabelecimento (
	id int not null primary key auto_increment,
	nome varchar(150) not null,
	cnpj varchar(14) not null,
	endereco text not null,
	telefone varchar(11) not null,
	vagas_motos int not null default 1,
	vagas_carror int not null default 1
);

CREATE TABLE veiculo (
	id int not null primary key auto_increment,
	marcar varchar(150) not null,
	modelo varchar(150) not null,
	cor varchar(50) not null,
	placa varchar(10) not null,
	tipo varchar(50) not null
);

CREATE TABLE controle (
	id int not null primary key auto_increment,
	estabelecimentoId int not null,
	veiculoId int not null,
	tipo varchar(10) not null,
	timestamp datetime default CURRENT_TIMESTAMP
);

ALTER TABLE controle ADD CONSTRAINT fk_estabelecimento FOREIGN KEY (estabelecimentoId) REFERENCES estabelecimento (id);
ALTER TABLE controle ADD CONSTRAINT fk_veiculo FOREIGN KEY (veiculoId) REFERENCES veiculo (id); */