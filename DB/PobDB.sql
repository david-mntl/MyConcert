
EXEC spRegisterUser 'user', '1', 'Costa Rica','100m Este de la Basílica de los Ángeles',1,'user@gmail.com','+506','photo.jpg','123','Me gusta la salsa',"12/12/12";
EXEC spRegisterAdmin 'admin','sudo','admin@gmail.com','123';

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

EXEC spRegisterCategory 'Headliners';

EXEC spRegisterBand 'Megadeath';
EXEC spRegisterBand 'Carbonica';
EXEC spRegisterBand 'Aluminica';

EXEC spRegisterGenre 'Rock';
EXEC spRegisterGenre 'Salsa';
EXEC spRegisterGenre 'Pop';






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









