import apply from '#apply';
import partial from '#partial';
import reset from '#reset';

export default apply(partial(reset, 'name'), 'rename');
