import instanceOf from '#instanceOf';
import partial from '#partial';
import rename from '#rename';

export default rename('instanceOfTypeError', partial(instanceOf, TypeError));
