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
	@pPass VARCHAR(64)
AS
BEGIN
	DECLARE @a INT;
	DECLARE @b INT;
	DECLARE @r INT;
	SET @r=0;
	SET @a = (SELECT COUNT(*) FROM MCUSER_ADMIN WHERE ( Email=@pEmail AND MCPassword=@pPass));
	SET @b = (SELECT COUNT(*) FROM MCUSER WHERE ( Email=@pEmail AND MCPassword=@pPass));
	IF(@a=1) BEGIN
		SET @r =1;	--Admin
	END IF(@b=1) BEGIN
		IF( (SELECT FK_ID_State FROM MCUSER WHERE Email=@pEmail)=1) BEGIN
			SET @r =2;	--User
		END ELSE BEGIN
			SET @r =3;	--User blocked
		END
	END
	SELECT @r AS 'State'
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
	@pPass VARCHAR(64),
	@pDescription VARCHAR(300),
	@pBirthdate varchar(20)	
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
		VALUES (@pName, @pLastname,@id, @pResidence, @pUni_ID, @pEmail, @pPhone, @pPhoto, (getdate()),@pPass,@pDescription,@pBirthdate,1);
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
	@pBirthdate varchar(20)	
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

	SET @c = (SELECT COUNT(*) FROM MCUSER WHERE Email=@pEmail)
	IF(@c=1) BEGIN
		UPDATE MCUSER 
		SET Name=@pName, LastName=@pLastname ,FK_ID_Country=@pCountry, Residence=@pResidence, 
			FK_ID_University=@pUni_ID, Phone=@pPhone, Photo=@pPhoto, MCPassword=@pPass, 
			PersonalDescription=@pDescription, Birthdate=@pBirthdate
		WHERE Email=@pEmail; 
		SELECT 'ok' AS 'State';
	END ELSE BEGIN
		SELECT 'Error' AS 'State';
	END
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
	SELECT 'ok' as 'State';
END
GO

/************************************************/
CREATE PROCEDURE spRegisterAdmin
	@pName VARCHAR(30),
	@pLastname VARCHAR(30),
	@pEmail VARCHAR(50),
	@pPass VARCHAR(70)	

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
		UPDATE MCUSER_ADMIN SET LastName = @pLastname WHERE Email = @pEmail;
		UPDATE MCUSER_ADMIN SET MCPassword = @pPass	WHERE Email = @pEmail;
		SELECT 'ok' AS 'State';
	END ELSE BEGIN
		SELECT 'No user email' AS 'State';
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
				INNER JOIN CATEGORY ON CATEGORY_LIST.FK_ID_BillboardCategory=CATEGORY.PK_ID_CATEGORY
				INNER JOIN BILLBOARD_BANDS_LIST ON CATEGORY_LIST.PK_ID_CATEGORY = BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
				INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
				WHERE BAND.PK_ID_BAND=@ID);
	SET @c2 = (SELECT COUNT(*) FROM FESTIVAL_CATEGORY_LIST
				INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_CATEGORY_LIST.PK_ID_FESTIVAL_CATEGORY_LIST = FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory
				INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
				WHERE BAND.PK_ID_BAND=@ID);
	IF(@c1=0 AND @c2=0)BEGIN
		UPDATE BAND SET BAND.BandState=0 WHERE BAND.PK_ID_BAND=@ID;
	END ELSE BEGIN
		SELECT 'error' as 'Status';
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
		INSERT INTO BAND (Name, ID_Spotify, BandState, N_Calification, Calification) VALUES(@pName, @pSpotifyID, 1,5,0);
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
	SELECT * FROM COUNTRY;
END
GO

/************************************************/
CREATE PROCEDURE spGetUniversities
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM UNIVERSITY
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
	
	SELECT 'ok' as 'State';

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
	SELECT 'ok' AS 'State'
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

	SELECT 'ok' AS 'State'
END
GO

