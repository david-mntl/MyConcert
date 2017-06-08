/************************************************/
CREATE PROCEDURE spUserExists
     @pEmail VARCHAR(50)
AS
BEGIN
	DECLARE @a INT;
	DECLARE @b INT;
	SET @a = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE (Email=@pEmail));
	SET @b = (SELECT COUNT(*) FROM MCUSER WHERE (Email=@pEmail));
	IF (@a=1 OR @b=1)BEGIN
		SELECT '1' AS 'State';
	END ELSE BEGIN
		SELECT '0' AS 'State';
	END
END
GO

/************************************************/
CREATE PROCEDURE spLogin
	@pEmail VARCHAR(30),
	@pPass VARCHAR(8)
AS
BEGIN
	DECLARE @a INT;
	DECLARE @b INT;
	DECLARE @r INT;
	SET @r=0;
	SET @a = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE ( Email=@pEmail AND MCPassword=@pPass));
	SET @b = (SELECT COUNT(*) FROM MCUSER WHERE ( Email=@pEmail AND MCPassword=@pPass));
	IF(@a=1) BEGIN
		SET @r =1;
	END IF(@b=1) BEGIN
		SET @r =2;
	END ELSE BEGIN
		SET @r =0;
	END
	SELECT @r AS 'Status'
END
GO

/************************************************/
CREATE PROCEDURE spRegisterUser
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pCountry VARCHAR(30),
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
	DECLARE @c INT;
	DECLARE @id INT;
	DECLARE @Cadmin INT;
	SET @Cadmin = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE Email=@pEmail);
	IF(@Cadmin=0) BEGIN
		SET @c = (SELECT COUNT(*) FROM COUNTRY WHERE Name=@pCountry)
		IF(@c=0) BEGIN
			INSERT INTO COUNTRY (Name) VALUES (@pCountry);
		END
		SET @id = (SELECT PK_ID_COUNTRY FROM COUNTRY WHERE Name=@pCountry);

		INSERT INTO MCUSER(Name,LastName,FK_ID_Country, Residence, FK_ID_University, Email, Phone, Photo, RegistrationDate, MCPassword, PersonalDescription, Birthdate,FK_ID_State)
		VALUES (@pName, @pLastname,@id, @pResidence, @pUni_ID, @pEmail, @pPhone, @pPhoto, (getdate()),@pPass,@pDescription,@pBirthdate,2);
		SELECT * FROM MCUSER WHERE PK_ID_MCUSER= SCOPE_IDENTITY();
	END ELSE BEGIN
		SELECT 'email already exists' AS 'Error';
	END
END
GO

/************************************************/
CREATE PROCEDURE spEditUser
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pCountry VARCHAR(30),
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
	DECLARE @c int;
	DECLARE @id int;
	SET @c = (SELECT COUNT(*) FROM COUNTRY WHERE Name=@pCountry)
	IF(@c=0) BEGIN
		INSERT INTO COUNTRY (Name) VALUES (@pCountry);
	END
	SET @id = (SELECT PK_ID_COUNTRY FROM COUNTRY WHERE Name=@pCountry);

	UPDATE MCUSER 
	SET Name=@pName, LastName=@pLastname ,FK_ID_Country=@pCountry, Residence=@pResidence, 
		FK_ID_University=@pUni_ID, Phone=@pPhone, Photo=@pPhoto, MCPassword=@pPass, 
		PersonalDescription=@pDescription, Birthdate=@pBirthdate
	WHERE Email=@pEmail; 
	SELECT 'ok' AS 'Status';
END
GO

/************************************************/
CREATE PROCEDURE spDeleteUserGenres
     @ID INT
AS 
BEGIN
	SET NOCOUNT ON;
	DELETE FROM	USER_GENRE_LIST WHERE FK_ID_User=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spAddGenreToUser
      @pUserID INT,
      @pGenre VARCHAR(30)
