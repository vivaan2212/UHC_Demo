const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function kyribaVatTaxesAutomation() {
    const browser = await chromium.launch({
        headless: false,
        slowMo: 100
    });

    // First context for login (separate video)
    const loginContext = await browser.newContext({
        recordVideo: {
            dir: './videos/login',
            size: { width: 1920, height: 1080 }
        }
    });

    const loginPage = await loginContext.newPage();

    try {
        console.log('=== PHASE 1: LOGIN ===');
        console.log('Step 1: Getting OTP from otp-gen-1.vercel.app...');

        // Navigate to OTP generator
        await loginPage.goto('https://otp-gen-1.vercel.app', {
            waitUntil: 'networkidle'
        });

        // Click Sign In button
        await loginPage.click('button:has-text("Sign In"), button:has-text("sign in")');
        await loginPage.waitForTimeout(2000);

        // Wait for a fresh OTP with timer > 45 seconds
        let otpNumber;
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            const timerText = await loginPage.locator('text=/Code refreshes in \\d+ seconds?/').textContent();
            const secondsMatch = timerText.match(/(\d+)/);
            const secondsRemaining = secondsMatch ? parseInt(secondsMatch[1]) : 0;

            console.log(`Timer shows ${secondsRemaining} seconds remaining`);

            if (secondsRemaining > 45) {
                otpNumber = await loginPage.locator('body > main > div > div.p-6.pt-0.space-y-6.text-center > div.bg-primary\\/20.rounded-lg.p-6 > p').textContent();
                otpNumber = otpNumber.trim();
                console.log(`✓ OTP Retrieved: ${otpNumber} (${secondsRemaining}s remaining)`);
                break;
            } else {
                console.log(`Waiting for fresh OTP... (current timer: ${secondsRemaining}s)`);
                await loginPage.waitForTimeout((secondsRemaining + 5) * 1000);
                attempts++;
            }
        }

        if (!otpNumber) {
            throw new Error('Failed to get a fresh OTP after multiple attempts');
        }

        console.log('Step 2: Logging into Kyriba...');

        // Navigate to Kyriba login
        await loginPage.goto('https://kyriba-frontend.vercel.app/login', {
            waitUntil: 'networkidle'
        });

        // Wait for the customer code input to be visible
        await loginPage.waitForSelector('#customerCode', { timeout: 10000 });

        // Fill in Customer Code with OTP
        await loginPage.fill('#customerCode', otpNumber);
        console.log(`✓ Filled Customer Code: ${otpNumber}`);

        // Click Log In button
        await loginPage.click('button:has-text("Log In"), button[type="submit"]');

        // Wait for navigation to complete
        await loginPage.waitForURL('**/home', { timeout: 10000 });
        console.log('✓ Login successful!');

        // Close login video context
        await loginPage.close();
        await loginContext.close();
        console.log('✓ Login video saved to ./videos/login directory');

        // Create new context for post-login actions (separate video)
        const workContext = await browser.newContext({
            recordVideo: {
                dir: './videos/work',
                size: { width: 1920, height: 1080 }
            }
        });

        const page = await workContext.newPage();

        // Navigate to home page (reuse session)
        await page.goto('https://kyriba-frontend.vercel.app/home', {
            waitUntil: 'networkidle'
        });

        console.log('\n=== PHASE 2: DATA ENTRY ===');
        console.log('Step 3: Navigating to Active Forecast...');

        // Click on Active Forecast button
        await page.click('text="Active Forecast"');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        console.log('✓ Opened Active Forecast');

        console.log('Step 4: Updating VAT Collected values...');

        // VAT Collected values
        const vatValues = [
            '133539', '181559', '154037', '18592', '77800',
            '248214', '169246', '45233', '187976', '110000',
            '55000', '0', '-110000'
        ];

        // Find the VAT Collected row dynamically
        const vatRow = page.locator('td:has-text("VAT Collected")').locator('xpath=ancestor::tr').first();

        // Get all editable cells in that row
        const vatCells = await vatRow.locator('td').all();

        // Start from index 2 (column 3, since index 0 is column 1)
        for (let i = 0; i < vatValues.length; i++) {
            const cellIndex = i + 2; // Offset for column 3
            if (cellIndex < vatCells.length) {
                await vatCells[cellIndex].click();
                await page.waitForTimeout(400);

                // Backspace 8 times to clear
                for (let j = 0; j < 8; j++) {
                    await page.keyboard.press('Backspace');
                    await page.waitForTimeout(50);
                }

                // Type new value
                await page.keyboard.type(vatValues[i]);
                await page.keyboard.press('Enter');
                await page.waitForTimeout(300);

                console.log(`✓ Updated VAT Collected cell ${i + 1}: ${vatValues[i]}`);
            }
        }

        console.log('Step 5: Clicking Apply for VAT Collected...');

        // Click Apply button - find it near VAT Collected row
        await vatRow.locator('button:has-text("Apply")').first().click();
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        console.log('✓ Applied VAT Collected changes');

        console.log('Step 6: Updating Taxes values...');

        // Taxes values
        const taxesValues = [
            '-708511', '-686209', '-229196', '-171618', '-928099',
            '-946970', '-594458', '-688397', '-598091', '-440000',
            '-440000', '-440000', '-440000'
        ];

        // Find the Taxes row dynamically
        const taxesRow = page.locator('td:has-text("Taxes")').locator('xpath=ancestor::tr').first();

        // Get all cells in that row
        const taxesCells = await taxesRow.locator('td').all();

        // Start from index 2 (column 3, since index 0 is column 1)
        for (let i = 0; i < taxesValues.length; i++) {
            const cellIndex = i + 2; // Offset for column 3
            if (cellIndex < taxesCells.length) {
                await taxesCells[cellIndex].click();
                await page.waitForTimeout(400);

                // Backspace 8 times to clear
                for (let j = 0; j < 8; j++) {
                    await page.keyboard.press('Backspace');
                    await page.waitForTimeout(50);
                }

                // Type new value
                await page.keyboard.type(taxesValues[i]);
                await page.keyboard.press('Enter');
                await page.waitForTimeout(300);

                console.log(`✓ Updated Taxes cell ${i + 1}: ${taxesValues[i]}`);
            }
        }

        console.log('Step 7: Clicking Apply for Taxes...');

        // Click Apply button for Taxes row
        await taxesRow.locator('button:has-text("Apply")').first().click();
        await page.waitForTimeout(2000);
        await page.waitForLoadState('networkidle');
        console.log('✓ Applied Taxes changes');

        console.log('✓ All data entry completed successfully!');

        // Wait a bit before closing to capture final state
        await page.waitForTimeout(2000);

        // Close work video context
        await page.close();
        await workContext.close();
        console.log('✓ Work video saved to ./videos/work directory');

    } catch (error) {
        console.error('Error during automation:', error);

        // Take screenshot on error
        const screenshotPath = path.join(process.cwd(), `error_vat_taxes_${Date.now()}.png`);
        try {
            await loginPage.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
        } catch (e) {
            console.log('Could not take screenshot');
        }

        throw error;
    } finally {
        await browser.close();
        console.log('Browser closed.');
    }
}

// Run the automation
kyribaVatTaxesAutomation()
    .then(() => console.log('\n🎉 Automation completed successfully!'))
    .catch(err => console.error('\n❌ Automation failed:', err));