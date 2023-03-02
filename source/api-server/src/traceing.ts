
import api, { Span, ROOT_CONTEXT, defaultTextMapSetter, Tracer, SpanStatusCode} from '@opentelemetry/api';
import { W3CTraceContextPropagator}  from '@opentelemetry/core';
import {envDetector, Resource} from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider } from  '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const serviceName = 'api-server';

export interface traceObject {
    tracer: Tracer,
    api: typeof api,
    propagator: (span: Span) => {},
    statusCode: typeof SpanStatusCode
}


export async function getTraceObject(): Promise<traceObject> {

    const detected: Resource = await envDetector.detect();   

    const resources = new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'api-server',
    }).merge(detected);  
    
    // create a trace provider
    const provider = new NodeTracerProvider({
        resource: resources
    });

    // Export via OTLP gRPC
    const exporter = new OTLPTraceExporter({
        url: `${process.env.TRACING_COLLECTOR_HOST}:${process.env.TRACING_COLLECTOR_PORT}`
    });

    // Use simple span (should probably use Batch)
    const processor = new SimpleSpanProcessor(exporter);
    provider.addSpanProcessor(processor);
    provider.register();

    // Create a new header for propagation from a given span
    
    const propagator = new W3CTraceContextPropagator();
    let createPropagationHeader = (span: Span) => {
        let carrier = {};
        // Inject the current trace context into the carrier object
        propagator.inject(
            api.trace.setSpanContext(ROOT_CONTEXT, span.spanContext()),
            carrier,
            defaultTextMapSetter
        );
        return carrier;         
    }

    registerInstrumentations({
        instrumentations: [getNodeAutoInstrumentations()],
    });

    return {
        tracer: api.trace.getTracer(serviceName),
        api: api,
        propagator: createPropagationHeader,   
        statusCode: SpanStatusCode     
    }

}