AS
BEGIN
	DECLARE @c int;
	DECLARE @GID int;
	SET @c = (SELECT COUNT(*) FROM GENRE WHERE (Name=@pGenre));
	IF(@c=0) BEGIN
		INSERT INTO GENRE (Name) VALUES (@pGenre);
	END
	SET @GID = (SELECT PK_ID_GENRE FROM GENRE WHERE Name=@pGenre);
	
	INSERT INTO USER_GENRE_LIST (FK_ID_User, FK_ID_Genre) VALUES (@pUserID, @GID);
	SELECT 'ok' as 'Status';
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
CREATE PROCEDURE spEditAdmin
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pEmail VARCHAR(50),
	@pPass VARCHAR(8)
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @c INT;
	SET @c = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE Email=@pEmail);
	IF(@c=1) BEGIN
		UPDATE MCUSER_ADMIN SET Name = @pName WHERE Email = @pEmail;
		UPDATE MCUSER_ADMIN SET LastName = @pLastname WHERE Email = @pPass;
		UPDATE MCUSER_ADMIN SET MCPassword = @pPass	WHERE Email = @pPass;
		SELECT 'ok' AS 'Status';
	END ELSE BEGIN
		SELECT 'No user email' AS 'Status';
	END
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
CREATE PROCEDURE spActivateBand
     @ID INT
AS
BEGIN
	UPDATE BAND SET BAND.BandState=1 WHERE BAND.PK_ID_BAND=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spDeactivateBand
     @ID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @c1 INT;
	DECLARE @c2 INT;
	SET @c1 = (SELECT COUNT(*) FROM CATEGORY_LIST 
				INNER JOIN BILLBOARD_CATEGORY ON CATEGORY_LIST.FK_ID_BillboardCategory=BILLBOARD_CATEGORY.PK_ID_BILLBOARD_CATEGORY
				INNER JOIN BILLBOARD_BANDS_LIST ON BILLBOARD_CATEGORY.PK_ID_BILLBOARD_CATEGORY=BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
				INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
				WHERE BAND.PK_ID_BAND=@ID);
	SET @c2 = (SELECT COUNT(*) FROM FESTIVAL_CATEGORY_LIST
				INNER JOIN FESTIVAL_CATEGORY ON FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory = FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY
				INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY = FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory
				INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
				WHERE BAND.PK_ID_BAND=@ID);
	IF(@c1=0 AND @c2=0)BEGIN
		UPDATE BAND SET BAND.BandState=0 WHERE BAND.PK_ID_BAND=@ID;
	END ELSE BEGIN
		SELECT 'error' as 'Error';
	END
END
GO

/************************************************/
CREATE PROCEDURE spRegisterBand
	@pName VARCHAR(30),
	@pSpotifyID VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @c INT;
	DECLARE @id INT;
	SET @c = (SELECT COUNT(*) FROM BAND WHERE Name=@pName);
	IF ( @c=0) BEGIN
		INSERT INTO BAND (Name, ID_Spotify, BandState, N_Calification, Calification) VALUES(@pName, @pSpotifyID, 1,0,0);
	END
	SET @id = (SELECT PK_ID_BAND FROM BAND WHERE Name=@pName);
	SELECT @id AS 'PK_ID_BAND'
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
CREATE PROCEDURE spGetUniversities
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
	SELECT PK_ID_GENRE AS 'id', Name AS 'name' FROM GENRE
END
GO

/************************************************/
CREATE PROCEDURE spGetCommentsFromBand
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT MCUSER.Name AS 'name', COMMENT.Score, COMMENT.Comment AS 'comment'
	FROM COMMENT_LIST 
	INNER JOIN COMMENT ON COMMENT_LIST.FK_ID_Comment=COMMENT.PK_ID_COMMENTS AND COMMENT_LIST.FK_ID_Band=@ID
	INNER JOIN MCUSER ON COMMENT.FK_ID_User=MCUSER.PK_ID_MCUSER;
END
GO

/************************************************/
CREATE PROCEDURE spGetGenresFromBand
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT GENRE.Name AS 'name'
	FROM BAND_GENRE_LIST 
	INNER JOIN GENRE ON BAND_GENRE_LIST.FK_ID_Genre = GENRE.PK_ID_GENRE AND BAND_GENRE_LIST.FK_ID_Band=@ID;
END
GO


/************************************************/
CREATE PROCEDURE spGetArtistsFromBand
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT ARTIST.Name AS 'name'
	FROM BAND_ARTIST
	INNER JOIN ARTIST ON BAND_ARTIST.FK_ID_Artist = ARTIST.PK_ID_ARTIST AND BAND_ARTIST.FK_ID_Band=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spAddMemberToBand
           @pBandID INT,
           @pMember VARCHAR(30)
