Package.describe({
  name: "vatfree:slack-api",
  version: "0.0.4",
  // Brief, one-line summary of the package.
  summary: "Slack API written for meteor",
  // URL to the Git repository containing the source code for this package.
  git: "https://github.com/joephuz/meteor-slack-api.git",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom(["3.0"]);
  api.addFiles("slack-api.js", ["server"]);
  api.export("SlackAPI", ["server"]);
  api.use("fetch", ["server"]);
});

Package.onTest(function (api) {
  api.use("tinytest");
  api.use("joephuz:slack-api");
  api.addFiles("slack-api-tests.js", ["server"]);
});
