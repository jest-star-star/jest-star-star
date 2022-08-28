import partial from '#partial';
import reset from '#reset';

// Use a Y combinator???
// A Y combinator!  So fancy.
// function Y() {}

export default reset('name', partial(reset, 'name'), 'rename');
