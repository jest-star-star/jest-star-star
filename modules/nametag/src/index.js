import partial from '#partial';
import propertytag from '#propertytag';
import rename from '#rename';

export default rename('nametag', partial(propertytag, 'name'));
