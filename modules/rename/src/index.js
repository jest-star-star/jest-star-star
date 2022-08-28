import bind from '#bind';
import reset from '#reset';

// Use a Y combinator???
// A Y combinator!  So fancy.
// function Y() {}

export default reset('name', bind(reset, 'name'), 'rename');