AS
BEGIN
	SET NOCOUNT ON;
	
	DECLARE @ID INT=0;
	DECLARE @IDcount INT=0; 
	SET @IDcount = (SELECT COUNT(*) FROM ARTIST WHERE Name=@pMember);
	SET @ID = (SELECT PK_ID_ARTIST FROM ARTIST WHERE Name=@pMember);

	IF(@IDcount=0)BEGIN
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

	DECLARE @IDcount INT = 0;
	DECLARE @ID INT = 0; 
	SET @ID = (SELECT PK_ID_GENRE FROM GENRE WHERE Name=@pGenre);
	SET @IDcount = (SELECT COUNT(*) FROM GENRE WHERE Name=@pGenre);
	IF(@IDcount=0)BEGIN
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
	DECLARE @IDcount INT; 
	SET @ID = (SELECT PK_ID_SONG FROM SONG WHERE Name=@pSong);
	SET @IDcount = (SELECT COUNT(*) FROM SONG WHERE Name=@pSong);
	IF(@IDcount=0) BEGIN
		INSERT INTO SONG(Name) VALUES (@pSong);
		SET @ID = (SELECT PK_ID_SONG FROM SONG WHERE Name=@pSong);
	END
	INSERT INTO SONG_LIST(FK_ID_Band, FK_ID_Song)
	VALUES (@pBandID, @ID);

	SELECT 'ok' AS 'Status'
END
GO

/************************************************/
CREATE PROCEDURE spGetBandsFromFestivalCategory
    @ID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT BAND.Name FROM FESTIVAL_CATEGORY

INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY = FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory
INNER JOIN FESTIVAL_CATEGORY_LIST ON (FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY = FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory 
AND FESTIVAL_CATEGORY.FK_ID_Category=@ID)
INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band= BAND.PK_ID_BAND;

END
GO

/************************************************/
CREATE PROCEDURE spGetFestivalCategoryName
     @ID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT * FROM CATEGORY WHERE PK_ID_CATEGORY=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spGetBillboardInfo
    @ID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT * FROM BILLBOARD WHERE PK_ID_BILLBOARD=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spGetFestivalInfo
    @ID INT
AS
BEGIN
	SET NOCOUNT ON;
SELECT PK_ID_FESTIVAL AS 'id', BILLBOARD.Name AS 'name', BILLBOARD.BillboardDescription AS 'description', PlACE.Name AS 'location', BILLBOARD.EndVotingDate AS 'date', BILLBOARD.BillboardPhoto AS 'image'
FROM FESTIVAL 
INNER JOIN BILLBOARD ON FESTIVAL.FK_ID_Billboard= BILLBOARD.PK_ID_BILLBOARD
INNER JOIN PLACE ON BILLBOARD.FK_ID_Place = PlACE.PK_ID_PLACE
WHERE PK_ID_FESTIVAL=@ID;

END
GO

/************************************************/ 
CREATE PROCEDURE spGetUserInfo
    @ID VARCHAR(50)
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @c INT;
	SET @c = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE Email=@ID);
	
	IF(@c=1) BEGIN
		SELECT *,'1' FROM MCUSER_ADMIN WHERE Email=@ID;
	END 
	SET @c = (SELECT COUNT(*) FROM MCUSER WHERE Email=@ID);
	IF (@c=1) BEGIN
		SELECT *,'2' FROM MCUSER WHERE Email=@ID;
	END ELSE BEGIN
		SELECT 'No user' as 'Status';
	END
	
END
GO

/************************************************/
CREATE PROCEDURE spGetAllCategories
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM CATEGORY;
END
GO

/************************************************/
CREATE PROCEDURE spGetUserCategories
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT GENRE.PK_ID_GENRE, GENRE.Name FROM USER_GENRE_LIST
	INNER JOIN GENRE ON USER_GENRE_LIST.FK_ID_Genre = GENRE.PK_ID_GENRE
	WHERE USER_GENRE_LIST.FK_ID_User=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllFestivals
AS
BEGIN
	SET NOCOUNT ON;
	SELECT PK_ID_FESTIVAL AS 'id', BILLBOARD.Name AS 'name', BILLBOARD.BillboardDescription AS 'description', PLACE.Name AS 'location', FESTIVAL.FestivalStart AS 'date', BILLBOARD.BillboardPhoto AS 'image'
	FROM FESTIVAL
	INNER JOIN BILLBOARD ON FESTIVAL.FK_ID_Billboard=BILLBOARD.PK_ID_BILLBOARD
	INNER JOIN PLACE ON BILLBOARD.FK_ID_Place=PLACE.PK_ID_PLACE;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllBillboards
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT PK_ID_BILLBOARD AS 'id', Name AS 'name', FK_ID_Place AS 'location', (EndVotingDate) AS 'timeLeft', BillboardPhoto AS 'image' FROM BILLBOARD;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllBands
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM BAND;
END
GO

