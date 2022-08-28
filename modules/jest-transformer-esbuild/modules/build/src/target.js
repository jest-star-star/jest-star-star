import semver from 'semver';

const version = semver.minVersion(process.env.npm_package_engines_node);

export default `node${version}`;
