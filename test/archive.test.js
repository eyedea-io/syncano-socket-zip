/* global describe it */
import fs from 'fs'
import unzip from 'unzip'
import {assert} from 'chai'
import {run, generateMeta} from 'syncano-test'

describe('archive', function () {
  const meta = generateMeta()

  const args = {
    file: fs.readFileSync('./test/assets/file.txt'),
    filename: 'file.txt'
  }

  it('one text file', function (done) {
    run('archive', {args, meta})
      .then(res => {
        fs.writeFileSync('test.zip', res.data)
        fs.createReadStream('test.zip')
        .pipe(unzip.Parse())
        .on('entry', (entry) => {
          assert.propertyVal(entry, 'path', args.filename)
        })
        .on('close', () => {
          assert.propertyVal(res, 'code', 200)
          done()
        })
      })
  })

  it('with request without filename', function (done) {
    const noFileNameArgs = Object.assign({}, args)
    delete noFileNameArgs.filename

    run('archive', {args: noFileNameArgs, meta})
      .then(res => {
        assert.propertyVal(res, 'code', 400)
        assert.propertyVal(res.data, 'message', 'Missing argument: filename')
        done()
      })
  })

  it('without file', function (done) {
    const noFileArgs = Object.assign({}, args)
    delete noFileArgs.file

    run('archive', {args: noFileArgs, meta})
      .then(res => {
        assert.propertyVal(res, 'code', 400)
        assert.propertyVal(res.data, 'message', 'Missing argument: file')
        done()
      })
  })
})