/************************************************/
CREATE PROCEDURE spGetBandsFromFestivalCategory
	@pIDFestival INT,
	@pIDCategory INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT BAND.PK_ID_BAND AS 'id', BAND.Name AS 'name', BAND.Calification AS 'calification', BAND.N_Calification AS 'numberC', BAND.ID_Spotify AS 'spotifyID', BAND.BandState as 'state' 
	FROM FESTIVAL_CATEGORY_LIST 
	INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory = FESTIVAL_CATEGORY_LIST.PK_ID_FESTIVAL_CATEGORY_LIST
	INNER JOIN BAND ON FESTIVAL_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
	WHERE FESTIVAL_CATEGORY_LIST.FK_ID_Festival = @pIDFestival AND FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory = @pIDCategory;
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
	SELECT BILLBOARD.PK_ID_BILLBOARD AS 'id', BILLBOARD.Name AS 'name', BILLBOARD.BillboardPhoto AS 'image', BILLBOARD.BillboardDescription AS 'description', PLACE.Name AS 'location' 
	FROM BILLBOARD 
	INNER JOIN PLACE ON PLACE.PK_ID_PLACE = FK_ID_Place
	WHERE PK_ID_BILLBOARD=@ID;
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
		SELECT 'No user' as 'State';
	END
	
END
GO

/************************************************/
CREATE PROCEDURE spGetAllCategories
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM CATEGORY WHERE PK_ID_CATEGORY<>1;
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
	SELECT PK_ID_FESTIVAL AS 'id', BILLBOARD.Name AS 'name', BILLBOARD.BillboardDescription AS 'description', FESTIVAL.FestivalStart AS 'date', BILLBOARD.BillboardPhoto AS 'image', EVENT_STATE.Name AS 'state', Festival_Ubication.Name AS 'place', Place.Name AS 'location' 
	FROM FESTIVAL
	INNER JOIN BILLBOARD ON FESTIVAL.FK_ID_Billboard = BILLBOARD.PK_ID_BILLBOARD
	INNER JOIN PLACE ON FESTIVAL.FK_ID_Ubication = PLACE.PK_ID_PLACE
	INNER JOIN EVENT_STATE ON FESTIVAL.FK_ID_EventState = EVENT_STATE.PK_ID_EVENT_STATE
	INNER JOIN Festival_Ubication ON FESTIVAL.FK_ID_Ubication = Festival_Ubication.PK_ID_FESTIVAL_UBICATION;
END
GO

/************************************************/
CREATE PROCEDURE spGetAllBillboards
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @daysleft INT;
	SELECT PK_ID_BILLBOARD AS 'id', BILLBOARD.Name AS 'name', PLACE.Name AS 'location', Billboard.EndVotingDate AS 'timeLeft' , BillboardPhoto AS 'image', EVENT_STATE.Name AS 'state'
	FROM BILLBOARD 
	INNER JOIN EVENT_STATE ON BILLBOARD.FK_ID_EventState=EVENT_STATE.PK_ID_EVENT_STATE
	INNER JOIN PLACE ON BILLBOARD.FK_ID_Place=PLACE.PK_ID_PLACE
	WHERE EVENT_STATE.PK_ID_EVENT_STATE=1 OR EVENT_STATE.PK_ID_EVENT_STATE=2
	;
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
CREATE PROCEDURE spGetAllBandsWithoutBillboard
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	((SELECT PK_ID_BAND AS 'ID',ID_Spotify AS 'spotifyID', Band.Name AS 'name', (Calification/N_Calification) AS 'rating'
	FROM BAND)
	EXCEPT
	(SELECT BILLBOARD_BANDS_LIST.FK_ID_Band, BAND.ID_Spotify, BAND.Name, Calification/N_Calification
	FROM BILLBOARD_BANDS_LIST
	INNER JOIN CATEGORY_LIST ON CATEGORY_LIST.PK_ID_CATEGORY = BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
	INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band = BAND.PK_ID_BAND
	WHERE FK_ID_Billboard = @ID));
END
GO

/************************************************/
CREATE PROCEDURE spGetAllActiveBands
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM BAND WHERE BandState=1;
END
GO

