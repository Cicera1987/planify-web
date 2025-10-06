declare module 'next-pwa' {
    import type { NextConfig } from 'next';

    interface WithPWAOptions {
        dest?: string;
        disable?: boolean;
        register?: boolean;
        skipWaiting?: boolean;
        runtimeCaching?: any[];
    }

    function withPWA(nextConfig: NextConfig & { pwa?: WithPWAOptions }): NextConfig;
    export default withPWA;
}
