import partial from '#partial';
import reset from '#reset';

export default reset('name', partial(reset, 'name'), 'rename');
