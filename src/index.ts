import { ensureDirSync, pathExistsSync, removeSync, outputFileSync } from 'fs-extra'
import { parse, type ParsedPath, join } from 'node:path'

export default class SimpleFileCreator {
  path = ''
  name = ''
  ext = ''
  base = ''
  dir = ''
  root = ''
  children = [] as Array<SimpleFileCreator>
  parent: SimpleFileCreator | null = null
  cover = true

  constructor(path: string, cover = true) {
    this.path = path
    this.cover = cover
    const parsePath: ParsedPath = parse(this.path)
    let key: keyof ParsedPath
    for (key in parsePath) {
      this[key] = parsePath[key]
    }

    if (!this.parent) {
      if (!this.ext) {
        this.createFolderSync()
      }
      else {
        this.createFileSync()
      }
    }
  }

  pushFolder(name: string): SimpleFileCreator {
    return this.createChild(name, (child: SimpleFileCreator) => {
      child.cover = this.cover
      child.createFolderSync()
    })
  }

  pushFile(name: string, content = ''): SimpleFileCreator {
    const ctx = this.ext ? this.parent : this

    return this.createChild.call(ctx, name, (child: SimpleFileCreator) => {
      child.createFileSync(content)
    })
  }

  delete() {
    const parent = this.parent
    removeSync(this.path)
    if (!parent) {
      return
    }
    parent.children.splice(parent.children.findIndex(child => child === this), 1)
  }

  private createChild(name: string, callback: Function): SimpleFileCreator {
    if (/[\\/:*?]/.test(name)) {
      throw new Error('The file name cannot contain the following characters: \\/:*?')
    }
    const child = new SimpleFileCreator(join(this.path, name))
    this.children.push(child)
    child.parent = this
    callback(child)
    return child
  }

  private createFolderSync() {
    const isExist = pathExistsSync(this.path)
    if (this.cover && isExist) {
      removeSync(this.path)
    }
    ensureDirSync(this.path)
  }

  private createFileSync(content = '') {
    outputFileSync(this.path, content)
  }
}
