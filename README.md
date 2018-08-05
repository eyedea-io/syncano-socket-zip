# Syncano Socket for creating ZIP archive

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-zip/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-zip/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-zip/master.svg)](https://codecov.io/gh/eyedea-io/syncano-socket-simple-zip)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/zip.svg)](https://www.npmjs.com/package/@eyedea-sockets/zip)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-zip.svg)

Main Socket features:

* **zip/generate** — generate zip file from HTML

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/zip --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

// FormData with the file
const form = new FormData()
form.append('file', fs.createReadStream(fileLocalPath))
form.append('filename', 'archive')

const sendStatus = await s.post('zip/archive', form)
```

## Endpoints

### zip/archive

#### Input:

|Parameter     | Type | Required  | Example          |
|--------------|------|-----------|------------------|
|filename      |string|       Yes | `archive`        |
|file          |file  |       Yes |                  |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/zip

Zip file.

**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |
