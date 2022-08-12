export default function createProcess({ esbuildOptions, transformSync }) {
	return process;

	function process(sourceText, sourcePath) {
		const options = { ...esbuildOptions, sourcefile: sourcePath };
		const { code, map } = transformSync(sourceText, options);
		const transformedSource = { code, map };

		return transformedSource;
	}
}
