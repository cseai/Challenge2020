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

### GET | Get All Depts
```bash
    {{URL}}api/v1/depts
```

Query Params:
- `sort`: Sort depts according to given field name
- `fields`: Return pecific fields of dept's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Fields:
- `username`:
- `name`:
- `eduHub`:
- `parent`:
- `children`:
- `category`:
- `user`:
- `controllers`:
- `memberGroup`:
- `address`:
- `since`:
- `active`:
- `createdAt`:
- `updatedAt`:
- `contacts`:
- `coverImage`:
- `profileImage`:
- `shortDescription`:
- `verification`:
- `calender`:
- `library`:

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `depts`: `Array` [Depts]

Error:
- `success`: `Boolean` [false]

### GET | Get Dept
```bash
    {{URL}}api/v1/depts/:deptId
```
Params:
- deptId : `DeptId`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `dept`: `Object`

### GET | Get All EduHubs
```bash
    {{URL}}api/v1/depts/eduhubs/
```

Query Params:
- `sort`: Sort EduHubs according to given field name
- `fields`: Return pecific fields of EduHub's [inclusive | eclusive ]
- `page`: [`Pagination`] page number
- `limit`: [`Pagination`] number of items in a single page

Response:
- `success`: `Boolean` [true]
- `results`: `Number` [Number of items]
- `eduHubs`: `Array` [EduHubs]

### GET | Get EduHub
```bash
    {{URL}}api/v1/depts/:deptId/eduhubs
```
Params:
- deptId : `DeptId`. If it is not `EduHub` then it will automatically response with it's `EduHub`

Response:
- `success`: `Boolean` [true]
- `msg`: `String`
- `eduHub`: `Object` [EduHub]

Actions:
- Always response by returning `EduHub` although if provided `DeptId` is not an `EduHub`.

### POST | Create Dept
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

### PATCH | Update Dept
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

### PATCH | Add Members
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

### PATCH | Remove Members
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

### PATCH | Add Controllers
```bash
    {{URL}}api/v1/depts/:deptId/addcontrollers
```
Params:
- deptId: `DeptId`

Required Fields:
- `controllers`: `Array` of `Object` with propertie `user`: `userId`, `role`: choise=[`admin`, `moderator` or `owner`] and `active`: [Optional, default `true`] with value `true` or `false`

Actions and Conditions:
- `controllers` must be the `members` of this `Dept`. Otherwise it will be rejected.

### PATCH | Remove Controllers
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

### DELETE | Delete Dept
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
