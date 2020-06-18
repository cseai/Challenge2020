# Edukos API Documentation

# User API

User of this project.
CRUD opertion and authentication.

### POST | Signup

```
    {{URL}}api/v1/users/signup
```

Required Fields:

- `username`
- `email`
- `password`

### POST | Login

```
    {{URL}}api/v1/users/login
```

Required Fields:

- `email`
- `password`

### GET | Get All Users

```
    {{URL}}api/v1/users
```

### POST | Create User

_Note_: Only for admin-mode

```
    {{URL}}api/v1/users
```

Required Fields:

- `username`
- `email`
- `password`

### GET | Get User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : `UserId`

### PATCH | Update User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : `UserId`

### DELETE | Delete User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : `UserId`

# Profile API

### GET | Get all profile

```bash
    {{url}}/api/v1/profile
```

### POST | Create User Profile

```bash
    {{url}}/api/v1/profile
```

Required Fields:

-   will be update very soon...

# Dept and EduHub API
The Dept is the most impotant section of this project. EduHub is the `ROOT` Dept. It's a complex section. 
So, if you find any `BUG` please note it down and disscuss about it.

## GET | Get All Depts
```bash
    {{URL}}api/v1/depts
```

Query Params:
- `sort`: Sort depts according to given field name
- `fields`: Return pecific fields of dept's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `username`: Dept's Username
- `name`: Dept's name
- `eduHub`: `EduHubId` if it is not a EduHub. Otherwise `null`.
- `parent`: `ParentId` if it is not a EduHub. Otherwise `null`.
- `children`: `Array` of child `DeptId`.
- `category`: *Category* of Dept ['university', 'college', 'school', 'eduHub']
- `user`: `UserId` who created this Dept.
- `controllers`: `Array` of *Controllers* User `Object` 
- `memberGroup`: `MemberGroupId` that stores member information of a Dept
- `address`: Adress `Object`
- `since`: `Date` when this Dept established
- `active`: `Boolean`
- `createdAt`: `Date`, when this Document created.
- `updatedAt`: `Date`, when this Document updated.
- `contacts`: `Array` of *Contact* `Object`
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `shortDescription`: `String`, about this Dept.
- `verification`: Verification `Object`
- `calender`: `CalenderId`, ref to *Calender* of this Dept if exist
- `library`: `LibraryId`, ref to *Library* of this Dept if exist

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `depts`: `Array` [Depts]

Error:
- `success`: `Boolean` [false]

## GET | Get Dept
```bash
    {{URL}}api/v1/depts/:deptId
```
Params:
- deptId : `DeptId`

Fields:
- `username`: Dept's Username
- `name`: Dept's name
- `eduHub`: `EduHubId` if it is not a EduHub. Otherwise `null`.
- `parent`: `ParentId` if it is not a EduHub. Otherwise `null`.
- `children`: `Array` of child `DeptId`.
- `category`: *Category* of Dept ['university', 'college', 'school', 'eduHub']
- `user`: `UserId` who created this Dept.
- `controllers`: `Array` of *Controllers* User `Object` 
- `memberGroup`: `MemberGroupId` that stores member information of a Dept
- `address`: Adress `Object`
- `since`: `Date` when this Dept established
- `active`: `Boolean`
- `contacts`: `Array` of *Contact* `Object`
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `shortDescription`: `String`, about this Dept.
- `verification`: Verification `Object`
- `calender`: `CalenderId`, ref to *Calender* of this Dept if exist
- `library`: `LibraryId`, ref to *Library* of this Dept if exist


Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `dept`: `Object`

## GET | Get All EduHubs
```bash
    {{URL}}api/v1/depts/eduhubs/
```

Query Params:
- `sort`: Sort EduHubs according to given field name
- `fields`: Return pecific fields of EduHub's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `username`: Dept's Username
- `name`: Dept's name
- `eduHub`: `null`.
- `parent`: `null`.
- `children`: `Array` of child `DeptId`.
- `category`: *Category* of Dept ['university', 'college', 'school', 'eduHub']
- `user`: `UserId` who created this Dept.
- `controllers`: `Array` of *Controllers* User `Object` 
- `memberGroup`: `MemberGroupId` that stores member information of a Dept
- `address`: Adress `Object`
- `since`: `Date` when this Dept established
- `active`: `Boolean`
- `contacts`: `Array` of *Contact* `Object`
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `shortDescription`: `String`, about this Dept.
- `verification`: Verification `Object`
- `calender`: `CalenderId`, ref to *Calender* of this Dept if exist
- `library`: `LibraryId`, ref to *Library* of this Dept if exist


Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `eduHubs`: `Array` [EduHubs]

