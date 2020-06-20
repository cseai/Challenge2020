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
