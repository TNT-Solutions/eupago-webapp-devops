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



INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (11, 987654321);
INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (11, 999998888);
INSERT INTO TB_CELULAR (nr_ddd, nr_celular) VALUES (21, 977776666);





INSERT INTO TB_USUARIO (
    id_celular,
    nr_cpf,
    ds_nome_completo,
    dt_nascimento,
    st_visao,
    ds_email,
    st_cadastro,
    dt_cadastro) VALUES (
    2,
    12312312387,
    'Tony Stark',
    '2020-12-15',
    'Baixa Visão',
    'theboss@starkindustries.com',
    1,
    GETDATE());

select * from [dbo].[TB_USUARIO]




