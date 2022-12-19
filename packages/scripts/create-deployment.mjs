#!/usr/bin/env zx

const revision = await $`git rev-parse --short HEAD`;

const user = await $`git config user.name`;

console.log(revision.stdout.trim(), user.stdout.trim());

const version = require("../../package.json").version;

await $`curl -X 'POST' \
'https://api.eu.newrelic.com/v2/applications/438527059/deployments.json' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-H "X-Api-Key: NRAK-QYLB0HYRO56G1WZEHOKNF1VJY19" \
-d ${JSON.stringify({
  deployment: {
    // changelog: "",
    // description: "",
    revision: `v${version} (${revision.stdout.trim()})`,
    user: user.stdout.trim(),
  },
})}`;
