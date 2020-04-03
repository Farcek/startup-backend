import { Model } from 'objection';

export class DBSession extends Model {
    id!: string;
    userly!: string;
    userly_token!: string;
    created_at!: Date;
    expired_at!:Date;
    static get tableName() {
        return 'sessions';
    }
}