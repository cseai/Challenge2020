# Library / Admin Panel API
*Libray Admin Panel* is the admin cotrol section of a Library.

## GET | Get Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId
```
Params:
- libraryId : `libraryId`


## PATCH | Update Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId
```
Params:
- libraryId : `libraryId`


## PATCH | Add Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/addcontrollers
```
Params:
- libraryId : `libraryId`

## PATCH | Remove Library Controllers
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/removecontrollers
```
Params:
- libraryId : `libraryId`

## GET | Get All Books of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books
```
Params:
- libraryId : `libraryId`

## GET | Get Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library

## POST | Create Book for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books
```
Params:
- libraryId : `libraryId`

## PATCH | Update Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library


## PATCH | Add Depts at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/adddepts
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library


## PATCH | Remove Depts from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/removedepts
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library


## PATCH | Add Tags at Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/addtags
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library


## PATCH | Remove Tags from Book of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/books/:bookId/removetags
```
Params:
- libraryId : `libraryId`
- bookId: `bookId`, book of this Library


## GET | Get All Resources of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources
```
Params:
- libraryId : `libraryId`

## GET | Get Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## POST | Create Resource for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources
```
Params:
- libraryId : `libraryId`

## PATCH | Update Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## PATCH | Add Depts at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/adddepts
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## PATCH | Remove Depts from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/removedepts
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## PATCH | Add Tags at Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/addtags
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## PATCH | Remove Tags from Resource of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resources/:resourceId/removetags
```
Params:
- libraryId : `libraryId`
- resourceId: `resourceId`, Resource of this Library


## GET | Get All Trxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/trxs
```
Params:
- libraryId : `libraryId`

## GET | Get Trx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/trxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Trx of this Library


## GET | Get All BookTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs
```
Params:
- libraryId : `libraryId`

## GET | Get BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Book-Trx of this Library


## POST | Create BorrowBookTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs
```
Params:
- libraryId : `libraryId`

## PATCH | Return BookTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/booktrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Book-Trx of this Library

## GET | Get All ResourceTrxs of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs
```
Params:
- libraryId : `libraryId`

## GET | Get ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Resource-Trx of this Library

## POST | Create BorrowResourceTrx for Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs
```
Params:
- libraryId : `libraryId`

## PATCH | Return ResourceTrx of Library
```bash
    {{URL}}api/v1/libraries/admin/:libraryId/resourcetrxs/:trxId
```
Params:
- libraryId : `libraryId`
- trxId: `trxId`, Resource-Trx of this Library


