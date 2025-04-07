import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        blog: 'blog.html',
        contact: 'contact.html',
        services: 'services.html',
        accessControl: 'access-control.html',
        cctvInstallation: 'cctv-installation.html',
        burglarAlarm: 'burglar-alarm.html',
        intercomInstallation: 'intercom-installation.html',
        motionSensor: 'motion-sensor.html',
        smartHome: 'smart-home.html',
        waterLeak: 'water-leak.html',
        penetrationTesting: 'penetration-testing.html'
      }
    }
  }
});