/************************************************/
CREATE PROCEDURE spAddBillboard
     @pName VARCHAR(30),
     @pStartVotingDate varchar(20),
     @pEndVotingDate varchar(20),
     @pPlaceID INT,
	 @pDescription VARCHAR(300)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO BILLBOARD(Name, StartVotingDate, EndVotingDate, FK_ID_Place, FK_ID_EventState, BillboardDescription) 
	VALUES(@pName, @pStartVotingDate, @pEndVotingDate, @pPlaceID, 1, @pDescription);
	DECLARE @a INT;
	SET @a = (SELECT PK_ID_BILLBOARD FROM BILLBOARD WHERE PK_ID_BILLBOARD= SCOPE_IDENTITY()); 
	SELECT @a AS 'ID';
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
	VALUES (@BillboardID, @CategoryID);
	SELECT SCOPE_IDENTITY() AS 'id';
END
GO

/************************************************/
CREATE PROCEDURE spAddFestival
           @pBillboardID INT,
           @pStartDate varchar(20),
		   @pEndDate varchar(20),
		   @pUbication VARCHAR(100),
           @pDescription VARCHAR (300)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @v INT;
	SET @v = (SELECT COUNT(*) FROM FESTIVAL WHERE FK_ID_Billboard=@pBillboardID);
	IF(@v=0) BEGIN
		DECLARE @c INT;
		SET @c = (SELECT COUNT(*) FROM Festival_Ubication WHERE Name=@pUbication);
		IF(@c=0) BEGIN
			INSERT INTO Festival_Ubication (Name) VALUES (@pUbication)
		END
		DECLARE @newplace INT;
		SET @newplace = (SELECT PK_ID_FESTIVAL_UBICATION FROM Festival_Ubication WHERE Name=@pUbication);
		UPDATE BILLBOARD SET FK_ID_EventState=3 WHERE BILLBOARD.PK_ID_BILLBOARD=@pBillboardID;
		INSERT INTO FESTIVAL(FK_ID_Billboard, FestivalStart, FestivalEnd, FK_ID_EventState, FK_ID_Ubication,FestivalDescription)
		VALUES (@pBillboardID, @pStartDate, @pEndDate, 1,@newplace,@pDescription);
		SELECT SCOPE_IDENTITY() AS 'FestivalID'
	END ELSE BEGIN
		SELECT 'error' AS 'State'
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
	INSERT INTO FESTIVAL_CATEGORY_LIST(FK_ID_Festival, FK_ID_FestivalCategory)
	VALUES (@pFestivalID,@pCategoryID );
	SELECT SCOPE_IDENTITY() AS 'ID';
END
GO

/************************************************/
CREATE PROCEDURE spAddBandToFestival
	@pCategoryID INT,
	@pBandID INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO FESTIVAL_BANDS_LIST(FK_ID_FestivalCategory, FK_ID_Band) 
	VALUES (@pCategoryID, @pBandID);
	--SELECT 'ok' AS 'state';
END
GO


/************************************************/
CREATE PROCEDURE spGetCategoriesFromFest
     @ID INT
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM FESTIVAL_CATEGORY_LIST
	INNER JOIN CATEGORY ON FESTIVAL_CATEGORY_LIST.FK_ID_FestivalCategory = CATEGORY.PK_ID_CATEGORY
	WHERE FK_ID_Festival=@ID;
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
	DECLARE @oldpts INT;
	DECLARE @count INT;
	SET @oldpts = (SELECT Calification FROM BAND WHERE PK_ID_BAND=@Band);
	SET @count= (SELECT N_Calification FROM BAND WHERE PK_ID_BAND=@Band);
	UPDATE BAND SET Calification=(@oldpts+@Points) WHERE PK_ID_BAND=@Band;
	UPDATE BAND SET N_Calification = (@count+1) WHERE PK_ID_BAND=@Band;
END
GO

/************************************************/
CREATE PROCEDURE spCheckUserVoteBillboard
     @UserID VARCHAR(50),
     @BillboardID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT COUNT(*) AS 'vote' FROM USER_VOTE
	JOIN MCUSER ON USER_VOTE.FK_ID_User = MCUSER.PK_ID_MCUSER
	WHERE FK_ID_Billboard=@BillboardID AND	MCUSER.Email=@UserID;
END
GO

