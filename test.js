import { chromium, firefox, webkit, devices } from 'playwright';
import { exec } from 'child_process';
import { mainFunctionalityTest } from './tests/mainFunctionalityTest.js';

const iPhone11 = devices['iPhone 11'];

(async () => {
    // Start the local server and wait for it
    const server = exec('npm run dev');
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Define browser types and contexts
    const browsers = [chromium, firefox, webkit];
    const contexts = [
        { name: 'Desktop', options: {} },
        { name: 'Mobile Portrait', options: { ...iPhone11, deviceScaleFactor: 1 } },
        { name: 'Mobile Landscape', options: { ...iPhone11, viewport: { width: iPhone11.viewport.height, height: iPhone11.viewport.width }, deviceScaleFactor: 1 } }
    ];

    for (const browserType of browsers) {
        for (const contextConfig of contexts) {
            // Skip mobile options for Firefox
            if (browserType.name() === 'firefox' && contextConfig.options.isMobile) {
                continue;
            }

            console.log(`Running test on ${browserType.name()} in ${contextConfig.name} mode`);

            // Launch the browser
            const browser = await browserType.launch({ headless: false });
            const context = await browser.newContext(contextConfig.options);
            const page = await context.newPage();

            // Run the main functionality test
            await mainFunctionalityTest(page);

            // Close the browser
            await browser.close();
        }
    }

    // Stop the server
    server.kill();
})();