/************************************************/
CREATE PROCEDURE spAddBillboard
     @pName VARCHAR(30),
     @pStartVotingDate DATE,
     @pEndVotingDate DATE,
     @pPlaceID INT,
	 @pState INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO BILLBOARD(Name, StartVotingDate, EndVotingDate, FK_ID_Place, FK_ID_EventState) 
	VALUES(@pName, @pStartVotingDate, @pEndVotingDate, @pPlaceID, @pState);
	SELECT PK_ID_BILLBOARD FROM BILLBOARD WHERE PK_ID_BILLBOARD= SCOPE_IDENTITY();
END
GO

/************************************************/
CREATE PROCEDURE spAddCategoryToBillboard
     @BillboardID INT,
     @CategoryID INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO CATEGORY_LIST(FK_ID_Billboard, FK_ID_BillboardCategory) 
	VALUES (@BillboardID, @CategoryID)
END
GO

/************************************************/
CREATE PROCEDURE spAddFestival
           @pBillboardID INT,
           @pStartDate DATE,
		   @pEndDate DATE,
		   @pUbication VARCHAR(100),
           @pDescription VARCHAR (300)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @v INT;
	SET @v = (SELECT COUNT(*) FROM FESTIVAL WHERE FK_ID_Billboard=@pBillboardID);
	IF(@v=0) BEGIN
		DECLARE @c INT;
		SET @c = (SELECT COUNT(*) FROM FestivalUbication WHERE Name=@pUbication);
		IF(@c=0) BEGIN
			INSERT INTO FestivalUbication (Name) VALUES (@pUbication)
		END
		INSERT INTO FESTIVAL(FK_ID_Billboard, FestivalStart, FestivalEnd, FK_ID_EventState, FK_ID_Ubication,FestivalDescription)
		VALUES (@pBillboardID, @pStartDate, @pEndDate, 1,SCOPE_IDENTITY(),@pDescription)
	END ELSE BEGIN
		SELECT 'error' AS 'Status'
	END
END
GO

/************************************************/
CREATE PROCEDURE spAddCategoryToFestival
	@pFestivalID INT,
	@pCategoryID INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO FESTIVAL_CATEGORY (FK_ID_Category) 
	VALUES (@pCategoryID);
	INSERT INTO FESTIVAL_CATEGORY_LIST(FK_ID_Festival, FK_ID_FestivalCategory)
	VALUES (@pFestivalID, SCOPE_IDENTITY());
END
GO

/************************************************/
CREATE PROCEDURE spAddBandToFestival
	@pFestivalID INT,
	@pCategoryID INT,
	@pBandID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @c INT;
	SET @c =(SELECT FESTIVAL_CATEGORY.FK_ID_Category FROM FESTIVAL_CATEGORY
	INNER JOIN CATEGORY ON CATEGORY.PK_ID_CATEGORY=FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY
	INNER JOIN FESTIVAL_CATEGORY_LIST ON FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory=FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY
	WHERE CATEGORY.PK_ID_CATEGORY=@pCategoryID AND FESTIVAL_CATEGORY_LIST.FK_ID_Festival=@pFestivalID);
	INSERT INTO FESTIVAL_BANDS_LIST(FK_ID_FestivalCategory, FK_ID_Band) 
	VALUES (@c,@pBandID)
END
GO


/************************************************/
CREATE PROCEDURE spGetCategoriesFromFest
     @ID INT
