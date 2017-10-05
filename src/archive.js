import fs from 'fs'
import archiver from 'archiver'
import Syncano from 'syncano-server'

export default (ctx) => {
  const {response, logger} = new Syncano(ctx)
  const {info, warning, error} = logger('archive')

  const zipFileName = `${ctx.args.filename}.zip`
  const output = fs.createWriteStream(zipFileName)

  if (!ctx.args.filename) {
    response.json({message: 'Missing argument: filename'}, 400)
    process.exit()
  }

  if (!ctx.args.file) {
    response.json({message: 'Missing argument: file'}, 400)
    process.exit()
  }

  return new Promise((resolve, reject) => {
    const archive = archiver('zip', {zlib: { level: 9 }})
    archive.pipe(output)

    fs.writeFileSync(ctx.args.filename, ctx.args.file)

    // listen for all archive data to be written
    output.on('close', () => {
      info(`${archive.pointer()} total bytes`)
      info('archiver has been finalized and the output file descriptor has closed')
      resolve()
    })

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', (err) => {
      warning(err)
      reject(err)
    })

    // good practice to catch this error explicitly
    archive.on('error', (err) => {
      error(err)
      reject(err)
    })

    archive.append(ctx.args.file, { name: ctx.args.filename })
    archive.finalize()
  })
  .then(() => {
    response.header('Content-Disposition', `attachment; filename="${zipFileName}`)
    response(fs.readFileSync(zipFileName), 200, 'application/octet-stream')
  })
  .catch((message) => {
    response.json({message}, 400)
  })
}
