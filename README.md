# User Management System
ReactJS, Redux and Enzyme for testing.

## Live demo

  http://albsugy.com/live/users-system

## Getting Started
Task | Description
---  | ---
`npm install` | install all the dependencies.
`npm start` | start the aplication at http://localhost:3000/
`npm run test` | test the aplication
`npm run build` | build for production

## Features
- List of existing users.
- list of existing groups.
- Create users.
- Create groups.
- Delete users.
- Delete groups when they no longer have members.
- Assign users to a group they aren’t already part of.
- Remove users from a group.
- A user detail page.
- A group detail page.
- Search functionality.
- A user cannot exist without having at least one group.
- Responsive layout.
- Input validation.
- ES6 syntax!
- Offline capabilities.


## Pages


Page | URL
---  | ---
Users | `http://localhost:3000/users`
Add user | `http://localhost:3000/users/add`
View & edit user | `http://localhost:3000/users/name`
Groups | `http://localhost:3000/groups`
Add group | `http://localhost:3000/groups/add`
View & edit group | `http://localhost:3000/groups/id`


##  List of expected API endpoints
* 	`/users`

This endpoind expects a JSON array of objects that returns a list of users.

```
[{
  name: 'Jason Nichols',
  groups: [{id:1},{id:2}]
}, {
  name: 'Brian Horton',
  groups: [{id:3},{id:4}]
}]
```


* `/groups`  

This endpoind expects a JSON array of objects that returns a list of groups.

```
[{
  id:1, name:'Backpackers'
}, {
  id:2, name:'Globetrotter'
}]
```

## Technologies
- ReactJS
- Redux
- Jest
- Enzyme
- Webpack
- ES6
- SASS
- Bootstrap
