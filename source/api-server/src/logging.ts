import axios from 'axios';
import { SpanStatusCode } from '@opentelemetry/api';
import {traceObject} from './traceing';


export interface logContent {
    level: string,
    namespace: string,
    job: string,
    endpointLabel: string,
    duration: number,
    endpoint: string,
    message: string
}

//const serviceName = 'api-server';

export async function logUtils(tracingObj: traceObject): Promise<(details: logContent)=>{}> {

    const { tracer } = tracingObj;

    const toLokiServer = async (details: logContent) => {
        const { message, level, job, endpointLabel, endpoint, namespace, duration } = details;
        let error = false;
        let stream = {
            service_name: 'api-server',
            level,
            job,
            namespace,
            endpoint,
            duration: `${duration}`
        };

        try {
                await axios.post(process.env.LOGS_TARGET as string, {
                    'streams': [
                        {
                            stream,
                            'values': [
                                [ `${Date.now() * 1000000}`, message ]
                            ]
                        }
                        ]
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );   
        } catch (error) {
            console.log(`Logging error: ${error}`);
            error = true;            
        }

        return error;

    }



    // Logging system sends to Loki
    const logEntry = async (details: logContent) => {
        let logSpan;
        let error = false;

        // * Context = api-server *
        // Create a new span
        logSpan = tracer.startSpan("log_to_loki");

        if (process.env.LOGS_TARGET) {
            error = await toLokiServer(details);
        } else {
            console.log(details.message);
        }

        // * Context = api-server *
        // Set the status code as OK and end the span
        logSpan.setStatus({ code: (!error) ? SpanStatusCode.OK : SpanStatusCode.ERROR });
        logSpan.end();
        
    };

    return logEntry;

}


