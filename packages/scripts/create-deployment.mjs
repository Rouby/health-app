#!/usr/bin/env zx

const revision = await $`git rev-parse --short HEAD`;

const user = await $`git config user.name`;

console.log(revision.stdout.trim(), user.stdout.trim());

const serviceGUID = "Mzc0MzkxOHxBUE18QVBQTElDQVRJT058NDM4NTI3MDU5";
const browserAppGUID = "Mzc0MzkxOHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzNTg5Njk3Mg";

const version = require("../../package.json").version;

await $`curl -X POST https://api.newrelic.com/graphql \
-H 'Content-Type: application/json' \
-H 'API-Key: YOUR_NEW_RELIC_USER_KEY' \
-d '${JSON.stringify({
  query: `mutation {
  createServiceDeployment: changeTrackingCreateDeployment(
    deployment: {
      entityGuid: "${serviceGUID}"
      version: "${version}"
      user: "${user.stdout.trim()}"
      groupId: "${revision.stdout.trim()}"
      commit: "${revision.stdout.trim()}"
      deploymentType: BASIC
    }
  ) {
    deploymentId
  }

  createBrowserDeployment: changeTrackingCreateDeployment(
    deployment: {
      entityGuid: "${browserAppGUID}"
      version: "${version}"
      user: "${user.stdout.trim()}"
      groupId: "${revision.stdout.trim()}"
      commit: "${revision.stdout.trim()}"
      deploymentType: BASIC
    }
  ) {
    deploymentId
  }
}`,
})}'`;
