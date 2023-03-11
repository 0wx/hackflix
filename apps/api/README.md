# p2-cms-integration-server
CMS Integration - Server


## Endpoints:
List of available endpoints:
- `POST /register`
- `POST /login`
- `POST /google-sign-in`

- `GET /movies`
- `POST /movies`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `PUT /movies/:id`
- `PATCH /movies/:id`

- `GET /genres`
- `POST /genres`
- `DELETE /genres/:id`

- `GET /pub/movies`
- `GET /pub/movies/random`
- `GET /pub/movies/:id`
- `GET /pub/genres`

- `POST /pub/register`
- `POST /pub/login`
- `POST /pub/google-sign-in`

- `GET /pub/customer/favorites`
- `POST /pub/customer/favorites/:id`
- `DELETE /pub/customer/favorites/:id`

## `POST /register`
#### Description
- register a new user

#### Request
- body
```json
{
  "username": "johndoe",
  "email": "johndoe@gmail.com",
  "password": "hahaha",
  "phoneNumber": 123,
  "address": "Jl. Pelan pelan",
}
```

#### Response
_201 - created_
```json
{
  "message": "User with email johndoe@gmail.com has been registered!",
	"access_token": "token"
}
```

_400 - bad request_
```json
or
{
  "message": "Password length must contain at least 5 character"
}
or
{
  "message": "Password is required"
}
or
{
  "message":"Email format is invalid"
}
or
{
  "message": "Email already registered"
}
```

## `POST /login`
#### Description
- login a user

#### Request
- body
```json
{
  "email": "johndoe@gmail.com",
  "password": "hahaha",
}
```

#### Response
_200 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

_400 - bad request_
```json
{
  "message": "Invalid email or password"
}
```

## `POST /google-sign-in`
#### Description
- login/register user with google credential

#### Request
- headers
```json
{
  "google-auth-token": "token"
}
```

#### Response
_200 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
_201 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```


## `GET /movies`
#### Description
- get all movies

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve",
}
```

#### Response
_200 - OK_
```json
[
  {
    "id": 6,
    "title": "The Secret World of Arrietty",
    "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
    "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
    "rating": 7,
    "genreId": 4,
    "authorId": 2,
    "createdAt": "2023-01-18T11:10:09.622Z",
    "updatedAt": "2023-01-18T11:10:09.622Z",
    "Genre": {
      "id": 4,
      "name": "Thriller",
      "createdAt": "2023-01-18T11:10:09.620Z",
      "updatedAt": "2023-01-18T11:10:09.620Z"
    },
    "User": {
      "id": 2,
      "username": "JaneDoe",
      "email": "janedoe@gmail.com",
      "role": "user",
      "phoneNumber": "555-555-5556",
      "address": "456 Park Ave",
      "createdAt": "2023-01-18T11:10:09.063Z",
      "updatedAt": "2023-01-18T11:10:09.063Z"
    }
  },
]
```

## `POST /movies`
#### Description
- create a new movie

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
- body
```json
{
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2
}
```

#### Response
_201 - created_
```json
{
  "id": 6,
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2,
  "updatedAt": "2023-01-18T11:10:09.622Z",
  "createdAt": "2023-01-18T11:10:09.622Z"
}
```

_400 - bad request_
```json
{
  "message": "Rating must be at least 1"
}
or
{
	"message": "Rating must be at most 10"
}
```

## `GET /movies/:id`
#### Description
- get a movie by id

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

#### Response
_200 - OK_
```json
{
  "id": 6,
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2,
  "createdAt": "2023-01-18T11:10:09.622Z",
  "updatedAt": "2023-01-18T11:10:09.622Z",
  "Genre": {
    "id": 4,
    "name": "Thriller",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  },
  "User": {
    "id": 2,
    "username": "JaneDoe",
    "email": "janedoe@gmail.com",
    "role": "user",
    "phoneNumber": "555-555-5556",
    "address": "456 Park Ave",
    "createdAt": "2023-01-18T11:10:09.063Z",
    "updatedAt": "2023-01-18T11:10:09.063Z"
  }
}
```

_404 - not found_
```json
{
  "message": "Movie not found"
}
```

## `DELETE /movies/:id`
#### Description
- delete a movie by id

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

