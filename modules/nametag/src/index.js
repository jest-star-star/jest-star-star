import bind from '#bind';
import propertytag from '#propertytag';
import rename from '#rename';

export default rename(bind(propertytag, 'name'), 'nametag');
