use antville;

#-----------------------------
# Indexes for ACCESS
#-----------------------------

create index IDX_WEBLOG_ID on ACCESS (WEBLOG_ID);
create index IDX_STORY_ID on ACCESS (STORY_ID);
create index IDX_DATE on ACCESS (DATE);
create index IDX_REFERRER on ACCESS (REFERRER(30));

#-----------------------------
# Indexes for WEBLOG
#-----------------------------

CREATE INDEX IDX_ALIAS ON WEBLOG (ALIAS(50));
CREATE INDEX IDX_ISONLINE ON WEBLOG (ISONLINE);
CREATE INDEX IDX_CREATOR ON WEBLOG (CREATOR);

#-----------------------------
# Indexes for GOODIE
#-----------------------------

CREATE INDEX IDX_WEBLOG_ID ON GOODIE (WEBLOG_ID);
CREATE INDEX IDX_ALIAS ON GOODIE (ALIAS(50));
CREATE INDEX IDX_CREATOR ON GOODIE (CREATOR);

#-----------------------------
# Indexes for IMAGE
#-----------------------------

CREATE INDEX IDX_WEBLOG_ID ON IMAGE (WEBLOG_ID);
CREATE INDEX IDX_ALIAS ON IMAGE (ALIAS(50));
CREATE INDEX IDX_PARENT_ID ON IMAGE (PARENT_ID);
CREATE INDEX IDX_THUMBNAIL_ID ON IMAGE (THUMBNAIL_ID);
CREATE INDEX IDX_CREATOR ON IMAGE (CREATOR);

#-----------------------------
# Indexes for TEXT
#-----------------------------

CREATE INDEX IDX_WEBLOG_ID ON TEXT (WEBLOG_ID);
CREATE INDEX IDX_TOPIC ON TEXT (TOPIC);
CREATE INDEX IDX_DAY ON TEXT (DAY);
CREATE INDEX IDX_PROTOTYPE ON TEXT (PROTOTYPE);
CREATE INDEX IDX_STORY_ID ON TEXT (STORY_ID);
CREATE INDEX IDX_PARENT_ID ON TEXT (PARENT_ID);
CREATE INDEX IDX_ISONLINE ON TEXT (ISONLINE);
CREATE INDEX IDX_CREATOR ON TEXT (AUTHOR);

#-----------------------------
# Indexes for MEMBER
#-----------------------------

CREATE INDEX IDX_WEBLOG_ID ON MEMBER (WEBLOG_ID);
CREATE INDEX IDX_USER_ID ON MEMBER (USER_ID);
CREATE INDEX IDX_USERNAME ON MEMBER (USERNAME(30));
CREATE INDEX IDX_LEVEL ON MEMBER (LEVEL);

#-----------------------------
# Indexes for SKIN
#-----------------------------

CREATE INDEX IDX_WEBLOG_ID ON SKIN (WEBLOG_ID);
CREATE INDEX IDX_PROTO ON SKIN (PROTO(10));
CREATE INDEX IDX_NAME ON SKIN (NAME(30));

#-----------------------------
# Indexes for USER
#-----------------------------

CREATE INDEX IDX_USERNAME ON USER (USERNAME(30));
CREATE INDEX IDX_PASSWORD ON USER (PASSWORD(30));
CREATE INDEX IDX_ISBLOCKED ON USER (ISBLOCKED);
CREATE INDEX IDX_ISTRUSTED ON USER (ISTRUSTED);
CREATE INDEX IDX_ISSYSADMIN ON USER (ISSYSADMIN);

#----------------------------
# Indexes on table POLL
#----------------------------

CREATE INDEX IDX_WEBLOG_ID ON POLL (WEBLOG_ID);
CREATE INDEX IDX_USER_ID ON POLL (USER_ID);

#----------------------------
# Indexes on table CHOICE
#----------------------------

CREATE INDEX IDX_POLL_ID ON CHOICE (POLL_ID);

#----------------------------
# Indexes on table VOTE
#----------------------------

CREATE INDEX IDX_POLL_ID ON VOTE (POLL_ID);
CREATE INDEX IDX_USER_ID ON VOTE (USER_ID);
CREATE INDEX IDX_CHOICE_ID ON VOTE (CHOICE_ID);

