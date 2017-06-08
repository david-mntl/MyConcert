
EXEC spRegisterCountry 'Panamá';
EXEC spRegisterCountry 'Brazil';
EXEC spRegisterCountry 'Costa Rica';

EXEC spRegisterUniversity 'TEC';
EXEC spRegisterUniversity 'UNA';
EXEC spRegisterUniversity 'UCR';

EXEC spRegisterUserState 'Activate';
EXEC spRegisterUserState 'Deactive';

EXEC spRegisterEventState 'Activate';
EXEC spRegisterEventState 'Deactive';

EXEC spRegisterPlace 'Cangrejal';
EXEC spRegisterPlace 'Palmichal';
EXEC spRegisterPlace 'Sabanillas';
EXEC spRegisterPlace 'San Ignacio';
EXEC spRegisterPlace 'Chirraca';
EXEC spRegisterPlace 'Tablazo';


EXEC spRegisterCategory 'Headliners';

EXEC spRegisterBand 'Megadeath','SID';
EXEC spRegisterBand 'Carbonica','SID';
EXEC spRegisterBand 'Aluminica','SID';

EXEC spRegisterGenre 'Rock';
EXEC spRegisterGenre 'Salsa';
EXEC spRegisterGenre 'Pop';

EXEC spRegisterUser 'user', '1', 'Costa Rica','100m Este de la Basílica de los Ángeles',1,'user@gmail.com','+506','photo.jpg','123','Me gusta la salsa',"12/12/12";
EXEC spRegisterAdmin 'admin','sudo','admin@gmail.com','123';


-- Carteleras --
EXEC spAddBillboard 'Speed Sound',"01/01/2017","02/02/2017",1,1;
EXEC spAddBillboard 'Festival Imperial',"02/02/2017","03/03/2017",2,1;
EXEC spAddBillboard 'Jazz Fest',"03/03/2017","04/04/2017",3,1;
EXEC spAddBillboard 'Picnic Fest',"04/04/2017","05/05/2017",4,1;
EXEC spAddBillboard 'Jungle Jam',"05/05/2017","06/06/2017",5,1;
EXEC spAddBillboard 'Blues Xtreme Fest',"06/06/2017","08/08/2017",6,1;

--Festivales--
INSERT INTO UBICATION(Name) VALUES ('Estadio Nacional');
INSERT INTO UBICATION(Name) VALUES ('Tecnológico, Costa Rica');
INSERT INTO UBICATION(Name) VALUES ('Parque de Diversiones');
INSERT INTO UBICATION(Name) VALUES ('Centro de Eventos Pedregal');
INSERT INTO UBICATION(Name) VALUES ('Parque presas');

EXEC spAddFestival 1,"02/02/18","03/03/18", 'Estadio Nacional','This fesitival will be awesome';
EXEC spAddFestival 2,"03/03/18","04/04/18", 'Tecnológico, Costa Rica','This fesitival will be cool';
EXEC spAddFestival 3,"04/04/18","05/05/18", 'Parque de Diversiones','This fesitival will be not so awesome';
EXEC spAddFestival 4,"05/05/18","06/06/18", 'Centro de Eventos Pedregal','This fesitival will be great';
EXEC spAddFestival 5,"06/06/18","07/07/18", 'Parque presas','This fesitival will be incredible';
EXEC spAddFestival 6,"07/07/18","08/08/18", 'Estadio Nacional','This fesitival will be the worst';


INSERT INTO ARTIST (NAME) VALUES ('a')
INSERT INTO ARTIST (NAME) VALUES ('aa')
INSERT INTO ARTIST (NAME) VALUES ('aaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaaa')
INSERT INTO ARTIST (NAME) VALUES ('aaaaaaaa')


INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (1,1)
INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (1,2)
INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (1,3)
INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (1,4)
INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (1,5)
INSERT INTO BAND_ARTIST (FK_ID_Band, FK_ID_Artist) VALUES (2,5)




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









