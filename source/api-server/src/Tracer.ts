/*
  const api = require("@opentelemetry/api");
  const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
  const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
  const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
  const { envDetector, Resource } = require('@opentelemetry/resources');
  const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
  const { registerInstrumentations } = require('@opentelemetry/instrumentation');
  const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
*/

import api from '@opentelemetry/api';
import { W3CTraceContextPropagator}  from '@opentelemetry/core';
import {envDetector, Resource} from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider } from  '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';


export default class Tracer {

    detected: Resource;
    resources: Resource; 
    provider: NodeTracerProvider;
    exporter: OTLPTraceExporter;
    processor: SimpleSpanProcessor;

    constructor() {

    }

    async init() {
        this.detected = await envDetector.detect();   
 
        this.resources = new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: 'api-server',
        }).merge(this.detected);  
        
        // create a trace provider
        this.provider = new NodeTracerProvider({
            resource: this.resources
        });

        // Export via OTLP gRPC
        this.exporter = new OTLPTraceExporter({
            url: `${process.env.TRACING_COLLECTOR_HOST}:${process.env.TRACING_COLLECTOR_PORT}`
        });

        // Use simple span (should probably use Batch)
        this.processor = new SimpleSpanProcessor(this.exporter);
        this.provider.addSpanProcessor(this.processor);
        this.provider.register();


    }



}