use antville;

##
## Update table av_user
##

## After conversion to Metadata these columns are obsolete
alter table av_user drop column hash;
alter table av_user drop column salt;
alter table av_user drop column user_url;

## Passwords are not stored in the database anymore
alter table av_user drop column user_password;

## Option to display e-mail in public is obsolete
alter table av_user drop column user_email_ispublic;

## User status is now stored in one column
alter table av_user drop column user_isblocked;
alter table av_user drop column user_istrusted;
alter table av_user drop column user_issysadmin;

## Renaming the remaining columns with more legible names
alter table av_user change column user_id id mediumint(10);
alter table av_user change column user_name name varchar(30);
alter table av_user change column user_email email varchar(255);
alter table av_user change column user_registered created datetime;
alter table av_user change column user_lastvisit modified datetime;

alter table av_user rename user;

##
## Update table av_text
##

alter table av_text change column text_content_new metadata mediumtext;

##
## Update table av_site
##

## Drop legacy columns
alter table av_site drop column SITE_BGCOLOR;
alter table av_site drop column SITE_TEXTFONT;
alter table av_site drop column SITE_TEXTCOLOR;
alter table av_site drop column SITE_TEXTSIZE;
alter table av_site drop column SITE_LINKCOLOR;
alter table av_site drop column SITE_ALINKCOLOR;
alter table av_site drop column SITE_VLINKCOLOR;
alter table av_site drop column SITE_TITLEFONT;
alter table av_site drop column SITE_TITLECOLOR;
alter table av_site drop column SITE_TITLESIZE;
alter table av_site drop column SITE_SMALLFONT;
alter table av_site drop column SITE_SMALLCOLOR;
alter table av_site drop column SITE_SMALLSIZE;

## After conversion to Metadata these columns are obsolete
alter table av_site drop column SITE_TAGLINE;
alter table av_site drop column SITE_DISKUSAGE;
alter table av_site drop column SITE_USERMAYCONTRIB;
alter table av_site drop column SITE_HASDISCUSSIONS;
alter table av_site drop column SITE_SHOWDAYS;
alter table av_site drop column SITE_SHOWARCHIVE;
alter table av_site drop column SITE_LANGUAGE;
alter table av_site drop column SITE_COUNTRY;
alter table av_site drop column SITE_TIMEZONE;
alter table av_site drop column SITE_LONGDATEFORMAT;
alter table av_site drop column SITE_SHORTDATEFORMAT;
alter table av_site drop column SITE_PREFERENCES_OLD;
alter table av_site drop column SITE_EMAIL;
alter table av_site drop column SITE_LASTUPDATE;
alter table av_site drop column SITE_LASTOFFLINE;
alter table av_site drop column SITE_LASTBLOCKWARN;
alter table av_site drop column SITE_LASTDELWARN;
alter table av_site drop column SITE_LASTPING;
alter table av_site drop column SITE_ENABLEPING;

## Site mode has moved to new column (now 'online' or 'offline')
alter table av_site drop column site_isonline;

## Site status is now stored in one column
alter table av_site drop column site_isblocked;
alter table av_site drop column site_istrusted;

## Renaming the remaining columns with more legible names
alter table av_site change column site_id id mediumint(10);
alter table av_site change column site_alias name varchar(30);
alter table av_site change column site_f_layout layout_id mediumint(10);
alter table av_site change column site_title title varchar(255);
alter table av_site change column site_f_user_creator creator mediumint(10);
alter table av_site change column site_f_user_modifier modifier mediumint(10);
alter table av_site change column site_createtime created datetime;
alter table av_site change column site_modifytime modified datetime;

alter table av_site rename site;
