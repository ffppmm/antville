SET AUTOCOMMIT ON;

-----------------------------------
-- Tablespaces for Data and Indexes
-----------------------------------

CREATE TABLESPACE "ANTVILLE" 
    LOGGING 
    DATAFILE 'D:\ORACLE\ORADATA\ORA8\ANTVILLE.ora' SIZE 10M REUSE
    AUTOEXTEND 
    ON NEXT  1024K MAXSIZE UNLIMITED EXTENT MANAGEMENT LOCAL;

CREATE TABLESPACE "ANTVILLE_IDX" 
    LOGGING 
    DATAFILE 'D:\ORACLE\ORADATA\ORA8\ANTVILLE_IDX.ora' SIZE 5M REUSE
    AUTOEXTEND 
    ON NEXT  1024K MAXSIZE UNLIMITED EXTENT MANAGEMENT LOCAL;

------------------------------
-- Database-User
------------------------------

CREATE USER "ANTVILLE"  PROFILE "DEFAULT" 
    IDENTIFIED BY "antville" DEFAULT TABLESPACE "ANTVILLE" 
    TEMPORARY TABLESPACE "TEMP" 
    ACCOUNT UNLOCK;
GRANT "CONNECT" TO "ANTVILLE";
GRANT "RESOURCE" TO "ANTVILLE";

--------------------------------
-- Table structure for ACCESSLOG
--------------------------------

