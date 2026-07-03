const normalizeFavicon = require("./normalize-favicon");
const path = require("path");

normalizeFavicon(
  path.join(__dirname, "favicon.svg"),
  path.join(__dirname, "..", "..", ".cache", "favicon.normalized.svg")
);
