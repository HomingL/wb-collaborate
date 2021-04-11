# GraphQL Documentation for WBCollab 

### About

All the API can be tested on the GraphQL Playground once backend is running at http://localhost:5000/graphql. Both ways on running the APP will allow you to hit the Playground.

### Types

The following are types that are going to be used

```graphql
type User {                     # A User Type
  id: ID!                       # The Unique Id
  name: String!                 # The name of the user
  email: String!                # The email of the user (unique)
  whiteboards: [Whiteboard!]    # The whiteboards that user contains
}

type Whiteboard {               # A Whiteboard Type
  id: ID!                       # The Unique Id
  name: String!                 # The name of the whiteboard
  user: User!                   # The owner of the whiteboard
  data: String                  # The data within the whiteboard
}
```

### Additional

Some of the API requires the **authorization** headers to be working propery in that case you will need to manually add the header on the **Playground** at the very **bottom** in the **left** side and select the **HTTP HEADERS** field.

You can add as follow:

```graphql
{ "authorization" : "Bearer <token>"}
```

The **token** is the token you get after sign in, plese replace with the correct token

## User API

### SignUP

Description: Create (Sign Up) a new User

```graphql
type Mutation {
  Signup(input: SignupInput!): User!
}

input SignupInput {
  name: String!             # The user name
  email: String!            # The user email (must be email type)
  password: String!         # The password of user (strong, weak will fail)
}
```

Example:
```graphql
mutation Signup{
  Signup( 
    input: {
      password:"He12345678!", 
      email:"12345@12345.com", 
      name:"Diego"
    }
  )
  {
    id
    name
    email
  }
}
```

### SignIn

Description: Sign In as a User

```graphql
type Mutation {
    Signin(password: String!, email: String!): SigninResponse!
}

type SigninResponse {
  user: User!                   # The user
  token: String!                # The JWT Token (need to store manually for later use of testing the api's)
}
```

Example:
```graphql
mutation Signin {
  Signin(password: "He12345678!", email: "12345@12345.com") {
    user {
      id
      email
      name
    }
    token
  }
}
```


### GetUser

Description: Get the authenticated user
Header: **authorization**

```graphql
{ "authorization" : "Bearer <token>"}
```

```graphql
type Query {
  User: User!
}
```

Example:
```graphql
query GetUser {
  User {
    id
    name
    email
  }
}
```

## Whiteboard API

### CreateWhiteboard

Description: Create a whiteboard
Header: **authorization**

```graphql
{ "authorization" : "Bearer <token>"}
```

```graphql
type Mutation {
  CreateWhiteboard(input: WhiteboardNameInput!): Whiteboard!
}

input WhiteboardNameInput {
  name: String!                     # The name of the whiteboard
}
```

Example:
```graphql
mutation CreateWhiteboard{
  CreateWhiteboard(
  input: {
      name:"GGNB Whiteboard"
  }){
    id
    data
    name
    user{
      id
      name
      email
    }
  }
}
```

### UpdateWhiteboard

Description: Updates an existing whiteboard

```graphql
type Mutation {
  UpdateWhiteboard(input: UpdateWhiteboardInput!): String!
}

input UpdateWhiteboardInput {
  id: String!                 # The id of existing whiteboard
  data: String                # A string JSON representing the data in the whiteboard (must be json string)
}
```

Example:
```graphql
mutation UpdateWhiteboard{
  UpdateWhiteboard(
    input:{
      id:"769b02a7-5754-4fa8-848f-27b72f5f96ce", 
      data: "{\"version\":\"4.3.1\",\"objects\":[{\"type\":\"circle\",\"version\":\"4.3.1\",\"originX\":\"left\",\"originY\":\"top\",\"left\":100,\"top\":100,\"width\":60,\"height\":60,\"fill\":\"black\",\"stroke\":null,\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"radius\":30,\"startAngle\":0,\"endAngle\":6.283185307179586}]}"
    })
}
```

### DeleteWhiteboard

Description: Delete a whiteboard
Header: **authorization**

```graphql
{ "authorization" : "Bearer <token>"}
```

```graphql
type Mutation {
  DeleteWhiteboard(input: WhiteboardIdInput!): String!
}

input WhiteboardIdInput {
  id: String!                   # The whiteboard id
}
```

Example:
```graphql
mutation DeleteWhiteboard{
  DeleteWhiteboard(
    input: {
      id:"769b02a7-5754-4fa8-848f-27b72f5f96ce"
    })
}
```

### GetWhiteboards

Description: Get all whiteboards that belongs to the user
Header: **authorization**

```graphql
{ "authorization" : "Bearer <token>"}
```

```graphql
type Query {
  GetWhiteboards: [Whiteboard!]!
}
```

Example:
```graphql
query GetWhiteboards{
  GetWhiteboards{
    id
    name
    data
    user{
      id
      name
      email
    }
  }
}
```

### GetWhiteboards

Description: Get all whiteboards that belongs to the user

```graphql
type Query {
  GetWhiteboard(input: WhiteboardIdInput!): Whiteboard
}

input WhiteboardIdInput {
  id: String!                   # The whiteboard id
}
```

Example:
```graphql
query GetWhiteboard{
  GetWhiteboard(
    input: {
      id:"769b02a7-5754-4fa8-848f-27b72f5f96ce"
    }){
    id
    name
    data
  }
}
```
