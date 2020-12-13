console.log('task-2-b run');

const URL ='http://jsonplaceholder.typicode.com/users'

//print
fetch(URL)
  .then((res) => res.json())
  .then((users) => {
    console.log(users.filter((user) => /(\.org|\.biz)$/.test(user.email)));
});