# The IPA-API
- [ ] start migrating to TypeScript

## What

I am an occasional beer drinker, but I'm picky. I like to try out different local craft beers yet I know next to nothing about beer in general. The descriptions on a lot of the packaging I see tend to be vague and more or less reserved for those who are 'Beer People'. While I could spend time researching the terms used and different flavor profiles, I already have more hobbies than I can keep up with and I'd rather just drink the beer.

This application will serve the purpose of documenting different beverages, their stats and the flavor profile, in an effort to make the selection of any beverage more straight foreward. No longer will you just have to choose the 'coolest looking can design' or only buy what you are familiar with!

## How

This application will leverage an Apollo GraphQL API fronting a PostgreSql database. Eventually I plan on adding user authentication (currently underway) so more people other than myself can access the information and if they possess authorization roles. Once a rough implementation is drafted, I'd like to add a caching layer with Redis to save time hitting the database.

## Why

While I think this application is kinda cool and useful, I understand most other people will either not care, or just learn enough to know what beer they're buying. So this application _mostly_ serves as an exercise in integrating various development technologies and practices. If it turns out useful, I'll release it to the public. But in order to do that with good conscious, I will need other peoples' eyes on this to aid in some way or another.

## Other Info

This application currently uses a locally hosted PostgreSQL database. Use whatever db name, user name and password you want, but you'll have to set that up yourself.

Some environment variables I'm using:
```
DB_NAME
DB_USER
DB_USER_PW
```
 
