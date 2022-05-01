import { schema } from '@ioc:Adonis/Core/Validator';
import Alert from 'App/Models/Alert';
import Report from 'App/Models/Report';

enum resolveStatusData { 
    'all',
    'ignored',
    'resolved'
} 

// alert state
enum alertStatusData { 
    'all',
    'unviewed'
} 


enum markStatus {
    'viewed',
    'ignored',
}

export default class AlertsController {

    public async alerts({request }) {

        const validator = schema.create({
            resolveStatus: schema.enum(Object.values(resolveStatusData)),
            status: schema.enum(Object.values(alertStatusData)),

            // pagination
            page: schema.number.optional(),
            limit: schema.number.optional(),
        });

        /**
         * Validate request body against the schema
         */
        await request.validate({ schema: validator });

        // pagination parameters...
        const page = request.input('page', 1);
        const limit = request.input('limit', 10);

        // filters (query parameters)
        const resolveStatus = request.input('resolveStatus'); // "all" or "unresolved"
        const alertStatus = request.input('status'); // "all" or "unviewed"

        // get all sensor readings...
        const alerts = Alert.query();

        // "all" or "unviewed" (view status is not viewed)
        if (alertStatus === 'unviewed') {
            alerts.where('alert_state', '=', 'new');
        }

        // all" or "unresolved" (resolve status is not resolved nor ignored)
        if (resolveStatus === 'unresolved') {
            alerts.where('resolve_state', '=', 'new');
        }

        // if ignored...
        if (resolveStatus === 'ignored') {
            alerts.where('resolve_state', '=', 'ignored');
        }

        if (resolveStatus === 'resolved') {
            alerts.where('resolve_state', '=', 'resolved');
        }

        // others...
        alerts.orderBy('updated_at', 'desc');
        alerts.paginate(page, limit); // pagination

        const results = await alerts;
        return results; // return alerts...
    }

    public async alertReports({request}) {

        const validator = schema.create({
            alertId: schema.number()
        });

        await request.validate({ schema: validator });

        // get all where sensor id

        const result = await Report.query().where('id', request.input('alertId'));

        return result;
    }

    public async markAlerts({request}) {

        const validator = schema.create({
            alerts: schema.array().members(schema.number()),
            status: schema.enum(Object.values(markStatus))
        });

        await request.validate({ schema: validator });

        const alerts = request.input('alerts');
        const status = request.input('status');

        // all is good...
        alerts.map(async (item) =>  {
        
            const alertData = await Alert.findOrFail(item);

            // check is status is viewed...
            if(status === 'viewed') {
                alertData.alert_state = status;
            }

            /****** handle ignore... */
            // check if resolve state
            if(status === 'ignored' && alertData.resolve_state !== 'resolved') {
                alertData.resolve_state = status; // update to ignore...
            }

            await alertData.save(); // save..
        });  
    }

}