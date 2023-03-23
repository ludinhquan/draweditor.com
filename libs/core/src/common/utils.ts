import {Result} from '@draweditor.com/core';
import {exec} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export function writeFile(filePath: string, content: string, options?: {flag: string}) {
  try {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, {recursive: true});
    return fs.promises.writeFile(filePath, content, options);
  } catch (error) {
    return Result.fail(error)
  }
}

export function executeCommand(command: string): Promise<{command: string, error?: Error, result?: string}> {
  return new Promise(res => {
    exec(command, (error, result) => {
      if (error) res({command, error})
      res({command, result})
    })
  })
}
