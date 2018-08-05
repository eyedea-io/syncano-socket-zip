# Syncano Socket for generating PDF from HTML

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-pdf/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-pdf/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-pdf/master.svg)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/pdf.svg)](https://www.npmjs.com/package/@eyedea-sockets/pdf)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-pdf.svg)

Main Socket features:

* **pdf/generate** — generate PDF file from HTML

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/pdf --save
npx s deploy
```

Use it:

```sh
wget https://<instanceName>.syncano.site/pdf/generate?html=<h1>Tests</h1>
```

## Endpoints

### pdf/generate

#### Input:

|Parameter | Type | Required  | Example                           |
|----------|------|-----------|-----------------------------------|
|html      |string|       Yes | `<h1>Test<h1>`                    |
|css       |string|       Yes | `h1 {background-color: lightblue}`|
|filename  |string|       Yes | `output.pdf`                      |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/pdf

PDF file.

**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Invitation failed      | `Internal error.`    |
