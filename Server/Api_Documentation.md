[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15153355&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

- Tema Aplikasi: Branded Things

Struktur Folder:

- server (PORT: 3000)

## Endpoints : 

List of available endpoints:

**Main Entity (Products) -- [Need Authentication]**
- `POST /products`
- `GET / products`
- `GET /products/:id`

**Main Entity  -- [Need Authentication & Authorization]**
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

**Entity Support - [Need Authentication]**
- `POST /categories`
- `GET /categories`

**Support Entity - [Need Authentication & Authorization]**
- `PUT /categories/:id`
- `DELETE /categories/:id`

**User - [Need Authorization by admin]**
- `POST /add-user`
- `POST /login`

**Public**
- `GET /pub`
- `GET /pub/:id`


&nbsp;

## 1. POST /products

Description : 
- Add New product to database

Request :
- body: 

_Response(201 - Created)_
```json
{
    "name" : string,
    "description" : string,
    "price" : integer,
    "stock" : integer,
    "imgUrl" : string,
    "categoryId" : integer,
    "authorId": integer
}
```

_Response(400 - Validation Error)_
```json
{
    "message": [
        "Name is required",
        "Description is required",
        "Price is required",
        "ImageUrl is required",
        "CategoryId is required",
        "AuthorId is required"
    ]
}
```

&nbsp;

## 2. Get /Products

Description : 
- Find all product from database

_Response(200 - OK)_
```json
[
    {
        "id": integer,
        "name": string,
        "description": string,
        "price": integer,
        "stock": integer,
        "imgUrl": string,
        "categoryId": integer,
        "authorId": integer,
        "createdAt": date,
        "updatedAt": date,
        "User": {
            "id": integer,
            "username": string,
            "email": string,
            "role": string,
            "phoneNumber": string,
            "address": string,
            "createdAt": date,
            "updatedAt": date
        }
    },
    ...
]
```
&nbsp;

## Get /products/:id

Description : 
- Get 1 product from database

- Request: 

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": integer,
    "name": string,
    "description": string,
    "price": integer,
    "stock": integer,
    "imgUrl": string,
    "categoryId": integer,
    "authorId": integer,
    "createdAt": date,
    "updatedAt": date
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```

## 4. Put /products/:id

Description : 
- Update product by id

- Request : 

-params :
```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": integer,
    "name": string,
    "description": string,
    "price": integer,
    "stock": integer,
    "imgUrl": string,
    "categoryId": integer,
    "authorId": integer,
    "createdAt": date,
    "updatedAt": date
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (400 - Validation Error)_

```json
{
    "message": [
        "Name is required",
        "Description is required",
        "Price is required",
        "ImageUrl is required",
        "CategoryId is required",
        "AuthorId is required"
    ]
}
```

&nbsp;

## 5. Patch /products/:id

- Nyusul

Description : 
- update image product by id

-params 

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Image <Product.name> success to update"
}
```

_Response (400 - Validation Error)_

```json
{
  "message": "please provide a picture"
}
```

Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 6. DELETE /cuisines/:id
Description :
- Delete product by id

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<nameProduct> success to delete"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```
&nbsp;

## **Entity Support**

## 1. Post /categories

Description: 
- Add new category to database

Request : 
- body:

_Response (201 - Created)_

```json
{
    "name": string,
}
```
_Response (400 - Validation Error)_

```json
{
  "message": "Name is required"
}
```

&nbsp;

## 2. GET /categories

Description :
- Find all category from database

_Response (200 - OK)_

```json
[
    {
        "name": string,
    }
    ...
]
```


&nbsp;

## 3. PUT /categories/:id

Description:
- Update category by id

-Request :

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "name": string,
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```

_Response (400 - Validation Error)_

```json
{
    "message": [
        "Name is required"
    ]
}
```

&nbsp;

## 4. DELETE /categories/:id

Description:
- Delete category by id

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<nameCategory> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## **User**

## 1. POST /add-user

Request:

- body:
```json
{
  "username": string,
  "email": string,
  "password": string
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Email is required",
        "Use the right email format",
        "Password is required",
        "Password minimum 5 karakter"
    ]
}
OR 
{
    {
    "message": [
        "Email already exist"
    ]
}
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
  ​

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email and password are required"
}
```



## **Public** 

## 1. GET /pub
_Response (200 - OK)_

```json 
{
    "page": 1,
    "data": [
        {
            "id": Number,
            "name": String,
            "description": String,
            "price": Number,
            "stock": Number,
            "imgUrl": String,
            "categoryId": Number,
            "authorId": Number,
            "createdAt": Date,
            "updatedAt": Date,
            "Category": {
                "id": Number,
                "name": String,
                "createdAt": Date,
                "updatedAt": Date
            }
        },
        ....
    ],
    "totalData": Number,
    "totalPage": Number,
    "dataPerPage": Number
}
```

&nbsp;

## 2. GET/pub/:id
- REQUEST
- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json 
{
   "id": Number,
   "name": String,
   "description": String,
   "price": Number,
   "stock": Number,
   "imgUrl": String,
   "categoryId": Number,
   "authorId": Number,
   "createdAt": Date,
   "updatedAt": Date,
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```


## **GLOBAL ERROR**
_Response (500 - Internal server error)_
```json
{
  "message": "Internal server error"
}
```












