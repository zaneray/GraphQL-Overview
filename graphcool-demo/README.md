1) `npm install -g graphcool`
2) `graphcool init app-name`
3) `graphcool deploy` 
4) `graphcool playground`


```
Types

  User
   + A new type with the name `User` is created.
   ├─ +  A new field with the name `name` and type `String` is created.
   └─ +  A new field with the name `dateOfBirth` and type `DateTime` is created.

Resolver Functions

  hello
   + A new resolver function with the name `hello` is created.

Permissions

  Wildcard Permission
   ? The wildcard permission for all operations is added.

Here are your GraphQL Endpoints:

  Simple API:        https://api.graph.cool/simple/v1/cjr6xjd6018eg0150bqwz8n6f
  Relay API:         https://api.graph.cool/relay/v1/cjr6xjd6018eg0150bqwz8n6f
  Subscriptions API: wss://subscriptions.graph.cool/v1/cjr6xjd6018eg0150bqwz8n6f
  
```



Create a user:

```
mutation {
  createUser(dateOfBirth: "09/16/1987", name:"Doug Walter") {
			id
    	name
  }
}
```


Query users:
```
query {
  allUsers {
    id
  }
}
```


Query with filter:

```
query {
  allPosts(filter: {
    title_contains: "biggest"
  }) {
    id
    title
    published
  }
}

```

Traversing many nodes:

```
query {
  User(id: "cixnekqnu2ify0134ekw4pox8") {
    id
    name
    posts {
      id
      published
    }
  }
}

```


Mutations:

