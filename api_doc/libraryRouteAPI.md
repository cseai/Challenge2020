# Library API
*Library* is another main section of *EduHub*. `Library` belongs to a `Dept`. Dept can create Library if needed. Members of Library are same as Dept. They refer same `MemberGroup`.
Libray has `Book`, `Resource`, `Author` and `Transaction` facilities.

## GET | Get All Libraries
```bash
    {{URL}}api/v1/libraries
```

Query Params:
- `sort`: Sort Libraries according to given field name
- `fields`: Return pecific fields of Libraries's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `dept`: `DeptId`
- `name`: `String`, name of the library.
- `username`: `String` *unique*, library username
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `since`: `Date`, the date when this library established.
- `shortDescription`: `String`, Short Description about this library.
- `contacts`: `Array` of *Contact* `Object`.
- `address`: Address `Object`
- `controllers`: `Array` of *Controllers* `Object`
- `memberGroup`: `MemberGroupId`
- `active`: `Boolean` [true or false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `libraries`: `Array` [Libraries]

## GET | Get Library
```bash
    {{URL}}api/v1/libraries/:libraryId
```
Params:
- libraryId: `libraryId`

Fields:
- `dept`: *populated* Dept `Object`
- `name`: `String`, name of the library.
- `username`: `String` *unique*, library username
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `since`: `Date`, the date when this library established.
- `shortDescription`: `String`, Short Description about this library.
- `contacts`: `Array` of *Contact* `Object`.
- `address`: Address `Object`
- `controllers`: `Array` of *Controllers* `Object`
- `memberGroup`: *populated* MemberGroup `Object`
- `active`: `Boolean` [true or false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `library`: Library `Object`

## GET | Get All Books of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books
```
Params:
- libraryId: `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the book.
- `authors`: `Array` of `Object` with 'authorNmae' and 'authorId'
- `edition`: `String`, book edition
- `pagination`: `String`, book pagination
- `accessionNumber`: `String`, book accessionNumber
- `callNumber`: `String`, book callNumber
- `copyNumber`: `String`, book copyNumber
- `isbn`: `String`, book isbn
- `publisher`: `String`, book publisher
- `description`: `String`, book description
- `language`: `String`, in which language the book is written
- `publicationDate`: `Date`, publicationDate
- `lastRevisionDate`: `Date`, last lastRevisionDate
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the book
- `image`: `String`, image url
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`
- `user`: `UserId`, who created this book first.
- `status`: `String` of choice fields: ['available', 'unavailable']
- `infoProvided`: `Number`, range [0, 100], representing how much book information given.
- `active`: `Boolean`, [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `books`: `Array` [Books]

## GET | Get Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the book.
- `authors`: `Array` of `Object` with 'authorNmae' and 'authorId'
- `edition`: `String`, book edition
- `pagination`: `String`, book pagination
- `accessionNumber`: `String`, book accessionNumber
- `callNumber`: `String`, book callNumber
- `copyNumber`: `String`, book copyNumber
- `isbn`: `String`, book isbn
- `publisher`: `String`, book publisher
- `description`: `String`, book description
- `language`: `String`, in which language the book is written
- `publicationDate`: `Date`, publicationDate
- `lastRevisionDate`: `Date`, last lastRevisionDate
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the book
- `image`: `String`, image url
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`
- `user`: `UserId`, who created this book first.
- `status`: `String` of choice fields: ['available', 'unavailable']
- `infoProvided`: `Number`, range [0, 100], representing how much book information given.
- `active`: `Boolean`, [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Book `Object`

## GET | Get All Resources of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources
```
Params:
- libraryId: `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the resource.
- `category`: `String` of choice fields: ['magazine', 'software', 'hardware', 'other']
- `accessionNumber`: `String`, resource accessionNumber
- `callNumber`: `String`, resource callNumber
- `copyNumber`: `String`, resource copyNumber
- `description`: `String`, resource description
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the resource
- `image`: `String`, image url
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`
- `user`: `UserId`, who created this resource first.
- `status`: `String` of choice fields: ['available', 'unavailable']
- `infoProvided`: `Number`, range [0, 100], representing how much resource information given.
- `active`: `Boolean`, [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `resources`: `Array` [Resources]

## GET | Get Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the resource.
- `category`: `String` of choice fields: ['magazine', 'software', 'hardware', 'other']
- `accessionNumber`: `String`, resource accessionNumber
- `callNumber`: `String`, resource callNumber
- `copyNumber`: `String`, resource copyNumber
- `description`: `String`, resource description
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the resource
- `image`: `String`, image url
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`
- `user`: `UserId`, who created this resource first.
- `status`: `String` of choice fields: ['available', 'unavailable']
- `infoProvided`: `Number`, range [0, 100], representing how much resource information given.
- `active`: `Boolean`, [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Resource `Object`
