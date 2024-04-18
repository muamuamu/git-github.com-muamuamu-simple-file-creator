# simple-file-creator

A library for creating file structures through simple node operations.

```shell
npm install simple-file-creator
```

- `new SimpleFileCreator(path, cover)`
  - `path`  `<String>` Create a folder as the root node. 
  - `cover` `<String>` Overwrite existing folder
  
- `instance.pushFolder(folderName)`
  - `folderName`  `<String>` Create the name of the folder

- `instance.pushFile(fileName, content)`
  - `fileName`  `<String>` Create file name (eg.ts)
  - `content`  `<String>` File content

### Example

```ts
import SimpleFileCreator from 'simple-file-creator'
import { resolve } from 'node:path'
 
const fsn = new SimpleFileCreator(resolve(__dirname, 'folder'), defaultConfig) 
//folder

const sub = fsn.pushFolder('sub')
//folder
//   └─sub

const ts = sub.pushFile('hellow.ts', `console.log('${'hellow'}')`)
              .pushFile('world.ts', `console.log('${'world'}')`)
//testFolder
//   └─sub
//      └─hellow.ts
//      └─world.ts

ts.delete()
//folder
//   └─sub
//      └─hellow.ts

sub.delete()
//folder
```
## License

[MIT](./LICENSE) License © 2024-PRESENT [muamuamu](https://github.com/muamuamu)