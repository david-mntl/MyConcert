/************************************************/
ALTER PROCEDURE spUserExists
     @pEmail VARCHAR(50)
AS
BEGIN
	DECLARE @r VARCHAR(50)
	EXEC spUserExistsH @pEmail,@r OUTPUT
	SELECT @r  AS 'State'
END
GO


ALTER PROCEDURE spUserExistsH
	@pEmail VARCHAR(50),
	@O VARCHAR(20) OUTPUT
AS 
BEGIN
	SET NOCOUNT ON;
	SET @O = 1;
	if((SELECT COUNT(*) FROM MCUSER_ADMIN WHERE (Email=@pEmail))=0) AND ((SELECT COUNT(*) FROM MCUSER WHERE (Email=@pEmail))=0) BEGIN
		SET @O = 0;
	END
END
GO

/************************************************/
CREATE PROCEDURE spLogin
	@pEmail VARCHAR(30),
	@pPass VARCHAR(8)
AS
BEGIN
	DECLARE @r VARCHAR(100)
	EXEC spLoginH @pEmail, @pPass, @r OUTPUT
	SELECT @r  AS 'State'
END
GO
CREATE PROCEDURE spLoginH
	@pEmail VARCHAR(30),
	@pPass VARCHAR(8),
	@O VARCHAR(20) OUTPUT
AS 
BEGIN
	SET NOCOUNT ON;
	SET @O = 0;
	if((SELECT COUNT(*) FROM MCUSER_ADMIN WHERE ( Email=@pEmail AND MCPassword=@pPass))=1) BEGIN
		SET @O = 1;
	END if((SELECT COUNT(*) FROM MCUSER WHERE ( Email=@pEmail AND MCPassword=@pPass))=1) BEGIN
		SET @O = 2;
	END
END
GO


/************************************************/
CREATE PROCEDURE spRegisterUser
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pID_Country INT,
	@pResidence VARCHAR(100),
	@pUni_ID INT,
	@pEmail VARCHAR(50),
	@pPhone VARCHAR(15),
	@pPhoto VARCHAR(30),
	@pPass VARCHAR(8),
	@pDescription VARCHAR(300),
	@pBirthdate DATETIME	

AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO MCUSER(Name,LastName,FK_ID_Country, Residence, FK_ID_University, Email, Phone, Photo, RegistrationDate, MCPassword, PersonalDescription, Birthdate,FK_ID_State)
	VALUES (@pName, @pLastname,@pID_Country,@pResidence, @pUni_ID, @pEmail, @pPhone, @pPhoto, (getdate()),@pPass,@pDescription,@pBirthdate,1);
	SELECT * FROM MCUSER WHERE PK_ID_MCUSER= SCOPE_IDENTITY();
END
GO


/************************************************/
CREATE PROCEDURE spRegisterAdmin
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pEmail VARCHAR(50),
	@pPass VARCHAR(8)	

AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO MCUSER_ADMIN(Name,LastName, Email, MCPassword, FK_ID_State, RegistrationDate)
	VALUES (@pName, @pLastname,@pEmail, @pPass, 1, getDate());
	SELECT * FROM MCUSER_ADMIN WHERE PK_ID_MCUSER_ADMIN= SCOPE_IDENTITY();
END
GO



/************************************************/
CREATE PROCEDURE spRegisterCountry
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO COUNTRY(Name) VALUES(@pName);
	SELECT 'ok'  AS 'State';
END
GO


