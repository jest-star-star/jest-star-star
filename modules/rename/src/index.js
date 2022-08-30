import partial from '#partial';
import reset from '#reset';

export default reset('name', 'rename', partial(reset, 'name'));
