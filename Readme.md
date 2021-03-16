# The IPA-API
- [ ] start migrating to TypeScript

## What

I am an occasional beer drinker, but I'm picky. I like to try out different local craft beers yet I know next to nothing about beer in general. The descriptions on a lot of the packaging I see tend to be vague and more or less reserved for those who are 'Beer People'. While I could spend time researching the terms used and different flavor profiles, I already have more hobbies than I can keep up with and I'd rather just drink the beer.

This application will serve the purpose of documenting different beverages, their stats and the flavor profile, in an effort to make the selection of any beverage more straight foreward. No longer will you just have to choose the 'coolest looking can design' or only buy what you are familiar with!

## How

This application will leverage an Express/Apollo GraphQL API fronting a MongoDB database. Eventually I plan on adding user authentication so more people other than myself can access the information and if they possess authorization roles. Once a rough implementation is drafted, I'd like to add a caching layer with Redis to save time hitting the database.

## Why

While I think this application is kinda cool and useful, I understand most other people will either not care, or just learn enough to know what beer they're buying. So this application _mostly_ serves as an exercise in integrating various development technologies and practices. If it turns out useful, I'll release it to the public. But in order to do that with good conscious, I will need other peoples' eyes on this to aid in some way or another.

## Other Info

This application assumes you have at least a free-teir MongoDB instance running somewhere with the necessary environment variables:

```
MONGO_CLUSTER_URL
MONGO_USERNAME
MONGO_PASSWORD
```
 