AS 
BEGIN
	SET NOCOUNT ON;
	--SELECT CATEGORY.PK_ID_CATEGORY, CATEGORY.Name 
	SELECT *
	FROM FESTIVAL_CATEGORY_LIST
	INNER JOIN FESTIVAL_CATEGORY ON FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory=FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY
	INNER JOIN CATEGORY ON FESTIVAL_CATEGORY.FK_ID_Category=CATEGORY.PK_ID_CATEGORY
	WHERE FESTIVAL_CATEGORY_LIST.FK_ID_Festival=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spGetBandsFromCategory
	@pIDFestival INT,
	@pIDCategory INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT BAND.PK_ID_BAND AS 'id', BAND.Name as 'name', BAND.Calification AS 'rating', BAND.N_Calification, BAND.ID_Spotify AS 'spotifyID' FROM FESTIVAL_CATEGORY_LIST
	INNER JOIN FESTIVAL_CATEGORY ON FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory=FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY
	INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_CATEGORY.PK_ID_FESTIVAL_CATEGORY=FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory
	INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band=BAND.PK_ID_BAND
	WHERE FESTIVAL_CATEGORY_LIST.FK_ID_Festival=@pIDFestival AND FESTIVAL_CATEGORY.FK_ID_Category=@pIDFestival
END
GO
 
/************************************************/
CREATE PROCEDURE spGetBandComments
      @ID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT COMMENT.PK_ID_COMMENTS, COMMENT.Comment FROM COMMENT_LIST
	INNER JOIN COMMENT ON COMMENT_LIST.FK_ID_Comment = COMMENT.PK_ID_COMMENTS
	WHERE COMMENT_LIST.PK_ID_COMMENT_LIST=@ID;
END 
GO

/************************************************/
CREATE PROCEDURE spaddCommentToBand
     @BandID INT,
     @Comment VARCHAR(300),
	 @Score INT,
	 @UserID INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO COMMENT(Comment, Score, FK_ID_User)
	VALUES (@Comment, @Score, @UserID);
	INSERT INTO COMMENT_LIST(FK_ID_Band, FK_ID_Comment)
	VALUES (@BandID, SCOPE_IDENTITY());
END 
GO

/************************************************/
CREATE PROCEDURE spAddCommentCalification
     @UserID VARCHAR(30),
     @Band INT,
     @Points INT,
	 @Comment VARCHAR(300)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO COMMENT (Comment, Score, FK_ID_User) VALUES (@Comment, @Points, (SELECT PK_ID_MCUSER FROM MCUSER WHERE @UserID=Email));
	INSERT INTO COMMENT_LIST(FK_ID_Band, FK_ID_Comment) VALUES (@Band, SCOPE_IDENTITY());
END
GO

/************************************************/
CREATE PROCEDURE spCheckUserVoteBillboard
     @UserID INT,
     @BillboardID INT

AS
BEGIN
	SET NOCOUNT ON;
	SELECT COUNT(*) FROM USER_VOTE
	WHERE FK_ID_Billboard=@BillboardID AND	FK_ID_User=@UserID;
END
GO

/************************************************/
CREATE PROCEDURE spPostUserVote
     @UserID VARCHAR(30),
     @BillboardID INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO USER_VOTE(FK_ID_Billboard, FK_ID_User) VALUES (@BillboardID, (SELECT PK_ID_MCUSER FROM MCUSER WHERE @UserID=Email));
END
GO

/************************************************/
CREATE PROCEDURE spAddPointsToBillboardBand
	@Billboard INT,
	@Category INT,
	@BandID INT,
	@points INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM CATEGORY_LIST 
	INNER JOIN BILLBOARD_CATEGORY ON CATEGORY_LIST.FK_ID_BillboardCategory=BILLBOARD_CATEGORY.PK_ID_BILLBOARD_CATEGORY
	INNER JOIN BILLBOARD_BANDS_LIST ON BILLBOARD_CATEGORY.PK_ID_BILLBOARD_CATEGORY=BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
	--INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band=BAND.PK_ID_BAND
	WHERE CATEGORY_LIST.FK_ID_Billboard=@Billboard AND BILLBOARD_CATEGORY.FK_ID_Category=@Category AND BILLBOARD_BANDS_LIST.FK_ID_Band=@BandID
END
GO

/************************************************/
CREATE PROCEDURE spDeactivateUser
	@ID VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE MCUSER SET FK_ID_State=1 WHERE Email = @ID;
END
GO

/************************************************/
CREATE PROCEDURE spActivateUser
	@ID VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE MCUSER SET FK_ID_State=2 WHERE Email = @ID;
END
GO

/************************************************/
CREATE PROCEDURE spVerifyUserState
     @ID VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM MCUSER
	WHERE Email=@ID;
END
GO

/************************************************/
CREATE PROCEDURE spGetChefRecommendation
     @FestivalID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM BAND WHERE PK_ID_BAND=1;
END
GO

/************************************************/

/************************************************/

/************************************************/

/************************************************/

/************************************************/

