# Edukos API Documentation

## Users

User of this project.
CRUD opertion and authentication.

### POST | Signup

```
    {{URL}}api/v1/users/signup
```

Required Fields:

-   username
-   email
-   password

### POST | Login

```
    {{URL}}api/v1/users/login
```

Required Fields:

-   email
-   password

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

-   username
-   email
-   password

### GET | Get User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : UserId

### PATCH | Update User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : UserId

### DELETE | Delete User

```
    {{URL}}api/v1/users/:id
```

Params:

-   id : UserId

# Profile Api

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
