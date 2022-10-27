import hashsum from '#hashsum';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export default async function writeId({ infile, outfile }) {
	const intext = await readFile(infile);
	const items = [intext];
	const sum = hashsum(items);
	const outtext = `export default "${sum}";\n`;
	const outdir = dirname(outfile);
	await mkdir(outdir, { recursive: true });
	const promise = writeFile(outfile, outtext);

	return promise;
}
