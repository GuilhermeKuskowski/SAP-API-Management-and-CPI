using { db } from '../db/schema';

service PurchaseService {
    @odata.draft.enabled
    entity Orders as projection on db.Orders;
}