#### Response
_200 - OK_
```json
{
  "message": "Movie deleted"
}
```

_404 - not found_
```json
{
  "message": "Movie not found"
}
```

## `PATCH /movies/:id`
#### Description
- update status movie by id

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
- body
```json
{
  "status": "active"
}
```

#### Response
_200 - OK_
```json
{
  "message": "Movie deleted"
}
```

_404 - not found_
```json
{
  "message": "Movie not found"
}
```

## `PUT /movies/:id`
#### Description
- update a movie by id

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
- body
```json
{
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
}
```

#### Response
_200 - OK_
```json
{
  "id": 6,
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2,
  "createdAt": "2023-01-18T11:10:09.622Z",
  "updatedAt": "2023-01-18T11:10:09.622Z",
  "Genre": {
    "id": 4,
    "name": "Thriller",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  },
  "User": {
    "id": 2,
    "username": "JaneDoe",
    "email": "janedoe@gmail.com",
    "role": "user",
    "phoneNumber": "555-555-5556",
    "address": "456 Park Ave",
    "createdAt": "2023-01-18T11:10:09.063Z",
    "updatedAt": "2023-01-18T11:10:09.063Z"
  }
}
```

_404 - not found_
```json
{
  "message": "Movie not found"
}
```

## `GET /genres`
#### Description
- get all genres

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

#### Response
_200 - OK_
```json
[
  {
    "id": 1,
    "name": "Action",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  },
]
```

## `POST /genres`
#### Description
- create a new genre

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
- body
```json
{
  "name": "Thriller"
}
```

#### Response
_201 - created_
```json
{
  "id": 4,
  "name": "Thriller",
  "updatedAt": "2023-01-18T11:10:09.620Z",
  "createdAt": "2023-01-18T11:10:09.620Z"
}
```

_400 - bad request_
```json
{
  "message": "Name must be filled"
}
```


## `DELETE /genres/:id`
#### Description
- delete a genre by id

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

#### Response
_200 - OK_
```json
{
  "message": "Genre deleted"
}
```

_404 - not found_
```json
{
  "message": "Genre not found"
}
```

## `POST /pub/register`
#### Description
- register a new customer

#### Request
- body
```json
{
  "email": "johndoe@gmail.com",
  "password": "hahaha",
}
```

#### Response
_201 - created_
```json
{
  "message": "Customer with email johndoe@gmail.com has been registered!"
}
```

_400 - bad request_
```json
or
{
  "message": "Password length must contain at least 5 character"
}
or
{
  "message": "Password is required"
}
or
{
  "message":"Email format is invalid"
}
or
{
  "message": "Email already registered"
}
```

## `POST /pub/login`
#### Description
- login a user

#### Request
- body
```json
{
  "email": "johndoe@gmail.com",
  "password": "hahaha",
}
```

#### Response
_200 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```

_400 - bad request_
```json
{
  "message": "Invalid email or password"
}
```

## `POST /pub/google-sign-in`
#### Description
- login/register user with google credential

#### Request
- headers
```json
{
  "google-auth-token": "token"
}
```

#### Response
_200 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
_201 - OK_
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
## `GET /pub/movies`
#### Description
- Get movie list
#### Request
- query

| param | defaultValue | description |
|---|---|---|
| `page` | 1 | page for pagination |
| `perPage` | 10 | movie count for each page |
| `page` | 1 | page for pagination |
| `sortby` | | sort result by its column ex: `title-asc`, `rating-desc` |
| `genre` | | include only selected genre ex: `1` or `1,4,2` |
| `rating` | `1-10` | filter by rating range |
| `search` |  | search from movie title |

usage example: `/pub/movies?search=madun&page=2`

#### Response
_200 - OK_
```json
{
  "totalPage": 100,
  "currentPage": 1,
  "movies": [
    {
      "id": 6,
      "title": "The Secret World of Arrietty",
      "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
      "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
      "rating": 7,
      "genreId": 4,
      "authorId": 2,
      "createdAt": "2023-01-18T11:10:09.622Z",
      "updatedAt": "2023-01-18T11:10:09.622Z",
      "Genre": {
        "id": 4,
        "name": "Thriller",
        "createdAt": "2023-01-18T11:10:09.620Z",
        "updatedAt": "2023-01-18T11:10:09.620Z"
      }
    },
  ]
}
```
## `GET /pub/movies/random`
#### Description
- Get random movie from db
#### Response
_200 - OK_
```json
{
  "id": 6,
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2,
  "createdAt": "2023-01-18T11:10:09.622Z",
  "updatedAt": "2023-01-18T11:10:09.622Z",
  "Genre": {
    "id": 4,
    "name": "Thriller",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  }
},

