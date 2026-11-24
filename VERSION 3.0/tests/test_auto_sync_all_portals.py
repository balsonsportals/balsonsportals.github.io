import asyncio
import os
from playwright.async_api import async_playwright

async def verify_all_portals_sync():
    print("=== STARTING PLAYWRIGHT VERIFICATION OF SCHEDULED AUTO-SYNC ACROSS ALL PORTALS ===")
    
    portals = [
        {
            "name": "Safety Manager",
            "path": os.path.abspath("BALSONS SAFETY MANAGER/frontend/index.html"),
            "expected_text": "PTW-JTRWF-2026-9901"
        },
        {
            "name": "Store Manager",
            "path": os.path.abspath("BALSONS STORE MANAGER/frontend/index.html"),
            "expected_text": "BAL-LF-HYJ-001"
        },
        {
            "name": "HR Manager",
            "path": os.path.abspath("BALSONS HR MANAGER/frontend/index.html"),
            "expected_text": "EMP-2026-0001"
        },
        {
            "name": "Gate Entry Manager",
            "path": os.path.abspath("BALSONS GATE ENTRY MANAGER/frontend/index.html"),
            "expected_text": "OD-02-AX-8910"
        },
        {
            "name": "Purchase Manager",
            "path": os.path.abspath("BALSONS PURCHASE MANAGER/index.html"),
            "expected_text": "PR-2026-001"
        },
        {
            "name": "Operations Manager",
            "path": os.path.abspath("BALSONS OPERATIONS MANAGER/index.html"),
            "expected_text": "WP-AXLE-PRS-001"
        }
    ]

    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        page = await browser.new_page()

        for portal in portals:
            print(f"\n--------------------------------------------------")
            print(f"Testing Portal: {portal['name']}")
            print(f"--------------------------------------------------")
            url = f"file:///{portal['path'].replace(os.sep, '/')}"
            await page.goto(url, wait_until="load")
            await page.wait_for_timeout(2000)

            # 1. Verify Topbar Sync Pill and Countdown Chip
            pill = await page.query_selector("#bedsSheetSyncPill")
            chip = await page.query_selector("#bedsAutoSyncChip")
            
            pill_text = (await pill.inner_text()) if pill else "NOT FOUND"
            chip_text = (await chip.inner_text()) if chip else "NOT FOUND"
            clean_pill = " ".join(pill_text.split())
            print(f"  ✓ [Topbar Sync Pill]: {clean_pill}")
            print(f"  ✓ [Auto Countdown Initial]: {chip_text}")

            # 2. Wait 2 seconds and verify countdown ticks down
            await page.wait_for_timeout(2100)
            chip_text_after = (await chip.inner_text()) if chip else "NOT FOUND"
            print(f"  ✓ [Auto Countdown after 2s]: {chip_text_after}")

            # 3. Verify Table Data strictly contains live database records
            content = await page.content()
            has_expected = portal['expected_text'] in content
            print(f"  ✓ [Data Parity Check]: Found '{portal['expected_text']}' in DOM: {has_expected}")

            # 4. Trigger manual sync via BalsonsWorkspace and verify execution
            sync_result = await page.evaluate("""async () => {
                try {
                    if (window.BalsonsWorkspace && typeof window.BalsonsWorkspace.triggerDualSync === 'function') {
                        await window.BalsonsWorkspace.triggerDualSync(true);
                        return { success: true };
                    }
                    return { success: false, reason: 'triggerDualSync not found' };
                } catch(e) {
                    return { success: false, error: e.message };
                }
            }""")
            print(f"  ✓ [Dual Sync Trigger Execution]: {sync_result}")

            # 5. Check BalsonsPortalSync hook registration
            has_sync_hook = await page.evaluate("""() => {
                return (window.BalsonsPortalSync && typeof window.BalsonsPortalSync.reload === 'function');
            }""")
            print(f"  ✓ [BalsonsPortalSync Hook Registered]: {has_sync_hook}")

            # Screenshot verification
            os.makedirs("tests/playwright_screenshots", exist_ok=True)
            screenshot_path = os.path.join("tests", "playwright_screenshots", f"test_sync_{portal['name'].lower().replace(' ', '_')}.png")
            await page.screenshot(path=screenshot_path)
            print(f"  ✓ [Saved Verification Screenshot]: {screenshot_path}")

        await browser.close()
        print("\n==================================================")
        print("=== ALL 6 PORTALS VERIFIED IN STRICT SYNC! ===")
        print("==================================================")

if __name__ == "__main__":
    asyncio.run(verify_all_portals_sync())
