const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function kyribaAutomation() {
    // Launch browser with download support and video recording
    const browser = await chromium.launch({
        headless: false, // Set to true for production
        slowMo: 100 // Slow down actions for visibility
    });

    const context = await browser.newContext({
        acceptDownloads: true,
        recordVideo: {
            dir: './videos',
            size: { width: 1920, height: 1080 }
        }
    });

    const page = await context.newPage();

    try {
        console.log('Step 1: Getting OTP from otp-gen-1.vercel.app...');

        // Navigate to OTP generator
        await page.goto('https://otp-gen-1.vercel.app', {
            waitUntil: 'networkidle'
        });

        // Click Sign In button
        await page.click('button:has-text("Sign In"), button:has-text("sign in")');

        // Wait for OTP page to load
        await page.waitForTimeout(2000);

        // Wait for a fresh OTP with timer > 45 seconds
        let otpNumber;
        let attempts = 0;
        const maxAttempts = 3; // Try up to 3 times

        while (attempts < maxAttempts) {
            // Extract the timer text (e.g., "Code refreshes in 30 seconds")
            const timerText = await page.locator('text=/Code refreshes in \\d+ seconds?/').textContent();
            const secondsMatch = timerText.match(/(\d+)/);
            const secondsRemaining = secondsMatch ? parseInt(secondsMatch[1]) : 0;

            console.log(`Timer shows ${secondsRemaining} seconds remaining`);

            if (secondsRemaining > 45) {
                // Timer is good, extract the OTP
                otpNumber = await page.locator('body > main > div > div.p-6.pt-0.space-y-6.text-center > div.bg-primary\\/20.rounded-lg.p-6 > p').textContent();
                otpNumber = otpNumber.trim();
                console.log(`✓ OTP Retrieved: ${otpNumber} (${secondsRemaining}s remaining)`);
                break;
            } else {
                console.log(`Waiting for fresh OTP... (current timer: ${secondsRemaining}s)`);
                // Wait for the OTP to refresh (wait slightly longer than remaining time)
                await page.waitForTimeout((secondsRemaining + 5) * 1000);
                attempts++;
            }
        }

        if (!otpNumber) {
            throw new Error('Failed to get a fresh OTP after multiple attempts');
        }

        console.log('Step 2: Logging into Kyriba...');

        // Navigate to Kyriba login
        await page.goto('https://kyriba-frontend.vercel.app/login', {
            waitUntil: 'networkidle'
        });

        // Wait for the customer code input to be visible
        await page.waitForSelector('#customerCode', { timeout: 10000 });

        // Fill in Customer Code with OTP using the ID selector
        await page.fill('#customerCode', otpNumber);
        console.log(`✓ Filled Customer Code: ${otpNumber}`);

        // Click Log In button
        await page.click('button:has-text("Log In"), button[type="submit"]');

        // Wait for navigation to complete
        await page.waitForURL('**/home', { timeout: 10000 });
        console.log('Login successful!');

        console.log('Step 3: Navigating to Cash Position...');

        // Click on Cash Position button
        await page.click('text="Cash Position"');

        // Wait for the Cash Position worksheet to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        console.log('Step 4: Setting date range (March 1 - March 15)...');

        // Click on Start date dropdown using the exact selector
        await page.click('body > div.flex.min-h-screen.w-full.flex-col.bg-background > div > main > main > div > div > div.border-b > div.px-6.pb-4.flex.items-end.gap-4.text-xs > div:nth-child(5) > button');
        console.log('✓ Clicked Start date dropdown');

        // Wait for the calendar popup to appear - look for the table element
        await page.waitForSelector('table tbody tr td button', { timeout: 10000, state: 'visible' });
        await page.waitForTimeout(1000);
        console.log('✓ Calendar visible');

        // Click March 1st - use a more flexible selector
        await page.locator('table tbody tr:nth-child(1) td:nth-child(6) button').click();
        console.log('✓ Selected March 1st');

        await page.waitForTimeout(1500);

        // Click on End date dropdown using the exact selector
        await page.click('body > div.flex.min-h-screen.w-full.flex-col.bg-background > div > main > main > div > div > div.border-b > div.px-6.pb-4.flex.items-end.gap-4.text-xs > div:nth-child(6) > button');
        console.log('✓ Clicked End date dropdown');

        // Wait for the calendar popup to appear again
        await page.waitForSelector('table tbody tr td button', { timeout: 10000, state: 'visible' });
        await page.waitForTimeout(1000);
        console.log('✓ Calendar visible');

        // Click March 15th - use a more flexible selector
        await page.locator('table tbody tr:nth-child(3) td:nth-child(6) button').click();
        console.log('✓ Selected March 15th');

        // Wait for the calendar to close and data to load
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');

        console.log('✓ Date range set: March 1 - March 15, 2024');

        console.log('Step 5: Downloading PDF...');

        // Set up download promise before clicking print
        const downloadPromise = page.waitForEvent('download');

        // Click the print icon using the exact selector
        await page.click('body > div.flex.min-h-screen.w-full.flex-col.bg-background > div > main > main > div > div > div.border-b > div.px-6.py-2.flex.justify-between.items-center > div.flex.items-center.gap-2.text-muted-foreground > svg.lucide.lucide-printer.h-4.w-4.cursor-pointer');

        // Wait for download to complete
        const download = await downloadPromise;

        // Save the file with specific name
        const fileName = 'march_1st_15th_data.pdf';
        const downloadPath = path.join(process.cwd(), fileName);
        await download.saveAs(downloadPath);

        console.log(`✓ PDF downloaded successfully: ${downloadPath}`);

    } catch (error) {
        console.error('Error during automation:', error);

        // Take screenshot on error for debugging
        const screenshotPath = path.join(process.cwd(), `error_${Date.now()}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved: ${screenshotPath}`);

        throw error;
    } finally {
        // Save and close video recording
        await page.close();
        console.log('Video recording saved to ./videos directory');

        // Close browser
        await browser.close();
        console.log('Browser closed.');
    }
}

// Run the automation
kyribaAutomation()
    .then(() => console.log('Automation completed successfully!'))
    .catch(err => console.error('Automation failed:', err));