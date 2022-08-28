import partial from '#partial';
import propertytag from '#propertytag';
import rename from '#rename';

export default rename(partial(propertytag, 'name'), 'nametag');
