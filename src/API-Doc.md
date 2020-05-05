# Edukos API Documentation

## User API

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

## Profile API

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

## Dept and EduHub API
The Dept is the most impotant section of this project. EduHub is the `ROOT` Dept. It's a complex section. 
So, if you find any `BUG` please note it down and disscuss about it.

### GET | Get All Depts
```bash
    {{URL}}api/v1/depts
```

### GET | Get All EduHubs
```bash
    {{URL}}api/v1/depts/eduhubs/
```

### GET | Get Dept
```bash
    {{URL}}api/v1/depts/:id
```
Params:
- id : `DeptId`

### GET | Get EduHub
```bash
    {{URL}}api/v1/depts/eduhubs/:id
```
Params:
- id : `DeptId`. If it is not `EduHub` then it will automatically response with it's `EduHub`

Actions:
- Always response by returning `EduHub` although if provided `DeptId` is not an `EduHub`.

### POST | Create Dept
```bash
    {{URL}}api/v1/depts
```
Required Fields:
- `username` : `unique` *String*
- `name` : *String*

Otional Fields:
- `parent`: Parent `DeptId`

### PATCH | Update Dept
```bash
    {{URL}}api/v1/depts/:id
```
Params:
- id: `DeptId`

Actions:
- There are some restriction to perform update operation. 1) `Dept` can not be updated to `EduHub`; 2) `EduHub` can not be updated to `Dept`; and 3) `Dept` can not be moved from one `EduHub` to another `EduHub`, means `Dept` can change it's position within same `EduHub`.
- `Dept`'s `eduHub` amd `children` property can not be modified manually, it will be updated automatically if required.


### DELETE | Delete Dept
```bash
    {{URL}}api/v1/depts/:id
```
Params:
- id: `DeptId`

Actions:
- After deletion if it had ref: `memberGroup` property then automatically that `MemberGroup` will be `deactive` by changing `active = false` have `empty/null`
- There are some restriction to perform delete operation. 1) `Dept` can not be deleted if it's `children` property not empty; 

## MemberGroup API
MemberGroup is the part of Dept section. It's represent the Dept's `memberGroup` property which ref: `MemberGroup`.

## GET | Get All MemberGroups
```bash
    {{URL}}api/v1/membergroups/
```

## GET | Get MemberGroup
```bash
    {{URL}}api/v1/membergroups/:id
```

Params:
-   id : `MemberGroupId`


### POST | Create MemberGroup
```bash
    {{URL}}api/v1/membergroups/
```
Required Fields:
- `dept`: `DeptId`. 

Actions:
This `Dept`'s `memberGroup` property must have `empty/null`

### PATCH | Add Members At MemberGroup
```bash
    {{URL}}api/v1/membergroups/addmembers/:id
```
Params:
-   id : `MemberGroupId`

Required Fields:
- `members` : `Array` of `UserId`

### PATCH | Remove Members At MemberGroup
```bash
    {{URL}}api/v1/membergroups/removemembers/:id
```
Params:
-   id : `MemberGroupId`

Required Fields:
- `members` : `Array` of `UserId`

### DELETE | Delete MemberGroup
_Note_: Only for `admin-mode`
```bash
    {{URL}}api/v1/membergroups/:id
```
Params:
-   id : `MemberGroupId`. 

Actions:
- Ater deletion automatically referanced `Dept`'s `memberGroup` property will be `null`
