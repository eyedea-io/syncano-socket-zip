/* global describe it expect */
import fs from 'fs'
import path from 'path'
import unzip from 'unzip'
import * as mockArchiver from 'archiver'

import {run} from '@syncano/test'

describe('send', () => {
  const args = {
    file: fs.readFileSync('./test/assets/file.txt'),
    filename: 'file.txt'
  }

  it('one text file', async () => {
    const result = await run('archive', {args})
    fs.writeFileSync(path.join('test', '.results', 'test.pdf'), result.data)
    fs.createReadStream('test.zip')
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        expect(entry).toHaveProperty('path', args.filename)
      })
      .on('close', () => {
        expect(result).toHaveProperty('code', 200)
      })
  })

  it('archiver throws error', async () => {
    const errorMsg = 'Error!'
    mockArchiver.default = jest.fn()
    mockArchiver.default.mockImplementation(() => {
      throw new Error(errorMsg)
    })

    const result = await run('archive', {args})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', errorMsg)
  })

  it('with request without filename', async () => {
    const noFileNameArgs = Object.assign({}, args)
    delete noFileNameArgs.filename

    run.verifyResponse = false
    const result = await run('archive', {args: noFileNameArgs})
    expect(result).toHaveProperty('code', 400)
    expect(result.data[''][0]).toBe('The filename field is required.')
  })

  it('without file', async () => {
    const noFileArgs = Object.assign({}, args)
    delete noFileArgs.file

    const result = await run('archive', {args: noFileArgs})
    expect(result).toHaveProperty('code', 400)
    expect(result.data[''][0]).toBe('The file field is required.')
  })
})
