import { expect, it } from 'vitest'
import { SimpleFileCreator } from '../src'
import { resolve } from 'node:path'
import { pathExistsSync } from 'fs-extra'

it('Check if the file exists', function () {
  const fsn = new SimpleFileCreator(resolve(__dirname, 'folder'))
  const sub = fsn.pushFolder('sub')
  const ts = sub.pushFile('hellow.ts', `console.log('${'hellow'}')`)
    .pushFile('world.ts', `console.log('${'world'}')`)

  expect(fsn).toMatchInlineSnapshot(`
    SimpleFileCreator {
      "base": "folder",
      "children": [
        SimpleFileCreator {
          "base": "sub",
          "children": [
            SimpleFileCreator {
              "base": "hellow.ts",
              "children": [],
              "cover": true,
              "dir": "D:\\workspace\\file-scope\\test\\folder\\sub",
              "ext": ".ts",
              "name": "hellow",
              "parent": [Circular],
              "path": "D:\\workspace\\file-scope\\test\\folder\\sub\\hellow.ts",
              "root": "D:\\",
            },
            SimpleFileCreator {
              "base": "world.ts",
              "children": [],
              "cover": true,
              "dir": "D:\\workspace\\file-scope\\test\\folder\\sub",
              "ext": ".ts",
              "name": "world",
              "parent": [Circular],
              "path": "D:\\workspace\\file-scope\\test\\folder\\sub\\world.ts",
              "root": "D:\\",
            },
          ],
          "cover": true,
          "dir": "D:\\workspace\\file-scope\\test\\folder",
          "ext": "",
          "name": "sub",
          "parent": [Circular],
          "path": "D:\\workspace\\file-scope\\test\\folder\\sub",
          "root": "D:\\",
        },
      ],
      "cover": true,
      "dir": "D:\\workspace\\file-scope\\test",
      "ext": "",
      "name": "folder",
      "parent": null,
      "path": "D:\\workspace\\file-scope\\test\\folder",
      "root": "D:\\",
    }
  `)

  expect(pathExistsSync(fsn.path)).toBeTruthy()
  expect(pathExistsSync(sub.path)).toBeTruthy()
  expect(pathExistsSync(ts.path)).toBeTruthy()
})

it('Test delete', function () {
  const path = resolve(__dirname, 'testDeleteFolder')
  const folder = new SimpleFileCreator(path)
  const delFile = folder.pushFile('delete.txt', 'delete')

  expect(pathExistsSync(delFile.path)).toBeTruthy()
  expect(pathExistsSync(folder.path)).toBeTruthy()

  delFile.delete()
  expect(pathExistsSync(delFile.path)).toBeFalsy()

  folder.delete()
  expect(pathExistsSync(folder.path)).toBeFalsy()
})

it('Test error', function () {
  const path = resolve(__dirname, 'testErrorFolder')
  const folder = new SimpleFileCreator(path)

  expect(() => folder.pushFolder('testErr1/sub')).toThrowError()
  expect(() => folder.pushFolder('testErr1/sub.ts')).toThrowError()
})
