ALTER TABLE MCUSER
ADD CONSTRAINT FK_MCUserCountry
FOREIGN KEY (FK_ID_Country) REFERENCES COUNTRY(PK_ID_COUNTRY);

ALTER TABLE MCUSER
ADD CONSTRAINT FK_MCUser_University
FOREIGN KEY (FK_ID_University) REFERENCES UNIVERSITY(PK_ID_UNIVERSITY);

ALTER TABLE MCUSER
ADD CONSTRAINT FK_MCUser_State
FOREIGN KEY (FK_ID_State) REFERENCES USER_STATE(PK_ID_USER_STATE);

ALTER TABLE MCUSER
ADD CONSTRAINT MCUSER_Unique_Email 
Unique (Email);

ALTER TABLE MCUSER_ADMIN
ADD CONSTRAINT FK_MCUSER_ADMIN_State
FOREIGN KEY (FK_ID_State) REFERENCES USER_STATE(PK_ID_USER_STATE);

ALTER TABLE MCUSER_ADMIN
ADD CONSTRAINT MCUSER_ADMIN_Unique_Email 
Unique (Email);

ALTER TABLE USER_GENRE_LIST
ADD CONSTRAINT FK_Genre_List_User
FOREIGN KEY (FK_ID_User) REFERENCES MCUSER(PK_ID_MCUSER);

ALTER TABLE USER_GENRE_LIST
ADD CONSTRAINT FK_Genre_List_Genre
FOREIGN KEY (FK_ID_Genre) REFERENCES GENRE(PK_ID_GENRE);

ALTER TABLE BILLBOARD
ADD CONSTRAINT FK_Billboard_EventState
FOREIGN KEY (FK_ID_EventState) REFERENCES EVENT_STATE(PK_ID_EVENT_STATE);

ALTER TABLE FESTIVAL
ADD CONSTRAINT FK_Festival_Billboard
FOREIGN KEY (FK_ID_Billboard) REFERENCES BILLBOARD(PK_ID_BILLBOARD);

ALTER TABLE FESTIVAL
ADD CONSTRAINT FK_Festival_EventState
FOREIGN KEY (FK_ID_EventState) REFERENCES EVENT_STATE(PK_ID_EVENT_STATE);

ALTER TABLE FESTIVAL 
ADD CONSTRAINT FK_Festival_Ubication
FOREIGN KEY (FK_ID_Ubication) REFERENCES FESTIVAL_UBICATION(PK_ID_FESTIVAL_UBICATION);

ALTER TABLE USER_VOTE
ADD CONSTRAINT FK_USER_VOTE_Billboard
FOREIGN KEY (FK_ID_Billboard) REFERENCES BILLBOARD(PK_ID_BILLBOARD);

ALTER TABLE USER_VOTE
ADD CONSTRAINT FK_USER_VOTE_User
FOREIGN KEY (FK_ID_User) REFERENCES MCUSER(PK_ID_MCUSER);

ALTER TABLE CATEGORY_LIST
ADD CONSTRAINT FK_ID_CATEGORY_LIST_Billboard
FOREIGN KEY (FK_ID_Billboard) REFERENCES BILLBOARD(PK_ID_BILLBOARD);

ALTER TABLE CATEGORY_LIST
ADD CONSTRAINT FK_ID_CATEGORY_LIST_BillboardCategory
FOREIGN KEY (FK_ID_BillboardCategory) REFERENCES BILLBOARD_CATEGORY(PK_ID_BILLBOARD_CATEGORY);

ALTER TABLE BILLBOARD_CATEGORY
ADD CONSTRAINT FK_BILLBOARD_CATEGORY_Category
FOREIGN KEY (FK_ID_Category) REFERENCES CATEGORY(PK_ID_CATEGORY);

ALTER TABLE FESTIVAL_CATEGORY_LIST
ADD CONSTRAINT FK_FESTIVAL_CATEGORY_LIST_Festival
FOREIGN KEY (FK_ID_Festival) REFERENCES FESTIVAL(PK_ID_FESTIVAL);

ALTER TABLE FESTIVAL_CATEGORY_LIST
ADD CONSTRAINT FK_FESTIVAL_CATEGORY_LIST_FestivalCategory
FOREIGN KEY (FK_ID_FestivalCategory) REFERENCES CATEGORY(PK_ID_CATEGORY);

ALTER TABLE FESTIVAL_BANDS_LIST
ADD CONSTRAINT FK_FESTIVAL_BANDS_LIST_FestivalCategory
FOREIGN KEY (FK_ID_FestivalCategory) REFERENCES FESTIVAL_CATEGORY_LIST(PK_ID_FESTIVAL_CATEGORY_LIST);

ALTER TABLE FESTIVAL_BANDS_LIST
ADD CONSTRAINT FK_FESTIVAL_BANDS_LIST_Band
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);

ALTER TABLE BILLBOARD_BANDS_LIST
ADD CONSTRAINT FK_BILLBOARD_BANDS_LIST_BillboardCategory
FOREIGN KEY (FK_ID_BillboardCategory) REFERENCES BILLBOARD_CATEGORY(PK_ID_BILLBOARD_CATEGORY);

ALTER TABLE BILLBOARD_BANDS_LIST
ADD CONSTRAINT FK_BILLBOARD_BANDS_LIST_Band 
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);

ALTER TABLE BAND_GENRE_LIST 
ADD CONSTRAINT FK_BAND_GENRE_LIST_Band
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);

ALTER TABLE BAND_GENRE_LIST 
ADD CONSTRAINT FK_BAND_GENRE_LIST_Genre
FOREIGN KEY (FK_ID_Genre) REFERENCES GENRE(PK_ID_GENRE);

ALTER TABLE BAND_ARTIST
ADD CONSTRAINT FK_BAND_ARTIST_Band
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);

ALTER TABLE BAND_ARTIST
ADD CONSTRAINT FK_BAND_ARTIST_Artist
FOREIGN KEY (FK_ID_Artist) REFERENCES ARTIST(PK_ID_ARTIST);

ALTER TABLE COMMENT_LIST
ADD CONSTRAINT FK_COMMMENT_LIST_Band
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);

ALTER TABLE COMMENT_LIST
ADD CONSTRAINT FK_COMMENT_LIST_Comment
FOREIGN KEY (FK_ID_Comment) REFERENCES COMMENT(PK_ID_COMMENTS);

ALTER TABLE COMMENT
ADD CONSTRAINT FK_COMMENT_User
FOREIGN KEY (FK_ID_User) REFERENCES MCUSER(PK_ID_MCUSER);

ALTER TABLE SONG_LIST
ADD CONSTRAINT FK_SONG_LIST_Song
FOREIGN KEY (FK_ID_Song) REFERENCES SONG(PK_ID_SONG);

ALTER TABLE SONG_LIST
ADD CONSTRAINT FK_SONG_LIST_Band
FOREIGN KEY (FK_ID_Band) REFERENCES BAND(PK_ID_BAND);