## GET | Get EduHub
```bash
    {{URL}}api/v1/depts/:deptId/eduhubs
```
Params:
- deptId : `DeptId`. If it is not `EduHub` then it will automatically response with it's `EduHub`

Fields:
- `username`: Dept's Username
- `name`: Dept's name
- `eduHub`: `null`.
- `parent`: `null`.
- `children`: `Array` of child `DeptId`.
- `category`: *Category* of Dept ['university', 'college', 'school', 'eduHub']
- `user`: `UserId` who created this Dept.
- `controllers`: `Array` of *Controllers* User `Object` 
- `memberGroup`: `MemberGroupId` that stores member information of a Dept
- `address`: Adress `Object`
- `since`: `Date` when this Dept established
- `active`: `Boolean`
- `contacts`: `Array` of *Contact* `Object`
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `shortDescription`: `String`, about this Dept.
- `verification`: Verification `Object`
- `calender`: `CalenderId`, ref to *Calender* of this Dept if exist
- `library`: `LibraryId`, ref to *Library* of this Dept if exist


Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `eduHub`: `Object` [EduHub]

Actions:
- Always response by returning `EduHub` although if provided `DeptId` is not an `EduHub`.

## GET | Get HubTree
```bash
    {{URL}}api/v1/depts/:deptId/hubtree
```
Params:
- deptId : `DeptId`. If it is not `EduHub` then it will automatically response with it's `EduHub`'s `HubTree`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `hubTree`: `Object` [HubTree]

Actions:
- Always response by returning `HubTree` although if provided `DeptId` is not an `EduHub`.
- If it is first request for an `EduHub` or threre is no `HubTree` refering to this `EduHub` then it will create and return that newly created `HubTree`
- Every `EduHub` can have only one `HubTree`
- `HubTree` is only for `EduHub` not for `Department`


## POST | Create Dept
```bash
    {{URL}}api/v1/depts
```
Required Fields:
- `username` : `unique` *String*
- `name` : *String*

Other Fields:
- `parent`: `ParentDeptId` [When creating Dept this is `required`] 
- `category`: `choises:['university', 'college', 'school', 'eduHub']` [When creating EduHub]
- `address`: `Object`
- `since`: `Date` [Established Date]
- `shortDescription`: `String` [Short Description]

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `dept`: `Object` [Created Dept]

Actions:
- Before creation of `Dept`, `controllers` will be set with the *creator user* with `role='owner'`.
- After creation of `Dept`, `MemberGroup` will be created with the owner user and `memberGroup` will be set at `Dept`.
- All configuration will be atumatically set according to `EduHub` rules.

## POST | Create Library
```bash
    {{URL}}api/v1/depts/:deptId/library
```
Params:
- deptId : `DeptId` of the Dept where library will be created 

Required Fields:
- `username` : `unique` *String*
- `name` : *String*

Other Fields:
- `address`: `Object`
- `since`: `Date` [Established Date]
- `shortDescription`: `String` [Short Description]

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
- `msg`: `String`
- `library`: `Object` [Created Library]

Actions:
- User must be the controller of the `Dept` and `Dept`'s `library` must be `null` or `empty`
- Before creation of `Library`, `controllers` will be set with the *creator user* with `role='superadmin'`, and `memberGroup` will be set with the `Dept`'s `memberGroup`.
- After creation of `Library`, `library` will be set at `Dept`.


## PATCH | Update Dept
```bash
    {{URL}}api/v1/depts/:deptId
```
Params:
- deptId: `DeptId`

Fields:
- `username`: Dept's Username
- `name`: Dept's name
- `category`: *Category* of Dept ['university', 'college', 'school', 'eduHub'] can be update when it is `EduHub`. Otherwise restricted.
- `address`: Adress `Object`
- `since`: `Date` when this Dept established
- `contacts`: `Array` of *Contact* `Object`
- `coverImage`: `String`, image url
- `profileImage`: `String`, image url
- `shortDescription`: `String`, about this Dept.

Actions:
- There are some restriction to perform update operation. 1) `Dept` can not be updated to `EduHub`; 2) `EduHub` can not be updated to `Dept`; and 3) `Dept` can not be moved from one `EduHub` to another `EduHub`, means `Dept` can change it's position within same `EduHub`.
- `Dept`'s `eduHub` amd `children` property can not be modified manually, it will be updated automatically if required.

## PATCH | Add Members
```bash
    {{URL}}api/v1/depts/:deptId/addmembers
```
Params:
- deptId: `DeptId`

