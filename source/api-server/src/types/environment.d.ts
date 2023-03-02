export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAMESPACE: string;
      LOGS_TARGET: string;   
      TRACING_COLLECTOR_HOST: string;
      TRACING_COLLECTOR_PORT: number;      
      EOTEL_EXPORTER_OTLP_TRACES_INSECURE: boolean;
      OTEL_RESOURCE_ATTRIBUTES: string;      
    }
  }
}

