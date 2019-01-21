Tutorial:

https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1

`yarn install && node server`

Then visit `localhost:4000/graphql`

```
query getSingleCourse($courseID: Int!) {
    course(id: $courseID) {
        title
        author
        description
        topic
        url
    }
}
```

Query Variables

```
{ 
    "courseID":1
}
````

Aliases & Fragments

```
query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
      course1: course(id: $courseID1) {
             ...courseFields
      },
      course2: course(id: $courseID2) {
            ...courseFields
      } 
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

```


After adding mutation code run mutation:

```
mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ... courseFields
  }
}
```