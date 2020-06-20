# Author API
*Author* is the writter of *Book*.

## GET | Get All Authors
```bash
    {{URL}}api/v1/authors
```

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `name`: `String`, Full name of the *Author*
- `nicname`: `String`, Nicname of the *Author*
- `verified`: `Boolean`
- `realUser`: `UserId`, If Author is a `User` too
- `gender`: `String` of choise fields:  ['male', 'female', 'other']
- `bio`: `String`, about *Author*
- `contacts`: `Array` of *contact* `Object`
- `address`: Address `Object`
- `createdBy`: `UserId`, who created this *Author* instance
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `authors`: `Array` [Authors]

## GET | Get Author
```bash
    {{URL}}api/v1/authors/:authorId
```
Params:
- authorId: `authorId`

Fields:
- `name`: `String`, Full name of the *Author*
- `nicname`: `String`, Nicname of the *Author*
- `verified`: `Boolean`
- `realUser`: `UserId`, If Author is a `User` too
- `gender`: `String` of choise fields:  ['male', 'female', 'other']
- `bio`: `String`, about *Author*
- `contacts`: `Array` of *contact* `Object`
- `address`: Address `Object`
- `createdBy`: `UserId`, who created this *Author* instance
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `author`: Author `Object`

## POST | Create Author
```bash
    {{URL}}api/v1/authors
```

Required Fields:
- `name`: `String`, Full name of the *Author*
- `nicname`: `String`, Nicname of the *Author*
- `gender`: `String` of choise fields:  ['male', 'female', 'other']

Optional Fields:
- `bio`: `String`, about *Author*
- `contacts`: `Array` of *contact* `Object`
- `address`: Address `Object`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `author`: Created Author `Object`

## PATCH | Update Author
```bash
    {{URL}}api/v1/authors/:authorId
```
Params:
- authorId: `authorId`

Updatable Fields:
- `name`: `String`, Full name of the *Author*
- `nicname`: `String`, Nicname of the *Author*
- `gender`: `String` of choise fields:  ['male', 'female', 'other']
- `bio`: `String`, about *Author*
- `contacts`: `Array` of *contact* `Object`
- `address`: Address `Object`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `author`: Updated Author `Object`
