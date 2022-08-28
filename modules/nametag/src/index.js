import apply from '#apply';
import propertytag from '#propertytag';
import rename from '#rename';

export default rename(apply(propertytag, 'name'), 'nametag');
