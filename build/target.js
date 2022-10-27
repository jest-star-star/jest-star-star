import semver from 'semver';

import process from 'node:process';

const version = semver.minVersion(process.env.npm_package_engines_node);

export default `node${version}`;
