
-- Criação das tabelas
CREATE TABLE TB_TRANSACAO (
    id_trasacao    int identity,
    id_compra       numeric(4) NOT NULL,
    dt_transacao    DATETIME NOT NULL,
    st_parcelado    CHAR(1) NOT NULL,
    nr_parcelas     NUMERIC(2),
    vl_parcelas     NUMERIC(12, 2),
    st_transacao    VARCHAR(100) NOT NULL,
    vl_total_cartao NUMERIC(12, 2) NOT NULL
);

CREATE TABLE TB_CELULAR (
    id_celular int identity,
    nr_ddd     numeric(3) NOT NULL,
    nr_celular numeric(9) NOT NULL
	CONSTRAINT PK_CELULAR PRIMARY KEY (id_celular) 
)


CREATE TABLE TB_USUARIO (
    id_usuario       int identity NOT NULL,
    id_celular       int NOT NULL,
    nr_cpf           numeric(11) NOT NULL,
    ds_nome_completo VARCHAR(250) NOT NULL,
    dt_nascimento    DATETIME NOT NULL,
    st_visao         VARCHAR(100) NOT NULL,
    ds_email         VARCHAR(250) NOT NULL,
    st_cadastro      CHAR(1) NOT NULL,
    dt_cadastro      DATETIME NOT NULL,
    dt_atualizacao   DATETIME
	CONSTRAINT PK_USUARIO PRIMARY KEY (id_usuario)
);



ALTER TABLE TB_USUARIO ADD CONSTRAINT un_cpf_usuario UNIQUE ( nr_cpf );

ALTER TABLE tb_usuario
ADD CONSTRAINT fk_usuario_cel FOREIGN KEY ( id_celular )
REFERENCES tb_celular ( id_celular );


-- Dados para inserção


INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (11, 987654321);
INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (11, 999998888);
INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (21, 977776666);


INSERT INTO TB_USUARIO (id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
VALUES (2, 12312312387, 'Tony Stark', '2020-12-15', 'Baixa Visão', 'theboss@starkindustries.com',1,GETDATE());

INSERT INTO TB_USUARIO (id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
VALUES (2, 12312312387, 'Messi Ronaldo', '1999-12-11', 'Baixa Visão', 'messi@gmail.com',1,GETDATE());

INSERT INTO TB_USUARIO (id_celular, nr_cpf, ds_nome_completo, dt_nascimento, st_visao, ds_email, st_cadastro, dt_cadastro) 
VALUES (2, 12312312387, 'Cap Nasc', '1987-12-09', 'Baixa Visão', 'cptnasc@fiap.com',1,GETDATE());




INSERT INTO TB_TRANSACAO(id_compra, dt_transacao, st_parcelado, st_transacao, vl_total_cartao) 
VALUES (1, GETDATE(), 0, 'APROVADO', 500000);
    
INSERT INTO TB_TRANSACAO(id_compra, dt_transacao, st_parcelado, nr_parcelas, vl_parcelas, st_transacao, vl_total_cartao) 
VALUES (2, 2, GETDATE(), 3, 87500, 'APROVADO', 262500);

INSERT INTO TB_TRANSACAO(id_compra,dt_transacao,st_parcelado,st_transacao,vl_total_cartao) 
VALUES (3,GETDATE(),0,'RECUSADO',29.90);


UPDATE TB_TRANSACAO SET st_transacao = 'APROVADO' where id_trasacao = 1;
UPDATE TB_TRANSACAO SET vl_parcelas = '10' where id_trasacao = 1;

UPDATE TB_USUARIO SET nr_cpf = '12312312387' where id_usuario = 3;
UPDATE TB_USUARIO SET ds_nome_completo = 'Felipe Messi' where id_usuario = 2;

UPDATE TB_CELULAR SET nr_ddd = '21' where id_celular = 1;
UPDATE TB_CELULAR SET nr_celular = '987686301' where id_celular = 2;