```
## `GET /pub/movies/:id`
#### Description
- Get random movie detail by id
#### Response
_200 - OK_
```json
{
  "id": 6,
  "title": "The Secret World of Arrietty",
  "synopsis": "A family of tiny people who live anonymously in another family's residence must avoid being discovered by the human inhabitants of the house.",
  "trailerUrl": "https://www.youtube.com/watch?v=gvwvZ5ljKcw",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMjE4NzA4MjUyMV5BMl5BanBnXkFtZTgwMzA4NjUwNzE@._V1_SY1000_CR0,0,724,1000_AL_.jpg",
  "rating": 7,
  "genreId": 4,
  "authorId": 2,
  "createdAt": "2023-01-18T11:10:09.622Z",
  "updatedAt": "2023-01-18T11:10:09.622Z",
  "Genre": {
    "id": 4,
    "name": "Thriller",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  }
},

```

## `GET /pub/genres`
#### Description
- get genre list
#### Response
_200 - OK_
```json
[
  {
    "id": 1,
    "name": "Action",
    "createdAt": "2023-01-18T11:10:09.620Z",
    "updatedAt": "2023-01-18T11:10:09.620Z"
  },
  ...
]
```

## `POST /pub/register`
#### Description
- Register a customer

#### Request
- body
```json
{
  "email": "johndoe@gmail.com",
  "password": "12345"
}
```

#### Response
- _201 - Created_
```json
{
  "message": "Customer with email johndoe@gmail.com has been registered!",
  "access_token": "token",
}
```
## `POST /pub/login`
### Description
- Register a customer

#### Request
- body
```json
{
  "email": "johndoe@gmail.com",
  "password": "12345"
}
```

#### Response
- _200 - OK_
```json
{
  "access_token": "token",
}
```
#### Response
- _401 - UnAuthorized_
```json
{
  "message": "Email or Password is invalid",
}
```

## `GET /pub/customer/favorites`
#### Description
- Get customer favorites movies

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
#### Response 
- _200 OK_
```json
[
  {
    "id": 1,
    "title": "Your Name",
    "synopsis": "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    "trailerUrl": "https://www.youtube.com/watch?v=hRfHcp2GjVI",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@.V1_SY1000_CR0,0,631,1000_AL.jpg",
    "rating": 8,
    "genreId": 10,
    "authorId": 5,
    "status": "active",
    "createdAt": "2023-02-05T03:46:13.738Z",
    "updatedAt": "2023-02-05T03:46:13.738Z",
    "Favorite": {
      "CustomerId": 1,
      "MovieId": 1,
      "createdAt": "2023-02-05T03:47:00.891Z",
      "updatedAt": "2023-02-05T03:47:00.891Z"
    }
  },
]

```

## `POST /pub/customer/favorites/:movieId`
#### Description
- Add customer favorites movies

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
#### Response
_201 - Created_
```json
{ "message": "Added to favorite list" }
```
## `DELETE /pub/customer/favorites/:movieId`
#### Description
- Add customer favorites movies

#### Request
- headers
```json
{
  "access_token": "eyJhbGciOiJIUzI6IkpXVCJ9.eyJpZCI6MTksIbiIsImlhdCI6MTY3NDA0MTUxNH0.VzKHi3txzLsPk75zgGPkDtbXtFKfc2g2Ve"
}
```
#### Response
_200 - OK_
```json
{ "message": "Date removed" }
```


### Global Error
#### Response
_500 - internal server error_
```json
{
  "message": "Internal server error"
}
```

_401 - unauthorized_
```json
{
  "message": "Unauthorized"
}
```

_403 - forbidden_
```json
{
  "message": "Forbidden"
}
```

_404 - not found_
```json
{
  "message": "Not found"
}
```

_400 - bad request_
```json
{
  "message": "Bad request"
}
```



