# Bug Fixing In Backend Section
All `Bugs` that occure in `Backend` section will be listed here. Please write details if you find any bug. Also `report an #issue in GitHub` please.
If you find any bug in Frontend section please write it in [BugFixingFrontendREADME.md](./client/BugFixingFrontendREADME.md).


## ObjectId Comparision
Links
- stackoverflow [Comparing mongoose _id and strings](https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings)
- medium [Comparing Mongoose Object ID often fails](https://medium.com/@mzndako/comparing-mongoose-object-id-often-fail-a7374a779f6d)

Fixing: 
- DO NOT directly compare two `ObjectId`
- DO NOT USE `.toString()` ! Because: `IF ObjectId is null then ERROR!!!` like: `Cannot read property 'toString' of null`
- USE `String()` or `.equals()` BUT `String()` is safe
- DO NOT CONVERT TO `String()` WHEN COMPARE WITH `null` ! like: `String(this._id) === null` is WRONG... AND RIGHT is: `this._id === null`

## Find by id or username in mongo
- stackoverflow [Find by id or username in mongo](https://stackoverflow.com/questions/30651875/find-by-id-or-username-in-mongo)

