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

EXEC spRegisterEventState 'Votation';
EXEC spRegisterEventState 'Cancelled';
EXEC spRegisterEventState 'Confirmed';

EXEC spRegisterPlace 'Argentina';
EXEC spRegisterPlace 'Chile';
EXEC spRegisterPlace 'Costa Rica';
EXEC spRegisterPlace 'Colombia';
EXEC spRegisterPlace 'Brazil';
EXEC spRegisterPlace 'M�xico';
EXEC spRegisterPlace 'Panam�';
EXEC spRegisterPlace 'Canad�';

EXEC spRegisterCategory 'Headliners';
EXEC spRegisterCategory 'Locals';

EXEC spRegisterBand 'Metallica','2ye2Wgw4gimLv2eAKyk1NB';
EXEC spRegisterBand 'Coldplay','4gzpq5DPGxSnKTe4SA8HAU';
EXEC spRegisterBand 'Pink Floyd','0k17h0D3J5VfsdmQ1iZtE9';

EXEC spRegisterGenre 'Rock';
EXEC spRegisterGenre 'Salsa';
EXEC spRegisterGenre 'Pop';

EXEC spRegisterUserState 'Activate';
EXEC spRegisterUserState 'Deactive';

EXEC spRegisterAdmin 'admin','sudo','admin@gmail.com','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3';
EXEC spRegisterUser 'user', '1', 'Costa Rica','100m Este de la Bas�lica de los �ngeles',1,'user@gmail.com','+506','photo.jpg','a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3','Me gusta la salsa',"12/12/12";

EXEC spAddGenreToUser 1, 'Rock';
EXEC spAddGenreToUser 1, 'Pop';

INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Estadio Nacional');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Tecnol�gico, Costa Rica');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Parque de Diversiones');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Centro de Eventos Pedregal');
INSERT INTO FESTIVAL_UBICATION(Name) VALUES ('Parque presas');

INSERT INTO EVENT_STATE(Name) VALUES ('Votation');
INSERT INTO EVENT_STATE(Name) VALUES ('Confirmed');
INSERT INTO EVENT_STATE(Name) VALUES ('Cancelled');

-- Carteleras --
EXEC spAddBillboard 'Speed Sound',"01/01/2017","02/02/2017",1,'description';
EXEC spAddBillboard 'Festival Imperial',"02/02/2017","03/03/2017",2,'description';
EXEC spAddBillboard 'Jazz Fest',"03/03/2017","04/04/2017",3,'description';
EXEC spAddBillboard 'Picnic Fest',"04/04/2017","05/05/2017",4,'description';
EXEC spAddBillboard 'Jungle Jam',"05/05/2017","06/06/2017",5,'description';
EXEC spAddBillboard 'Blues Xtreme Fest',"06/06/2017","08/08/2017",6,'description';

EXEC spAddBillboardPhoto 1, 'imgs/speed.png';
EXEC spAddBillboardPhoto 2, 'imgs/imperial.png';
EXEC spAddBillboardPhoto 3, '';
EXEC spAddBillboardPhoto 4, 'imgs/picnic.png';
EXEC spAddBillboardPhoto 5, 'imgs/jungle.png';
EXEC spAddBillboardPhoto 6, '';


--Festivales--
EXEC spAddFestival 1,"02/02/18","03/03/18", 'Estadio Nacional','This fesitival will be awesome';
EXEC spAddFestival 2,"03/03/18","04/04/18", 'Tecnol�gico, Costa Rica','This fesitival will be cool';

EXEC spAddCategoryToFestival 1,1;
EXEC spAddBandToFestival 1,1;

EXEC spAddCategoryToBillboard 1,1;
EXEC spAddBandToBillboard 1,1,1;









