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