Required Fields:
- `members`: `Array` of `userId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`, message
- `members`: `Array` of `UserId`

Actions and Conditions:
- `members` must be the `members` of `parentDept` (if it is a `Dept`)
- `members` must be valid `userId`

## PATCH | Remove Members
```bash
    {{URL}}api/v1/depts/:deptId/removemembers
```
Params:
- deptId: `DeptId`

Required Fields:
- `members`: `Array` of `userId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`, message
- `members`: `Array` of `UserId`

Actions and Conditions:
- `members` must be the `members` of this `Dept`. Otherwise it will be rejected.
- `members` must be valid `userId`
- After removing `members` from this `Dept` all the `descendant Dept`'s `same members` (If have) also will be removed automatically according the `EduHub` rules.

## PATCH | Add Controllers
```bash
    {{URL}}api/v1/depts/:deptId/addcontrollers
```
Params:
- deptId: `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`, message
- `controllers`: `Array` of *controllers* `Object`

Required Fields:
- `controllers`: `Array` of `Object` with propertie `user`: `userId`, `role`: choise=[`admin`, `moderator` or `owner`] and `active`: [Optional, default `true`] with value `true` or `false`

Actions and Conditions:
- `controllers` must be the `members` of this `Dept`. Otherwise it will be rejected.

## PATCH | Remove Controllers
```bash
    {{URL}}api/v1/depts/:deptId/removecontrollers
```
Params:
- deptId: `DeptId`

Required Fields:
- `controllers`: `Array` of `userId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`, message
- `controllers`: `Array` of *controllers* `Object`

Actions and Conditions:
- `controllers` must be the `controler` of this `Dept`. Otherwise it will be rejected.
- `role` must not be `owner` in every `controller` of `controllers`. Otherwise it will be rejected with Error.

## DELETE | Delete Dept
```bash
    {{URL}}api/v1/depts/:deptId
```
Params:
- deptId: `DeptId`

Actions:
- After deletion if it had ref: `memberGroup` property then automatically that `MemberGroup` will be `deactive` by changing `active = false` have `empty/null`
- There are some restriction to perform delete operation. 1) `Dept` can not be deleted if it's `children` property not empty; 

# MemberGroup API
MemberGroup is the part of Dept section. It's represent the Dept's `memberGroup` property which ref: `MemberGroup`.

## GET | Get All MemberGroups
```bash
    {{URL}}api/v1/membergroups/
```
Query Params:
- `sort`: Sort memberGroups according to given field name
- `fields`: Return pecific fields of MemberGroups's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `dept`: Dept `Object` with some limited field
- `members`: `Array` of `UserId` represents member of Dept.
- `active`: `Boolean` [true or false]

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `memberGroups`: `Array` [MemberGroups]

Error:
- `success`: `Boolean` [false]

## GET | Get MemberGroup
```bash
    {{URL}}api/v1/membergroups/:mgId
```
Params:
- mgId : `MemberGroupId`

Fields:
- `dept`: Dept `Object` with some limited field
- `members`: `Array` of `UserId` represents member of Dept.
- `active`: `Boolean` [true or false]

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `memberGroup`: MemberGroups `Object`

Error:
- `success`: `Boolean` [false]

# HubTree API
HubTree is the part of EduHub section. It's represent the EduHub's hierarchy structure for quickly access the whole EduHub's Tree structure.

## GET | Get All HubTrees
```bash
    {{URL}}api/v1/hubtrees/
```
Query Params:
- `sort`: Sort hubTrees according to given field name
- `fields`: Return pecific fields of HubTree's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `hub`: `DeptId`
- `tree`: *Mixed* type `Object` represent EduHub *Hierarchy*.
- `list`: `Array` of Dept `Object` represnts level by level
- `active`: `Boolean`
- `createdAt`: `Date`, when instance is created.

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `hubTrees`: `Array` [HubTrees]

## GET | Get HubTree
```bash
    {{URL}}api/v1/hubtrees/:hubTreeId/
```
Params:
- hubTreeId : `HubTreeId`

Fields:
- `hub`: `DeptId`
- `tree`: *Mixed* type `Object` represent EduHub *Hierarchy*.
- `list`: `Array` of Dept `Object` represnts level by level
- `active`: `Boolean`
- `createdAt`: `Date`, when instance is created.

Response:
- `success`: `Boolean` [true]
- `msg`: `String`, message
- `hubTree`: `Object` [HubTrees]

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

## PATCH | Update Library
```bash
    {{URL}}api/v1/libraries/:libraryId
```
Params:
- libraryId: `libraryId`

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
    {{URL}}api/v1/libraries/:libraryId/addcontrollers
