import hashsum from '#hashsum';

import { dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';

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
