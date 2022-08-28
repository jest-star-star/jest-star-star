import apply from '#apply';
import reset from '#reset';

// Use a Y combinator???
// A Y combinator!  So fancy.
// function Y() {}

export default reset('name', apply(reset, 'name'), 'rename');
