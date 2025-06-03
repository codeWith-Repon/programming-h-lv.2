npm init -y
npm i -D typescript
npm install express
tsc --init

create git ignore file add file name e.g.node_module

set root and out directory
tsconfig.json -> "rootDir": "./src/"(all ts files), & "outDir": "./dist/"(compailed js files),

create server

```bash
import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

tsc

now run the js file inside dist folder not ts file.

tsc -w when ts file chenge autometically compalied ts file into js file.

