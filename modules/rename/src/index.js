import partial from '#partial';
import reset from '#reset';

export default reset('name', partial(reset, 'name'), 'rename');

// const rename = partial(reset, 'name');
// export default rename(rename, 'rename');

// function F(fn, ...args) {
// 	return fn(fn, ...args);
// }
// export default F(partial(reset, 'name'), 'rename');

// function I(x) {
// 	return x;
// }
// function K(x, y) {
// 	return x;
// }
// function S(x, y, z) {
// 	return x(z)(y(z));
// }
// export default S(I, foo, partial(reset, 'name'));
// function foo(rename) {
// 	return rename(rename, 'rename');
// 	// return S(I, rename, 'rename');
// }
