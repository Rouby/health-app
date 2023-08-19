# health-app

## Development

### Setup

```bash
$ yarn install
```

Copy .env.template to .env and fill in the values. Use a MySQL database. You can use the `pscale` CLI to connect to the database.

### Run

```bash
$ yarn dev
```

### Test

```bash
$ yarn test
```

### Deploy

```bash
$ yarn deploy
```

### i18n

First extract messages

```bash
$ yarn workspace @rouby/health-app-frontend i18n:extract
```

Then translate the messages in `packages/frontend/i18n` and then compile them.

```bash
$ yarn workspace @rouby/health-app-frontend i18n:compile
```

This will generate files in public folder ready to be included in the build.
