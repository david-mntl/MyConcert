EXEC spRegisterCountry 'Argentina';
EXEC spRegisterCountry 'Chile';
EXEC spRegisterCountry 'Costa Rica';
EXEC spRegisterCountry 'Colombia';
EXEC spRegisterCountry 'Brazil';
EXEC spRegisterCountry 'M�xico';
EXEC spRegisterCountry 'Panam�';
EXEC spRegisterCountry 'Canad�';

EXEC spRegisterUniversity 'TEC';
EXEC spRegisterUniversity 'UNA';
EXEC spRegisterUniversity 'UCR';
EXEC spRegisterUniversity 'University of Waterloo';
EXEC spRegisterUniversity 'Universidad de Buenos Aires';
EXEC spRegisterUniversity 'Universidad de Chile';
EXEC spRegisterUniversity 'Universidad de los Andes';
EXEC spRegisterUniversity 'Universidade de S�o Paulo';
EXEC spRegisterUniversity 'Universidad Aut�noma de M�xico';
EXEC spRegisterUniversity 'Universidad Tecnol�gica de Panam�';

EXEC spRegisterEventState 'Activate';
EXEC spRegisterEventState 'Deactive';

EXEC spRegisterPlace 'Tecnol�gico de Costa Rica';
EXEC spRegisterPlace 'Parque de Diversiones';
EXEC spRegisterPlace 'Centro de Eventos Pedregal';
EXEC spRegisterPlace 'Parque Viva';
EXEC spRegisterPlace 'Estadio Nacional';

EXEC spRegisterCategory 'Headliners';
EXEC spRegisterCategory 'Locals';

EXEC spRegisterBand 'Megadeath','SID';
EXEC spRegisterBand 'Carbonica','SID';
EXEC spRegisterBand 'Aluminica','SID';

EXEC spRegisterGenre 'Rock';
EXEC spRegisterGenre 'Salsa';
EXEC spRegisterGenre 'Pop';

EXEC spRegisterAdmin 'admin','sudo','admin@gmail.com','123';
EXEC spRegisterUser 'user', '1', 'Costa Rica','100m Este de la Bas�lica de los �ngeles',1,'user@gmail.com','+506','photo.jpg','123','Me gusta la salsa',"12/12/12";


EXEC spAddGenreToUser 4, 'Rock';
EXEC spAddGenreToUser 4, 'Pop';

EXEC spRegisterUserState 'Activate';
EXEC spRegisterUserState 'Deactive';

INSERT INTO EVENT_STATE(Name) VALUES ('Votation');
INSERT INTO EVENT_STATE(Name) VALUES ('Confirmed');
INSERT INTO EVENT_STATE(Name) VALUES ('Cancelled');

-- Carteleras --
EXEC spAddBillboard 'Speed Sound',"01/01/2017","02/02/2017",1,1,'description';
EXEC spAddBillboard 'Festival Imperial',"02/02/2017","03/03/2017",2,1,'description';
EXEC spAddBillboard 'Jazz Fest',"03/03/2017","04/04/2017",3,1,'description';
EXEC spAddBillboard 'Picnic Fest',"04/04/2017","05/05/2017",4,1,'description';
EXEC spAddBillboard 'Jungle Jam',"05/05/2017","06/06/2017",5,1,'description';
EXEC spAddBillboard 'Blues Xtreme Fest',"06/06/2017","08/08/2017",6,1,'description';

EXEC spAddBillboardPhoto 1, 'imgs/blue.png';
EXEC spAddBillboardPhoto 2, 'imgs/color.png';
EXEC spAddBillboardPhoto 3, 'imgs/horizon.png';
EXEC spAddBillboardPhoto 4, 'imgs/spark.png';
EXEC spAddBillboardPhoto 5, 'imgs/street.png';
EXEC spAddBillboardPhoto 6, 'imgs/jump.png';


--Festivales--
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Estadio Nacional');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Tecnol�gico, Costa Rica');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Parque de Diversiones');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Centro de Eventos Pedregal');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Parque presas');

EXEC spAddFestival 2,"03/03/18","04/04/18", 'Tecnol�gico, Costa Rica','This fesitival will be cool';
EXEC spAddFestival 3,"04/04/18","05/05/18", 'Parque de Diversiones','This fesitival will be not so awesome';
EXEC spAddFestival 4,"05/05/18","06/06/18", 'Centro de Eventos Pedregal','This fesitival will be great';
EXEC spAddFestival 5,"06/06/18","07/07/18", 'Parque presas','This fesitival will be incredible';
EXEC spAddFestival 6,"07/07/18","08/08/18", 'Estadio Nacional','This fesitival will be the worst';


EXEC spAddFestival 1,"02/02/18","03/03/18", 'Estadio Nacional','This fesitival will be awesome';
EXEC spAddCategoryToFestival 6,1;
EXEC spAddBandToFestival 3,1;
	

SELECT * FROM CATEGORY
select * from band
select * from FESTIVAL_CATEGORY_LIST
select * from FESTIVAL_BANDS_LIST
select * from billboard
select * from festival
delete from festival
update billboard set fk_id_eventstate=1

spGetBandsFromFestivalCategory 6,1

alter table mcuser_admin alter column MCPassword VARCHAR(70)
select * from mcuser_admin
select * from mcuser
select * from USER_GENRE_LIST
spEditAdmin 'nombre','apellido','admin@gmail.com','1234'

update mcuser set fk_id_state=1 where PK_ID_MCUSER=4

delete from mcuser where PK_ID_MCUSEr=4
delete from USER_GENRE_LIST where PK_ID_USER_GENRE=6


select * from category
select * from FESTIVAL_CATEGORY_LIST
select * from mcuser_admin
select * from mcuser
select * from USER_GENRE_LIST
select * from band
select * from FESTIVAL_BANDS_LIST









INSERT INTO ARTIST (NAME) VALUES ('a')
INSERT INTO ARTIST (NAME) VALUES ('aa')
INSERT INTO ARTIST (NAME) VALUES ('aaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaaaaa')


insert into FESTIVAL (FK_ID_Category_List, FestivalStart, FestivalEnd, FK_ID_Place, FK_ID_EventState) VALUES (1,getDate(),getDate(),1,1)
insert into FESTIVAL (FK_ID_Category_List, FestivalStart, FestivalEnd, FK_ID_Place, FK_ID_EventState) VALUES (2,getDate(),getDate(),2,2)

insert into FESTIVAL_CATEGORY (FK_ID_Category) VALUES (1)
insert into FESTIVAL_CATEGORY (FK_ID_Category) VALUES (2)
insert into FESTIVAL_CATEGORY (FK_ID_Category) VALUES (3)

insert into FESTIVAL_CATEGORY_LIST(FK_ID_Festival, FK_ID_FestivalCategory) VALUES (1,1)


insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(2,1)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(2,2)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(2,3)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(2,4)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(1,6)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(1,7)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(1,8)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(1,9)
insert into FESTIVAL_BANDS_LIST (FK_ID_FestivalCategory, FK_ID_Band) VALUES(1,10)




-- 2 categorias y cada una con 3 bandas para 1 festival
insert into billboard (Name,StartVotingDate,Endvotingdate,FK_ID_Place,FK_ID_EventState) Values ('billN',getDate(),getDate(),2,1)
insert into festival_category(FK_ID_Category) VALUES (4)
insert into FESTIVAL_CATEGORY_LIST(FK_ID_Festival, FK_ID_FestivalCategory) VALUES (2,4)









