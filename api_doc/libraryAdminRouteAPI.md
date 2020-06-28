# Library / Admin Panel API
*Libray Admin Panel* is the admin cotrol section of a Library.

## GET | Get Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId
```
Params:
- libraryId : `libraryId`

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


## PATCH | Update Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId
```
Params:
- libraryId : `libraryId`

Fields Can be Updated:
- `name`: `String`, name of the library.
- `username`: `String` *unique*, library username
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `since`: `Date`, the date when this library established.
- `shortDescription`: `String`, Short Description about this library.
- `contacts`: `Array` of *Contact* `Object`.
- `address`: Address `Object`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `library`: Updated Library `Object`


## PATCH | Add Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/addcontrollers
```
Params:
- libraryId : `libraryId`

Required Fields:
- `controllers`: `Array` of *Controller* `Object`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `controllers`: Updated Library Controllers `Array`


## PATCH | Remove Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/removecontrollers
```
Params:
- libraryId : `libraryId`

Required Fields:
- `controllers`: `Array` of *Controller's* `UserId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `controllers`: Updated Library Controllers `Array`


## GET | Get All Books of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books
```
Params:
- libraryId : `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the book.
- `authors`: `Array` `Object` with 'authorNmae' and 'authorId'
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
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Fields:
- `library`: `libraryId`
- `title`: `String`, title of the book.
- `authors`: `Array` `Object` with 'authorNmae' and 'authorId'
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

## POST | Create Book for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books
```
Params:
- libraryId : `libraryId`

Required Fields:
- `title`: `String`, title of the book.
- `authors`: `Array` of `Object` with 'authorNmae' and 'authorId'. ( `authorName` is optional)

Optional Fields:
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
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Created Book `Object`


## PATCH | Update Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Updatable Fields:
- `title`: `String`, title of the book.
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

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`


## PATCH | Add Depts at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/adddepts
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`


## PATCH | Remove Depts from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/removedepts
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`


## PATCH | Add Tags at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/addtags
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`


## PATCH | Remove Tags from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/removetags
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`


## GET | Get All Resources of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources
```
Params:
- libraryId : `libraryId`

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
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

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


## POST | Create Resource for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources
```
Params:
- libraryId : `libraryId`

Required Fields:
- `title`: `String`, title of the book.
- `category`: `String` of choice fields: ['magazine', 'software', 'hardware', 'other']

Optional Fields:
- `accessionNumber`: `String`, resource accessionNumber
- `callNumber`: `String`, resource callNumber
- `copyNumber`: `String`, resource copyNumber
- `description`: `String`, resource description
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the resource
- `image`: `String`, image url
- `depts`: `Array` of `DeptId`
- `tags`: `Array` of `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Created Resource `Object`


## PATCH | Update Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

Updatable Fields:
- `title`: `String`, title of the resource.
- `category`: `String` of choice fields: ['magazine', 'software', 'hardware', 'other']
- `accessionNumber`: `String`, resource accessionNumber
- `callNumber`: `String`, resource callNumber
- `copyNumber`: `String`, resource copyNumber
- `description`: `String`, resource description
- `price`: `Object` containing `quantity` and `currency` properties.
- `barcode`: `String`, barcode of the resource
- `image`: `String`, image url

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`


## PATCH | Add Depts at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/adddepts
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`


## PATCH | Remove Depts from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/removedepts
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`


## PATCH | Add Tags at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/addtags
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`


## PATCH | Remove Tags from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/removetags
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`


## GET | Get All Trxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/trxs
```
Params:
- libraryId : `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `trxs`: `Array` [Trxs]


## GET | Get Trx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/trxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Trx of this Library

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`


## GET | Get All BookTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs
```
Params:
- libraryId : `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `trxs`: `Array` [Trxs]


## GET | Get BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Book-Trx of this Library

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`


## POST | Create BorrowBookTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs
```
Params:
- libraryId : `libraryId`

Required Fields:
- `objectId`: `bookId`, the book will be borrowed
- `dueDate`: `Date`, trx issue dueDate
- `user`: `UserId`, The trx-user

Optional Fields:
- `comment`: `String`, comment about trx

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`
- `book`: Book `Object`


## PATCH | Return BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Book-Trx of this Library

Required Fields:
- `objectId`: `bookId`, the book will be returned
- `user`: `UserId`, The trx-user

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`
- `book`: Book `Object`


## GET | Get All ResourceTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs
```
Params:
- libraryId : `libraryId`

Query Params:
- `sort`: Sort objects according to given field name
- `fields`: Return pecific fields of object's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `trxs`: `Array` [Trxs]


## GET | Get ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Resource-Trx of this Library

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`


## POST | Create BorrowResourceTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs
```
Params:
- libraryId : `libraryId`

Required Fields:
- `objectId`: `resourceId`, the resource will be borrowed
- `dueDate`: `Date`, trx issue dueDate
- `user`: `UserId`, The trx-user

Optional Fields:
- `comment`: `String`, comment about trx

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['book', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`
- `resource`: Resource `Object`


## PATCH | Return ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Resource-Trx of this Library

Required Fields:
- `objectId`: `resourceId`, the resource will be returned
- `user`: `UserId`, The trx-user

Fields:
- `library`: `LibraryId` of the trx-object
- `contentType`: `String` of choise field: ['resource', 'resource'] | `GFK`
- `objectId`: `ObjectId` of trx-object | `GFK`
- `issueDate`: `Date`, trx issue date
- `dueDate`: `Date`, trx issue dueDate
- `returnDate`: `Date`, trx issue returnDate
- `comment`: `String`, comment about trx
- `user`: `UserId`, The trx-user
- `issuedBy`: `UserId`, The trx-issue-user (e.g. Librarian )
- `updatedBy`: `Array` of `UserId`, The trx-updater-user (e.g. Librarian )
- `status`: `String`
- `active`: `Boolean` [true, false]
- `createdAt`: `Date`, when this instance created.
- `updatedAt`: `Date`, last updated date of this instance.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `trx`: Trx `Object`
- `resource`: Resource `Object`
