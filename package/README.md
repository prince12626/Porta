# Porta

Porta is a simple tunneling CLI that exposes local HTTP services to the internet.

## Installation

```bash
npm install -g @princechaurasiya/porta
```

## Authenticate

Log in to your Porta account:

```bash
porta login
```

## Start a tunnel

Start your local application, then pass its port to Porta:

```bash
porta http 3000
```

Porta will establish a tunnel and display its public URL.

## Check the version

```bash
porta -V
```

`porta --version` is also supported.

## Requirements

- Node.js 18+
- A Porta account

## Package

[npm: @princechaurasiya/porta](https://www.npmjs.com/package/@princechaurasiya/porta)

## License

MIT
