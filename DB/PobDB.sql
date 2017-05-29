insert into country (name) values ('acosta obviamente')
INSERT INTO COUNTRY (Name) Values ('Costa Rica')

INSERT INTO UNIVERSITY (Name) Values ('Hogwarts')
INSERT INTO UNIVERSITY (Name) Values ('TEC')
INSERT INTO UNIVERSITY (Name) Values ('UCR')

INSERT INTO USER_STATE (Name) Values ('Active')
INSERT INTO USER_STATE (Name) Values ('Deactive')

INSERT INTO BAND (Name) VALUES ('querubines')
INSERT INTO BAND (Name) VALUES ('aluminitca')
INSERT INTO BAND (Name) VALUES ('carbonica')

INSERT INTO MCUSER_ADMIN(Name, LastName, Email, MCPassword, FK_ID_State, RegistrationDate) 
VALUES('Abrahamon','Arias','a@gmail.com','12345678',1,getDate())

INSERT INTO MCUSER(Name, LastName, FK_ID_Country, Residence, FK_ID_University, Email, Phone, Photo, RegistrationDate,MCPassword, PersonalDescription, BirthDate, FK_ID_State) 
VALUES('Lenin','T', 1, 'PZ', 3, 'Tgmail.com', '+5061', 'lenins', getDate(),'abc', 'Como dedillo al ano', '02/02/99', 1)


INSERT INTO COMMENT_LIST (FK_ID_BAND, FK_ID_COMMENT) VALUES (1,1)
INSERT INTO COMMENT_LIST (FK_ID_BAND, FK_ID_COMMENT) VALUES (2,1)
INSERT INTO COMMENT_LIST (FK_ID_BAND, FK_ID_COMMENT) VALUES (3,3)
INSERT INTO COMMENT_LIST (FK_ID_BAND, FK_ID_COMMENT) VALUES (3,4)
INSERT INTO COMMENT_LIST (FK_ID_BAND, FK_ID_COMMENT) VALUES (3,5)

INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,1);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,2);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,3);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,4);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,5);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,6);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,7);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (1,8);

INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (2,2);
INSERT INTO BAND_GENRE_LIST (FK_ID_Band, FK_ID_Genre) VALUES (3,5);

 
/*
spRegisterCountry 'panama'
spRegisterUniversity 'UNA'
spRegisterUserState 'space'
spRegisterEventState 'ocurriendo'
spRegisterPlace 'paraiso'
spRegisterCategory 'metal'
spRegisterBand 'querubines'
spRegisterGenre 'rockchata1'
spRegisterGenre'heavy salsa1' 
*/


insert into comment(comment, score, FK_ID_USER) values ('ok',5,1)


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