CREATE TABLE "ANTVILLE"."AV_ACCESSLOG" 
   (  "ACCESSLOG_ID" NUMBER(10) NOT NULL, 
      "ACCESSLOG_F_SITE" NUMBER(10), 
      "ACCESSLOG_F_TEXT" NUMBER(10), 
      "ACCESSLOG_REFERRER" VARCHAR2(2000),
      "ACCESSLOG_IP" VARCHAR2(20),
      "ACCESSLOG_BROWSER" VARCHAR2(255),
      "ACCESSLOG_DATE" DATE, 
      PRIMARY KEY("ACCESSLOG_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE" ;

-----------------------------
-- Indexes on table ACCESS
-----------------------------

CREATE INDEX "ANTVILLE"."IDX_ACCESSLOG_F_SITE" ON "ANTVILLE"."AV_ACCESSLOG"("ACCESSLOG_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_ACCESSLOG_F_TEXT" ON "ANTVILLE"."AV_ACCESSLOG"("ACCESSLOG_F_TEXT") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_ACCESSLOG_DATE" ON "ANTVILLE"."AV_ACCESSLOG"("ACCESSLOG_DATE") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for CHOICE
------------------------------

CREATE TABLE "ANTVILLE"."AV_CHOICE" 
   (  "CHOICE_ID" NUMBER(10) NOT NULL,
      "CHOICE_F_POLL" NUMBER(10),
      "CHOICE_TITLE" VARCHAR2(1024),
      "CHOICE_CREATETIME" DATE,
      "CHOICE_MODIFYTIME" DATE,
      PRIMARY KEY("CHOICE_ID")
   )  
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table CHOICE
------------------------------

CREATE INDEX "ANTVILLE"."IDX_CHOICE_F_POLL" ON "ANTVILLE"."AV_CHOICE"("CHOICE_F_POLL") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for FILE
------------------------------

CREATE TABLE "ANTVILLE"."AV_FILE" 
   (  "FILE_ID" NUMBER(10) NOT NULL,
      "FILE_F_SITE" NUMBER(10),
      "FILE_ALIAS" VARCHAR2(255),
      "FILE_MIMETYPE" VARCHAR2(255),
      "FILE_NAME" VARCHAR2(255),
      "FILE_SIZE" NUMBER(10),
      "FILE_DESCRIPTION" VARCHAR2(2000),
      "FILE_REQUESTCNT" NUMBER(10),
      "FILE_CREATETIME" DATE,
      "FILE_F_USER_CREATOR" NUMBER(10),
      "FILE_MODIFYTIME" DATE,
      "FILE_F_USER_MODIFIER" NUMBER(10),
      PRIMARY KEY("FILE_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE" ;

------------------------------
-- Indexes on table FILE
------------------------------

CREATE INDEX "ANTVILLE"."IDX_FILE_F_SITE" ON "ANTVILLE"."AV_FILE"("FILE_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_FILE_ALIAS" ON "ANTVILLE"."AV_FILE"("FILE_ALIAS") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_FILE_F_USER_CREATOR" ON "ANTVILLE"."AV_FILE"("FILE_F_USER_CREATOR") TABLESPACE "ANTVILLE_IDX";


------------------------------
-- Table structure for IMAGE
------------------------------

CREATE TABLE "ANTVILLE"."AV_IMAGE" 
   (  "IMAGE_ID" NUMBER(10) NOT NULL,
      "IMAGE_F_SITE" NUMBER(10),
      "IMAGE_F_IMAGE_PARENT" NUMBER(10),
      "IMAGE_F_IMAGE_THUMB" NUMBER(10),
      "IMAGE_ALIAS" VARCHAR2(255),
      "IMAGE_FILENAME" VARCHAR2(255),
      "IMAGE_FILEEXT" VARCHAR2(30),
      "IMAGE_WIDTH" NUMBER(4),
      "IMAGE_HEIGHT" NUMBER(4),
      "IMAGE_ALTTEXT" VARCHAR2(255),
      "IMAGE_CREATETIME" DATE,
      "IMAGE_F_USER_CREATOR" NUMBER(10),
      "IMAGE_MODIFYTIME" DATE,
      "IMAGE_F_USER_MODIFIER" NUMBER(10),
       PRIMARY KEY("IMAGE_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table IMAGE
------------------------------

CREATE INDEX "ANTVILLE"."IDX_IMAGE_F_SITE" ON "ANTVILLE"."AV_IMAGE"("IMAGE_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_IMAGE_F_IMAGE_PARENT" ON "ANTVILLE"."AV_IMAGE"("IMAGE_F_IMAGE_PARENT") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_IMAGE_F_IMAGE_THUMB" ON "ANTVILLE"."AV_IMAGE"("IMAGE_F_IMAGE_THUMB") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_IMAGE_ALIAS" ON "ANTVILLE"."AV_IMAGE"("IMAGE_ALIAS") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_IMAGE_F_USER_CREATOR" ON "ANTVILLE"."AV_IMAGE"("IMAGE_F_USER_CREATOR") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- records for table IMAGE
------------------------------

insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (1,'big','big','gif',404,53,'antville.org');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (2,'smallanim','smallanim','gif',98,30,'resident of antville.org');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (3,'smallchaos','smallchaos','gif',107,29,'resident of antville.org');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (4,'smallstraight','smallstraight','gif',107,24,'resident of antville.org');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (5,'pixel','pixel','gif',1,1,'pixel');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT) values (6,'headbg','headbg','gif',3,52);
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (7,'menu','menu','gif',36,13,'menu');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (8,'recent','recent','gif',123,13,'recently modified');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (9,'status','status','gif',48,13,'status');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (10,'dot','dot','gif',30,30,'dots');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (11,'bullet','bullet','gif',3,10,'bullet');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (12,'webloghead','webloghead','gif',404,53,'head');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (13,'hop','hop','gif',124,25,'helma object publisher');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (14,'xmlbutton','xmlbutton','gif',36,14,'xml version of this page');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (15,'marquee','marquee','gif',15,15,'marquee');
insert into "ANTVILLE"."AV_IMAGE" (IMAGE_ID,IMAGE_ALIAS,IMAGE_FILENAME,IMAGE_FILEEXT,IMAGE_WIDTH,IMAGE_HEIGHT,IMAGE_ALTTEXT) values (16,'manage','manage','gif',50,13,'manage');
---------------------------------
-- Table structure for MEMBERSHIP
---------------------------------

CREATE TABLE "ANTVILLE"."AV_MEMBERSHIP" 
   (  "MEMBERSHIP_ID" NUMBER(10) NOT NULL,
      "MEMBERSHIP_F_SITE" NUMBER(10),
      "MEMBERSHIP_F_USER" NUMBER(10),
      "MEMBERSHIP_USERNAME" VARCHAR2(255),
      "MEMBERSHIP_LEVEL" NUMBER(10),
      "MEMBERSHIP_CREATETIME" DATE,
      "MEMBERSHIP_MODIFYTIME" DATE,
      "MEMBERSHIP_F_USER_MODIFIER" NUMBER(10),
      PRIMARY KEY("MEMBERSHIP_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )  
   TABLESPACE "ANTVILLE";

-----------------------------
-- Indexes on table MEMBER
-----------------------------

CREATE INDEX "ANTVILLE"."IDX_MEMBERSHIP_F_SITE" ON "ANTVILLE"."AV_MEMBERSHIP"("MEMBERSHIP_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_MEMBERSHIP_F_USER" ON "ANTVILLE"."AV_MEMBERSHIP"("MEMBERSHIP_F_USER") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_MEMBERSHIP_USERNAME" ON "ANTVILLE"."AV_MEMBERSHIP"("MEMBERSHIP_USERNAME") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for POLL
------------------------------

CREATE TABLE "ANTVILLE"."AV_POLL" 
   (  "POLL_ID" NUMBER(10) NOT NULL,
      "POLL_F_SITE" NUMBER(10),
      "POLL_TITLE" VARCHAR2(255),
      "POLL_QUESTION" VARCHAR2(2048),
      "POLL_ISONLINE" NUMBER(1),
      "POLL_CLOSED" NUMBER(1),
      "POLL_CLOSETIME" DATE,
      "POLL_CREATETIME" DATE,
      "POLL_F_USER_CREATOR" NUMBER(10),
      "POLL_MODIFYTIME" DATE,
      "POLL_F_USER_MODIFIER" NUMBER(10),
      PRIMARY KEY("POLL_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table POLL
------------------------------

CREATE INDEX "ANTVILLE"."IDX_POLL_F_SITE" ON "ANTVILLE"."AV_POLL"("POLL_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_POLL_F_USER_CREATOR" ON "ANTVILLE"."AV_POLL"("POLL_F_USER_CREATOR") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for SKIN
------------------------------

CREATE TABLE "ANTVILLE"."AV_SKIN" 
   (  "SKIN_ID" NUMBER(10) NOT NULL,
      "SKIN_F_SITE" NUMBER(10),
      "SKIN_PROTOTYPE" VARCHAR2(255),
      "SKIN_NAME" VARCHAR2(255),
      "SKIN_SOURCE" LONG,
      "SKIN_CREATETIME" DATE,
      "SKIN_F_USER_CREATOR" NUMBER(10),
      "SKIN_MODIFYTIME" DATE,
      "SKIN_F_USER_MODIFIER" NUMBER(10),
      PRIMARY KEY("SKIN_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table SKIN
------------------------------

CREATE INDEX "ANTVILLE"."IDX_SKIN_F_SITE" ON "ANTVILLE"."AV_SKIN"("SKIN_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SKIN_PROTOTYPE" ON "ANTVILLE"."AV_SKIN"("SKIN_PROTOTYPE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SKIN_NAME" ON "ANTVILLE"."AV_SKIN"("SKIN_NAME") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for SYSLOG
------------------------------

CREATE TABLE "ANTVILLE"."AV_SYSLOG" 
   (  "SYSLOG_ID" NUMBER(10) NOT NULL,
      "SYSLOG_TYPE" VARCHAR2(255),
      "SYSLOG_OBJECT" VARCHAR2(255),
      "SYSLOG_ENTRY" VARCHAR2(2000),
      "SYSLOG_CREATETIME" DATE,
      "SYSLOG_F_USER_CREATOR" NUMBER(10),
      PRIMARY KEY("SYSLOG_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table SYSLOG
------------------------------

CREATE INDEX "ANTVILLE"."IDX_SYSLOG_TYPE" ON "ANTVILLE"."AV_SYSLOG"("SYSLOG_TYPE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SYSLOG_OBJECT" ON "ANTVILLE"."AV_SYSLOG"("SYSLOG_OBJECT") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for TEXT
------------------------------

CREATE TABLE "ANTVILLE"."AV_TEXT" 
   (  "TEXT_ID" NUMBER(10) NOT NULL,
      "TEXT_F_SITE" NUMBER(10),
      "TEXT_DAY" VARCHAR2(10),
      "TEXT_TOPIC" VARCHAR2(255),
      "TEXT_PROTOTYPE" VARCHAR2(20),
      "TEXT_F_TEXT_STORY" NUMBER(10),
      "TEXT_F_TEXT_PARENT" NUMBER(10),
      "TEXT_ALIAS" VARCHAR2(255),
      "TEXT_TITLE" VARCHAR2(2000),
      "TEXT_TEXT" VARCHAR2(4000),
      "TEXT_CONTENT" VARCHAR2 (4000),
      "TEXT_RAWCONTENT" VARCHAR2 (4000),
      "TEXT_ISONLINE" NUMBER(1),
      "TEXT_EDITABLEBY" NUMBER(1),
      "TEXT_HASDISCUSSIONS" NUMBER(1),
      "TEXT_CREATETIME" DATE,
      "TEXT_F_USER_CREATOR" NUMBER(10),
      "TEXT_MODIFYTIME" DATE,
      "TEXT_F_USER_MODIFIER" NUMBER(10),
      "TEXT_READS" NUMBER(10),
      "TEXT_IPADDRESS" VARCHAR2(20),
      PRIMARY KEY("TEXT_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table TEXT
------------------------------

CREATE INDEX "ANTVILLE"."IDX_TEXT_F_SITE" ON "ANTVILLE"."AV_TEXT"("TEXT_F_SITE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_DAY" ON "ANTVILLE"."AV_TEXT"("TEXT_DAY") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_TOPIC" ON "ANTVILLE"."AV_TEXT"("TEXT_TOPIC") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_PROTOTYPE" ON "ANTVILLE"."AV_TEXT"("TEXT_PROTOTYPE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_F_TEXT_STORY" ON "ANTVILLE"."AV_TEXT"("TEXT_F_TEXT_STORY") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_F_TEXT_PARENT" ON "ANTVILLE"."AV_TEXT"("TEXT_F_TEXT_PARENT") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_ISONLINE" ON "ANTVILLE"."AV_TEXT"("TEXT_ISONLINE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_TEXT_F_USER_CREATOR" ON "ANTVILLE"."AV_TEXT"("TEXT_F_USER_CREATOR") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for USER
------------------------------

CREATE TABLE "ANTVILLE"."AV_USER" 
   (  "USER_ID" NUMBER(10) NOT NULL,
      "USER_NAME" VARCHAR2(255),
      "USER_PASSWORD" VARCHAR2(255),
      "USER_EMAIL" VARCHAR2(255),
      "USER_EMAIL_ISPUBLIC" NUMBER(1),
      "USER_URL" VARCHAR2(255),
      "USER_REGISTERED" DATE,
      "USER_LASTVISIT" DATE,
      "USER_ISBLOCKED" NUMBER(1),
      "USER_ISTRUSTED" NUMBER(1),
      "USER_ISSYSADMIN" NUMBER(1),
      PRIMARY KEY("USER_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table USER
------------------------------

CREATE INDEX "ANTVILLE"."IDX_USER_NAME" ON "ANTVILLE"."AV_USER"("USER_NAME") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_USER_PASSWORD" ON "ANTVILLE"."AV_USER"("USER_PASSWORD") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_USER_ISBLOCKED" ON "ANTVILLE"."AV_USER"("USER_ISBLOCKED") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_USER_ISTRUSTED" ON "ANTVILLE"."AV_USER"("USER_ISTRUSTED") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_USER_ISSYSADMIN" ON "ANTVILLE"."AV_USER"("USER_ISSYSADMIN") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for VOTE
------------------------------

CREATE TABLE "ANTVILLE"."AV_VOTE" 
   (  "VOTE_ID" NUMBER(10) NOT NULL,
      "VOTE_F_POLL" NUMBER(10),
      "VOTE_F_USER" NUMBER(10),
      "VOTE_F_CHOICE" NUMBER(10),
      "VOTE_USERNAME" VARCHAR2(255),
      "VOTE_CREATETIME" DATE,
      "VOTE_MODIFYTIME" DATE,
      PRIMARY KEY("VOTE_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table VOTE
------------------------------

CREATE INDEX "ANTVILLE"."IDX_VOTE_F_POLL" ON "ANTVILLE"."AV_VOTE"("VOTE_F_POLL") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_VOTE_F_USER" ON "ANTVILLE"."AV_VOTE"("VOTE_F_USER") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_VOTE_F_CHOICE" ON "ANTVILLE"."AV_VOTE"("VOTE_F_CHOICE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_VOTE_USERNAME" ON "ANTVILLE"."AV_VOTE"("VOTE_USERNAME") TABLESPACE "ANTVILLE_IDX";

------------------------------
-- Table structure for SITE
------------------------------

CREATE TABLE "ANTVILLE"."AV_SITE"
   (  "SITE_ID" NUMBER(10) NOT NULL,
      "SITE_TITLE" VARCHAR2(255),
      "SITE_ALIAS" VARCHAR2(255),
      "SITE_TAGLINE" VARCHAR2(255),
      "SITE_EMAIL" VARCHAR2(255),
      "SITE_BGCOLOR" VARCHAR2(6),
      "SITE_TEXTFONT" VARCHAR2(255),
      "SITE_TEXTCOLOR" VARCHAR2(6),
      "SITE_TEXTSIZE" VARCHAR2(4),
      "SITE_LINKCOLOR" VARCHAR2(6),
      "SITE_ALINKCOLOR" VARCHAR2(6),
      "SITE_VLINKCOLOR" VARCHAR2(6),
      "SITE_TITLEFONT" VARCHAR2(255),
      "SITE_TITLECOLOR" VARCHAR2(6),
      "SITE_TITLESIZE" VARCHAR2(4),
      "SITE_SMALLFONT" VARCHAR2(255),
      "SITE_SMALLCOLOR" VARCHAR2(6),
      "SITE_SMALLSIZE" VARCHAR2(4),
      "SITE_ISONLINE" NUMBER(1),
      "SITE_ISBLOCKED" NUMBER(1),
      "SITE_ISTRUSTED" NUMBER(1),
      "SITE_LASTUPDATE" DATE,
      "SITE_LASTOFFLINE" DATE,
      "SITE_LASTBLOCKWARN" DATE,
      "SITE_LASTDELWARN" DATE,
      "SITE_LASTPING" DATE,
      "SITE_ENABLEPING" NUMBER(1),
      "SITE_HASDISCUSSIONS" NUMBER(1),
      "SITE_USERMAYCONTRIB" NUMBER(1),
      "SITE_SHOWDAYS" NUMBER(4),
      "SITE_SHOWARCHIVE" NUMBER(1),
      "SITE_LANGUAGE" VARCHAR2(2),
      "SITE_COUNTRY" VARCHAR2(2),
      "SITE_TIMEZONE" VARCHAR2(32),
      "SITE_LONGDATEFORMAT" VARCHAR2(50),
      "SITE_SHORTDATEFORMAT" VARCHAR2(50),
      "SITE_CREATETIME" DATE,
      "SITE_F_USER_CREATOR" NUMBER(10),
      "SITE_MODIFYTIME" DATE,
      "SITE_F_USER_MODIFIER" NUMBER(10),
      PRIMARY KEY("SITE_ID")
      USING INDEX  
      TABLESPACE "ANTVILLE_IDX"
   )
   TABLESPACE "ANTVILLE";

------------------------------
-- Indexes on table SITE  
------------------------------

CREATE INDEX "ANTVILLE"."IDX_SITE_ALIAS" ON "ANTVILLE"."AV_SITE"("SITE_ALIAS") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SITE_ISONLINE" ON "ANTVILLE"."AV_SITE"("SITE_ISONLINE") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SITE_ISBLOCKED" ON "ANTVILLE"."AV_SITE"("SITE_ISBLOCKED") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SITE_ENABLEPING" ON "ANTVILLE"."AV_SITE"("SITE_ENABLEPING") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SITE_LASTPING" ON "ANTVILLE"."AV_SITE"("SITE_LASTPING") TABLESPACE "ANTVILLE_IDX";
CREATE INDEX "ANTVILLE"."IDX_SITE_F_USER_CREATOR" ON "ANTVILLE"."AV_SITE"("SITE_F_USER_CREATOR") TABLESPACE "ANTVILLE_IDX";

--------------------------------
-- Oracle-specific workaround to
-- simulate auto_increment
--------------------------------

CREATE SEQUENCE "ANTVILLE"."AV_ACCESSLOG_ID" INCREMENT BY 1 START WITH 1 MAXVALUE 9999999999 MINVALUE 1 NOCYCLE CACHE 20 NOORDER;

CREATE TRIGGER "ANTVILLE"."AV_ACCESSLOG_ID"
BEFORE INSERT ON "ANTVILLE"."AV_ACCESSLOG" 
FOR EACH ROW
  begin
  select "ANTVILLE"."AV_ACCESSLOG_ID".nextval into :new.ACCESSLOG_ID from dual;
  end;
/

-----------------------------------------
-- Trigger to automatically insert
-- current time for each ACCESSLOG-record
-----------------------------------------

CREATE TRIGGER "ANTVILLE"."AV_ACCESSLOG_DATE"
BEFORE INSERT ON "ANTVILLE"."AV_ACCESSLOG" 
FOR EACH ROW
  begin
  select sysdate into :new.ACCESSLOG_DATE from dual;
  end;
/

SET AUTOCOMMIT OFF;