```
Params:
- libraryId: `libraryId`

Required Fields:
- `controllers`: `Array` of *Controller* `Object`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `controllers`: Updated Library Controllers `Array`

## PATCH | Remove Library Controllers
```bash
    {{URL}}api/v1/libraries/:libraryId/removecontrollers
```
Params:
- libraryId: `libraryId`

Required Fields:
- `controllers`: `Array` of *Controller's* `UserId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `controllers`: Updated Library Controllers `Array`

# Library / Book API
*Library / Book* is a section of *Library*. This route maintains *Books* of this *Library*.

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
- `authors`: `Array` of `AuthorId`
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
- `authors`: `Array` of `AuthorId`
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
    {{URL}}api/v1/libraries/:libraryId/books
```
Params:
- libraryId: `libraryId`

Required Fields:
- `title`: `String`, title of the book.
- `authors`: `Array` of `AuthorId`

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
    {{URL}}api/v1/libraries/:libraryId/books/:bookId
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

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
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/adddepts
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`

## PATCH | Remove Depts from Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/removedepts
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`

## PATCH | Add Tags at Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/addtags
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`

## PATCH | Remove Tags from Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/removetags
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `book`: Updated Book `Object`

# Library / Resource API
*Library / Resource* is a section of *Library*. This route maintains *Resources* of this *Library*.

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

## POST | Create Resource for Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources
```
Params:
- libraryId: `libraryId`

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
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

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
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/adddepts
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`

## PATCH | Remove Depts from Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/removedepts
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

Required Fields:
- `depts`: `Array` of `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`

## PATCH | Add Tags at Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/addtags
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`

## PATCH | Remove Tags from Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/removetags
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

Required Fields:
- `tags`: `Array` of tag `String`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `resource`: Updated Resource `Object`

# Library / Trx API
*Library / Trx* is a section of *Library*. This route maintains *Trxs* of this *Library*.

## GET | Get All Trxs of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/trxs
```
Params:
- libraryId: `libraryId`

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
    {{URL}}api/v1/libraries/:libraryId/trxs/:trxId
```
Params:
- libraryId: `libraryId`
- trxId: `trxId`

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

# Library / Admin Panel API
*Libray Admin Panel* is the admin cotrol section of a Library.

## GET | Get Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe
```

## PATCH | Update Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe
```

## PATCH | Add Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/addcontrollers
```

## PATCH | Remove Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/removecontrollers
```

## GET | Get All Books of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books?fields=title,_id,library&sort=-createdAt
```

## GET | Get Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ecb5dda892ea52554f536db
```

## POST | Create Book for Library
```bash
    {{URL}}api/v1/libraries/admin/5ecbc92059aa410b5899e5eb/books
```

## PATCH | Update Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ecb5dda892ea52554f536db
```

## PATCH | Add Depts at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ecb5dda892ea52554f536db/adddepts
```

## PATCH | Remove Depts from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ec904674fc89b340c967ddd/removedepts
```

## PATCH | Add Tags at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ec904674fc89b340c967ddd/addtags
```

## PATCH | Remove Tags from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/books/5ec904674fc89b340c967ddd/removetags
```

## GET | Get All Resources of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources
```

## GET | Get Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5ecbd7ef2032ae166caf2250
```

## POST | Create Resource for Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources
```

## PATCH | Update Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5eca58e2787dc93d54ec96f8
```

## PATCH | Add Depts at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5ecb60b4892ea52554f536dc/adddepts
```

## PATCH | Remove Depts from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5eca58e2787dc93d54ec96f8/removedepts
```

## PATCH | Add Tags at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5eca58e2787dc93d54ec96f8/addtags
```

## PATCH | Remove Tags from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resources/5eca58e2787dc93d54ec96f8/removetags
```

## GET | Get All Trxs of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/trxs
```

## GET | Get Trx of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/trxs/5ecd42b1f98429029c2171c7
```

## GET | Get All BookTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/booktrxs
```

## GET | Get BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/booktrxs/5eccfaacc1e7f41f1cff9aee
```

## POST | Create BorrowBookTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/booktrxs
```

## PATCH | Return BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/booktrxs/5eccfaacc1e7f41f1cff9aee
```

## GET | Get All ResourceTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resourcetrxs
```

## GET | Get ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resourcetrxs/5ecd42b1f98429029c2171c7
```

## POST | Create BorrowResourceTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resourcetrxs
```

## PATCH | Return ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/5ec6367d30bac62ae0cda5fe/resourcetrxs/5ecd42b1f98429029c2171c7
```

