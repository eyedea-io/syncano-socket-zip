import * as S from '@eyedea/syncano'
import archiver from 'archiver'
import fs from 'fs'

// Arguments
declare const Buffer

interface Args {
  file: Buffer
  filename: string
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response, logger}: S.Core,
    {args}: S.Context<Args>
  ) {
    const {info} = logger('archive')
    const zipFileName = `${args.filename}.zip`
    const output = fs.createWriteStream(zipFileName)

    await new Promise((resolve, reject) => {
      const archive = archiver('zip', {zlib: {level: 9}})
      archive.pipe(output)

      fs.writeFileSync(args.filename, args.file)

      // listen for all archive data to be written
      output.on('close', () => {
        info(`${archive.pointer()} total bytes`)
        info('archiver has been finalized and the output file descriptor has closed')
        resolve()
      })

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', () => reject)

      // good practice to catch this error explicitly
      archive.on('error', () => reject)

      archive.append(args.file, {name: args.filename})
      archive.finalize()
    })

    response.header('Content-Disposition', `attachment; filename="${zipFileName}`)
    response(fs.readFileSync(zipFileName), 200, 'application/octet-stream')
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