/************************************************/
CREATE PROCEDURE spPostUserVote
     @UserID VARCHAR(30),
     @BillboardID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @ID INT;
	SET @ID = (SELECT PK_ID_MCUSER FROM MCUSER WHERE @UserID=Email);
	IF(@ID=NULL) BEGIN
		SELECT 'No such user' AS 'error';
	END ELSE BEGIN
		INSERT INTO USER_VOTE(FK_ID_Billboard, FK_ID_User) VALUES (@BillboardID, @ID);
	END
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
	INNER JOIN CATEGORY ON CATEGORY_LIST.FK_ID_BillboardCategory=CATEGORY.PK_ID_CATEGORY
	INNER JOIN BILLBOARD_BANDS_LIST ON CATEGORY_LIST.PK_ID_CATEGORY = BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
	--INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band=BAND.PK_ID_BAND
	WHERE CATEGORY_LIST.FK_ID_Billboard=@Billboard AND CATEGORY.PK_ID_CATEGORY = @Category AND BILLBOARD_BANDS_LIST.FK_ID_Band=@BandID
END
GO

/************************************************/
CREATE PROCEDURE spDeactivateUser
	@ID VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE MCUSER SET FK_ID_State=2 WHERE Email = @ID;
	UPDATE MCUSER_ADMIN SET FK_ID_State=2 WHERE Email = @ID;
END
GO

/************************************************/
CREATE PROCEDURE spActivateUser
	@ID VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE MCUSER SET FK_ID_State=1 WHERE Email = @ID;
	UPDATE MCUSER_ADMIN SET FK_ID_State=1 WHERE Email = @ID;
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
CREATE PROCEDURE spAddBillboardPhoto
	@BillboardID INT,
	@Photo VARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE BILLBOARD SET BillboardPhoto=@Photo WHERE PK_ID_BILLBOARD=@BillboardID;
END
GO

/************************************************/
CREATE PROCEDURE spGetAdminInfo
	@pEmail VARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT PK_ID_MCUSER_ADMIN, MCUSER_ADMIN.Name, LastName, Email, MCpassword, USER_STATE.Name AS 'UserState',RegistrationDate FROM MCUSER_ADMIN 
	INNER JOIN USER_STATE ON PK_ID_USER_STATE=FK_ID_State
	WHERE Email=@pEmail;
END
GO

/************************************************/
CREATE PROCEDURE spDeactivateBillboard
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE BILLBOARD SET FK_ID_EventState = 2 WHERE PK_ID_BILLBOARD=@ID;
END
GO


/************************************************/
CREATE PROCEDURE spDeactivateFestival
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE FESTIVAL SET FK_ID_EventState = 3 WHERE PK_ID_FESTIVAL = @ID;
END
GO

/***********************************************/
CREATE PROCEDURE spAddBandToBillboard
        @BillboardCategoryID INT,
        @CategoryID INT,
        @BandID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @c INT;
	SET @c = (SELECT PK_ID_CATEGORY FROM CATEGORY_LIST WHERE FK_ID_Billboard=@BillboardCategoryID AND FK_ID_BillboardCategory=@CategoryID)
	IF(@c=NULL) BEGIN
		SELECT 'no such category' as 'error';
	END 
	ELSE BEGIN
		INSERT INTO BILLBOARD_BANDS_LIST(FK_ID_BillboardCategory, FK_ID_Band, RaisedMoney) 
		VALUES (@CategoryID ,@BandID,0); 		
	END
END
GO

/************************************************/
CREATE PROCEDURE spGetCategoriesFromBillboard
     @ID INT
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT CATEGORY.PK_ID_CATEGORY, CATEGORY.Name 
	FROM CATEGORY_LIST
	INNER JOIN CATEGORY ON CATEGORY_LIST.FK_ID_BillboardCategory = CATEGORY.PK_ID_CATEGORY
	WHERE CATEGORY_LIST.FK_ID_Billboard = @ID;
END
GO


/************************************************/
CREATE PROCEDURE spAddVote
	@BandID INT,
	@BillboardID INT,
	@CategoryID INT,
	@Money INT
