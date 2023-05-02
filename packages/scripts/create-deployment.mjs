#!/usr/bin/env zx

$.quote = (s) => s;

const revision = await $`git rev-parse --short HEAD`;

const user = await $`git config user.name`;

console.log(revision.stdout.trim(), user.stdout.trim());

const serviceGUID = "Mzc0MzkxOHxBUE18QVBQTElDQVRJT058NDM4NTI3MDU5";
const browserAppGUID = "Mzc0MzkxOHxCUk9XU0VSfEFQUExJQ0FUSU9OfDUzNTg5Njk3Mg";

const version = require("../../package.json").version;

const query = `mutation($serviceGUID: EntityGuid!, $browserAppGUID: EntityGuid!, $version: String!, $user: String!, $revision: String!) {
  createServiceDeployment: changeTrackingCreateDeployment(
    deployment: {
      entityGuid: $serviceGUID
      version: $version
      user: $user
      groupId: $revision
      commit: $revision
      deploymentType: BASIC
    }
  ) {
    deploymentId
  }

  createBrowserDeployment: changeTrackingCreateDeployment(
    deployment: {
      entityGuid: $browserAppGUID
      version: $version
      user: $user
      groupId: $revision
      commit: $revision
      deploymentType: BASIC
    }
  ) {
    deploymentId
  }
}`;

await $`curl -X POST https://api.eu.newrelic.com/graphql \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' \
-H 'Api-Key: NRAK-QYLB0HYRO56G1WZEHOKNF1VJY19' \
-d '${JSON.stringify({
  query,
  variables: {
    serviceGUID,
    browserAppGUID,
    version,
    user: user.stdout.trim(),
    revision: revision.stdout.trim(),
  },
})}'`;
