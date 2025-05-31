const http = require('http');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, './db/todo.json');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  // console.log(url, 'uri');

  // console.log(req.url, req.method);

  // GET /todos → Get all todos
  if (pathname === 'todos' && req.method === 'GET') {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    res.writeHead(200, {
      'content-type': 'application/json',
      // email: 'ph@gmail.com',
    });

    // res.setHeader('content-type', 'text/plain');
    // res.setHeader('email', 'ph2@gmail.com');
    // res.statusCode = 201;

    res.end(data);
  }

  // POST /todos/create-todo → Create a new todo
  else if (pathname === '/todos/create-todo' && req.method === 'POST') {
    let data = '';

    req.on('data', (chunk) => {
      data = data + chunk;
    });

    req.on('end', () => {
      // console.log(data);
      const { title, body } = JSON.parse(data);
      const createdAt = new Date().toLocaleString();

      // Read existing todos
      const allTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
      const parseAllTodo = JSON.parse(allTodos);

      parseAllTodo.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodo, null, 2), {
        encoding: 'utf-8',
      });

      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  } else if (pathname === '/todo' && req.method === 'GET') {
    const title = url.searchParams.get('title');
    // console.log(title);
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const parseData = JSON.parse(data);

    const todo = parseData.find((todo) => todo.title === title);
    const stringifiedTodo = JSON.stringify(todo);

    res.writeHead(200, {
      'content-type': 'application/json',
    });

    res.end(stringifiedTodo);
  } else if (pathname === '/todos/update-todo' && req.method === 'PATCH') {
    const title = url.searchParams.get('title');

    let data = '';
    req.on('data', (chunk) => {
      data = data + chunk;
    });

    req.on('end', () => {
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
      const parsedAllTodos = JSON.parse(allTodos);

      const todoIndex = parsedAllTodos.findIndex((todo) => todo.title == title);
      parsedAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
        encoding: 'utf-8',
      });

      res.end(
        JSON.stringify(
          {
            title,
            body,
            createdAt: parsedAllTodos[todoIndex].createdAt,
          },
          null,
          2
        )
      );
    });
  } else if (pathname === '/todos/delete-todo' && req.method === 'DELETE') {
    let title = url.searchParams.get('title');

    const allTodos = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const parsedAllTodos = JSON.parse(allTodos);

    const updatedTodos = parsedAllTodos.filter((todo) => todo.title != title);
    console.log(updatedTodos);
    fs.writeFileSync(filePath, JSON.stringify(updatedTodos, null, 2), {
      encoding: 'utf-8',
    });

    res.writeHead(200, {
      'content-type': 'application/json',
    });

    res.end(JSON.stringify({ message: 'Todo deleted successfully', title }));
  } else {
    res.end('route not found');
  }
});

server.listen(5000, '127.0.0.1', () => {
  console.log('✅ server listening to port 5000');
});