AS 
BEGIN
	SET NOCOUNT ON;
	DECLARE @m INT;
	SET @m = (SELECT PK_ID_BILLBOARD_BANDS_LIST FROM BILLBOARD_BANDS_LIST 
			INNER JOIN CATEGORY_LIST ON CATEGORY_LIST.PK_ID_CATEGORY=BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
			WHERE BILLBOARD_BANDS_LIST.FK_ID_Band=@BandID AND CATEGORY_LIST.FK_ID_Billboard=@BillboardID);
	DECLARE @lastmoney INT;
	SET @lastmoney = (SELECT RaisedMoney FROM BILLBOARD_BANDS_LIST WHERE PK_ID_BILLBOARD_BANDS_LIST=@m);
	UPDATE BILLBOARD_BANDS_LIST SET RaisedMoney=@lastmoney+@Money WHERE PK_ID_BILLBOARD_BANDS_LIST=@m
END
GO

/************************************************/
CREATE PROCEDURE spGetBandsFromBillboardCategoryOrderByMoney
	@pIDBillboard INT,
    @pIDCategory INT
AS 
BEGIN
	SET NOCOUNT ON;
	SELECT BAND.PK_ID_BAND AS 'id', BAND.Name AS 'name', BILLBOARD_BANDS_LIST.RaisedMoney AS 'money', BAND.ID_spotify AS 'spotifyID'
	FROM BILLBOARD_BANDS_LIST
	INNER JOIN CATEGORY_LIST ON BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory = CATEGORY_LIST.PK_ID_CATEGORY
	INNER JOIN BAND ON BILLBOARD_BANDS_LIST.FK_ID_Band =BAND.PK_ID_BAND
	WHERE CATEGORY_LIST.PK_ID_CATEGORY=@pIDCategory-- AND CATEGORY_LIST.FK_ID_BillboardCategory=@pIDBillboard
	ORDER BY BILLBOARD_BANDS_LIST.RaisedMoney DESC;
	--SELECT BAND.PK_ID_BAND AS 'id', BAND.Name AS 'name', BILLBOARD_BANDS_LIST.RaisedMoney AS 'money', BAND.ID_spotify AS 'spotifyID'
	--FROM CATEGORY_LIST
	--INNER JOIN BILLBOARD_BANDS_LIST ON CATEGORY_LIST.PK_ID_CATEGORY = BILLBOARD_BANDS_LIST.FK_ID_BillboardCategory
	--INNER JOIN BAND ON BAND.PK_ID_BAND= BILLBOARD_BANDS_LIST.FK_ID_Band
	--WHERE CATEGORY_LIST.PK_ID_CATEGORY=@pIDBillboard AND CATEGORY_LIST.FK_ID_BillboardCategory=@pIDCategory
	--ORDER BY BILLBOARD_BANDS_LIST.RaisedMoney DESC;
END
GO


/************************************************/
CREATE PROCEDURE spGetBandRating
	@ID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @r INT;
	SET @r= (SELECT BAND.N_Calification  FROM BAND WHERE PK_ID_BAND=@ID);
	IF(@r=0) BEGIN
		SELECT 0 AS 'rating';
	END ELSE BEGIN
		SELECT BAND.Calification/@r AS 'rating' FROM BAND WHERE PK_ID_BAND=@ID
	END
END
GO

/************************************************/
CREATE PROCEDURE spBandAvailable
	@BandID INT,
	@Start varchar(20),
	@End varchar(20)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 0 AS 'status'
--	SELECT COUNT(*) AS 'status'
--	FROM FESTIVAL
--	INNER JOIN FESTIVAL_CATEGORY_LIST ON FK_ID_Festival=PK_ID_FESTIVAL
--	INNER JOIN FESTIVAL_BANDS_LIST ON FESTIVAL_BANDS_LIST.FK_ID_FestivalCategory =FESTIVAL_CATEGORY_LIST.PK_ID_FESTIVAL_CATEGORY_LIST
--	INNER JOIN BAND ON FK_ID_Band=PK_ID_BAND
--	WHERE PK_ID_BAND=@BandID 
--	AND ((DATEDIFF(day,FestivalStart,@End)>0)
--		OR (DATEDIFF(day,FestivalEnd,@Start)>0)); 
END
GO






















