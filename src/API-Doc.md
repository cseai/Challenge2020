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
- `username`:
- `name`:
- `parent`:
- `category`:
- `address`:
- `since`:
- `contacts`:
- `shortDescription`:

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

## GET | Get MemberGroup
```bash
    {{URL}}api/v1/membergroups/:mgId
```
Params:
- mgId : `MemberGroupId`

# HubTree API
HubTree is the part of EduHub section. It's represent the EduHub's hierarchy structure for quickly access the whole EduHub's Tree structure.

## GET | Get All HubTrees
```bash
    {{URL}}api/v1/hubtrees/
```

## GET | Get HubTree
```bash
    {{URL}}api/v1/hubtrees/:hubTreeId/
```
Params:
- hubTreeId : `HubTreeId`


# Library API
*Library* is another main section of *EduHub*. `Library` belongs to a `Dept`. Dept can create Library if needed. Members of Library are same as Dept. They refer same `MemberGroup`.
Libray has `Book`, `Resource`, `Author` and `Transaction` facilities.

## GET | Get All Libraries
```bash
    {{URL}}api/v1/libraries
```

## GET | Get Library
```bash
    {{URL}}api/v1/libraries/:libraryId
```
Params:
- libraryId: `libraryId`

## PATCH | Update Library
```bash
    {{URL}}api/v1/libraries/:libraryId
```
Params:
- libraryId: `libraryId`

## PATCH | Add Library Controllers
```bash
    {{URL}}api/v1/libraries/:libraryId/addcontrollers
```
Params:
- libraryId: `libraryId`

## PATCH | Remove Library Controllers
```bash
    {{URL}}api/v1/libraries/:libraryId/removecontrollers
```
Params:
- libraryId: `libraryId`


# Library / Book API
*Library / Book* is a section of *Library*. This route maintains *Books* of this *Library*.

## GET | Get All Books of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books
```
Params:
- libraryId: `libraryId`

## GET | Get Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

## POST | Create Book for Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books
```
Params:
- libraryId: `libraryId`

## PATCH | Update Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

## PATCH | Add Depts at Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/adddepts
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

## PATCH | Remove Depts from Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/removedepts
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

## PATCH | Add Tags at Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/addtags
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

## PATCH | Remove Tags from Book of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/books/:bookId/removetags
```
Params:
- libraryId: `libraryId`
- bookId: `bookId`

# Library / Resource API
*Library / Resource* is a section of *Library*. This route maintains *Resources* of this *Library*.

## GET | Get All Resources of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources
```
Params:
- libraryId: `libraryId`

## GET | Get Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

## POST | Create Resource for Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources
```
Params:
- libraryId: `libraryId`

## PATCH | Update Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

## PATCH | Add Depts at Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/adddepts
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

## PATCH | Remove Depts from Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/removedepts
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

## PATCH | Add Tags at Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/addtags
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

## PATCH | Remove Tags from Resource of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/resources/:resourceId/removetags
```
Params:
- libraryId: `libraryId`
- resourceId: `resourceId`

# Library / Trx API
*Library / Trx* is a section of *Library*. This route maintains *Trxs* of this *Library*.

## GET | Get All Trxs of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/trxs
```
Params:
- libraryId: `libraryId`

## GET | Get Trx of Library
```bash
    {{URL}}api/v1/libraries/:libraryId/trxs/:trxId
```
Params:
- libraryId: `libraryId`
- trxId: `trxId`

# Author API
*Author* is the writter of *Book*.

## GET | Get All Authors
```bash
    {{URL}}api/v1/authors
```

## GET | Get Author
```bash
    {{URL}}api/v1/authors/:authorId
```
Params:
- authorId: `authorId`

## POST | Create Author
```bash
    {{URL}}api/v1/authors
```

## PATCH | Update Author
```bash
    {{URL}}api/v1/authors/:authorId
```
Params:
- authorId: `authorId`