/************************************************/
CREATE PROCEDURE spRegisterUniversity
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO University(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO


/************************************************/
CREATE PROCEDURE spRegisterUserState
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO USER_STATE(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO

/************************************************/
CREATE PROCEDURE spRegisterEventState
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO EVENT_STATE(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO

/************************************************/
CREATE PROCEDURE spRegisterPlace
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO PLACE(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO

/************************************************/
CREATE PROCEDURE spRegisterCategory
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO CATEGORY(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO

/************************************************/
CREATE PROCEDURE spRegisterBand
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO BAND(Name) VALUES(@pName);
	SELECT PK_ID_BAND FROM BAND WHERE PK_ID_BAND= SCOPE_IDENTITY();
END
GO

/************************************************/
CREATE PROCEDURE spRegisterGenre
	@pName VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO GENRE(Name) VALUES(@pName);
	SELECT 'ok' AS 'State';
END
GO

/************************************************/
CREATE PROCEDURE spGetCountries
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM GENRE
END
GO

/************************************************/
CREATE PROCEDURE spGetUniversyties
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM GENRE
END
GO

/************************************************/
CREATE PROCEDURE spGetGenres
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM GENRE
END
GO

/************************************************/
CREATE PROCEDURE spGetCommentsFromBand
	@pBandID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT MCUSER.Name, COMMENT.Score, COMMENT.Comment 
	FROM COMMENT_LIST 
	INNER JOIN COMMENT ON COMMENT_LIST.FK_ID_Comment=COMMENT.PK_ID_COMMENTS AND COMMENT_LIST.FK_ID_Band=@pBandID
	INNER JOIN MCUSER ON COMMENT.FK_ID_User=MCUSER.PK_ID_MCUSER;
END
GO

/************************************************/
CREATE PROCEDURE spGetGenresFromBand
	@pBandID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT GENRE.Name
	FROM BAND_GENRE_LIST 
	INNER JOIN GENRE ON BAND_GENRE_LIST.FK_ID_Genre = GENRE.PK_ID_GENRE AND BAND_GENRE_LIST.FK_ID_Band=@pBandID;
END
GO


/************************************************/
CREATE PROCEDURE spGetArtistsFromBand
	@pBandID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT ARTIST.Name
	FROM BAND_ARTIST
	INNER JOIN ARTIST ON BAND_ARTIST.FK_ID_Artist = ARTIST.PK_ID_ARTIST AND BAND_ARTIST.FK_ID_Band=@pBandID;
END
GO

/************************************************/
CREATE PROCEDURE spAddMemberToBand
           @pBandID INT,
           @pMember VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ID INT =0; 
	SET @ID = (SELECT PK_ID_ARTIST FROM ARTIST WHERE Name=@pMember);
	IF(@ID=0)BEGIN
		INSERT INTO ARTIST (Name) VALUES (@pMember);
		SET @ID = (SELECT PK_ID_ARTIST FROM ARTIST WHERE Name=@pMember);
	END 

	INSERT INTO BAND_ARTIST(FK_ID_Band, FK_ID_Artist)
	VALUES (@pBandID, @ID);
	
	SELECT 'ok' as 'Status';

END
GO

/************************************************/
CREATE PROCEDURE spAddGenreToBand 
           @pBandID INT,
           @pGenre VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ID INT = 0; 
	SET @ID = (SELECT PK_ID_GENRE FROM GENRE WHERE Name=@pGenre);
	IF(@ID=0)BEGIN
		INSERT INTO GENRE (Name) VALUES (@pGenre);
		SET @ID = (SELECT PK_ID_GENRE FROM GENRE WHERE Name=@pGenre);
	END 
	INSERT INTO BAND_GENRE_LIST(FK_ID_Band, FK_ID_Genre)
	VALUES (@pBandID, @ID);
	SELECT 'ok' AS 'Status'
END
GO

/************************************************/
CREATE PROCEDURE spAddSongToBand
           @pBandID INT,
           @pSong VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ID INT; 
	INSERT INTO SONG(Name) VALUES (@pSong);
	SET @ID = (SELECT PK_ID_SONG FROM SONG WHERE Name=@pSong);
	INSERT INTO SONG_LIST(FK_ID_Band, FK_ID_Song)
	VALUES (@pBandID, @ID);
	SELECT 'ok' AS 'Status'
END
GO

/************************************************/
CREATE PROCEDURE spGetBandsFromFestivalCategory
    @pFestivalCategoryID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT BAND.Name FROM FESTIVAL_CATEGORY

INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY = FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory
INNER JOIN FESTIVAL_CATEGORY_LIST ON (FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY = FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory 
AND FESTIVAL_CATEGORY.FK_ID_Category=@pFestivalCategoryID)
INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band= BAND.PK_ID_BAND;

END
GO


/************************************************/
CREATE PROCEDURE spGetFestivalCategoryInfor
     @pFestivalCategoryID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT * FROM CATEGORY WHERE PK_ID_CATEGORY=@pFestivalCategoryID;
END
GO

/************************************************/
CREATE PROCEDURE spGetFestivalInfo
    @pFestivalID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT * FROM FESTIVAL WHERE PK_ID_FESTIVAL=@pFestivalID;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllCategories
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM CATEGORIES;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllFestivals
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM FESTIVAL;
END
GO

/************************************************/

/************************************************/

/************************************************/

/************************************************/

/************************************************/

/************************************************/

/************************************************/

/************************************************/








