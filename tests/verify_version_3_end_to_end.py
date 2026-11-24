import asyncio
import os
import sys
from playwright.async_api import async_playwright

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
V3_DIR = os.path.join(WORKSPACE, "VERSION 3.0")

PORTALS_V3 = [
    {
        "name": "Gate Entry Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS GATE ENTRY MANAGER", "frontend", "index.html"),
        "tab_trigger": "switchTab('documents')",
        "expected_subfolder": "01_GATE_ENTRY_MANAGER"
    },
    {
        "name": "HR & Payroll Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS HR MANAGER", "frontend", "index.html"),
        "tab_trigger": "switchTab('documents')",
        "expected_subfolder": "02_HR_AND_PAYROLL_MANAGER"
    },
    {
        "name": "Safety & Risk Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS SAFETY MANAGER", "frontend", "index.html"),
        "tab_trigger": "BalsonsSafetyApp.switchView('view-documents')",
        "expected_subfolder": "05_SAFETY_AND_RISK_MANAGER"
    },
    {
        "name": "Store & Tackle Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS STORE MANAGER", "frontend", "index.html"),
        "tab_trigger": "BalsonsStoreApp.switchView('view-documents')",
        "expected_subfolder": "06_STORE_AND_TACKLE_MANAGER"
    },
    {
        "name": "Purchase & Commercial Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS PURCHASE MANAGER", "index.html"),
        "tab_trigger": "BalsonsPurchaseApp.switchTab('docs')",
        "expected_subfolder": "04_PURCHASE_AND_COMMERCIAL_MANAGER"
    },
    {
        "name": "Operations & Rigging Manager V3.0",
        "path": os.path.join(V3_DIR, "BALSONS OPERATIONS MANAGER", "index.html"),
        "tab_trigger": "switchTab('tab-documents', document.getElementById('tab-btn-documents'))",
        "expected_subfolder": "03_OPERATIONS_AND_RIGGING_MANAGER"
    },
    {
        "name": "Central Reports Portal V3.0",
        "path": os.path.join(V3_DIR, "BALSONS REPOTS PORTAL", "index.html"),
        "tab_trigger": None,
        "expected_subfolder": "07_EXECUTIVE_GOVERNANCE_AND_SYNC_HUB"
    }
]

DOMAINS_TO_VERIFY = [
    ("empId", "EMP-2026-0001", "Ramesh Kumar"),
    ("permitId", "PTW-2026-0089", "Work Permit"),
    ("toolId", "BAL-LF-HYJ-001", "Hydraulic"),
    ("rgp", "RGP-2026-0042", "Gate Pass"),
    ("poId", "PO-PURCH-2026-0042", "Purchase Order"),
    ("wpId", "WP-2026-0102", "Schuler")
]

async def run_v3_e2e():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        
        all_passed = True
        
        print("\n=======================================================")
        print("TESTING VERSION 3.0 CENTRAL LAUNCHER & UAT CERTIFICATE")
        print("=======================================================")
        
        # 1. Launcher V3.0
        launcher_page = await context.new_page()
        launcher_url = f"file:///{os.path.join(V3_DIR, 'index.html').replace(os.sep, '/')}"
        await launcher_page.goto(launcher_url, wait_until="load")
        await launcher_page.wait_for_timeout(800)
        
        launcher_title = await launcher_page.evaluate("() => document.title")
        has_v3_badge = await launcher_page.evaluate("() => document.body.innerText.includes('VERSION 3.0') || document.body.innerText.includes('V3.0')")
        print(f"  ✓ Launcher Title: {launcher_title}")
        print(f"  ✓ Version 3.0 Branding: {'PRESENT' if has_v3_badge else 'MISSING'}")
        if not has_v3_badge: all_passed = False
        await launcher_page.close()

        # 2. UAT Certificate V3.0
        uat_page = await context.new_page()
        uat_url = f"file:///{os.path.join(V3_DIR, 'uat_signoff_certificate.html').replace(os.sep, '/')}"
        await uat_page.goto(uat_url, wait_until="load")
        await uat_page.wait_for_timeout(800)
        
        has_qr = await uat_page.evaluate("() => !!document.getElementById('certQrContainer').querySelector('canvas, img')")
        signoff_count = await uat_page.evaluate("() => document.querySelectorAll('.signoff-box').length")
        print(f"  ✓ UAT Certificate QR Matrix: {'PRESENT' if has_qr else 'MISSING'}")
        print(f"  ✓ Directorate Sign-Off Blocks: {signoff_count} of 5")
        if not has_qr or signoff_count < 5: all_passed = False
        await uat_page.close()

        # 3. All 7 Portals
        for portal in PORTALS_V3:
            print(f"\n=======================================================")
            print(f"E2E Testing Portal: {portal['name']}")
            page = await context.new_page()
            
            errors = []
            page.on("console", lambda msg: errors.append(msg.text) if msg.type == 'error' else None)
            
            url = f"file:///{portal['path'].replace(os.sep, '/')}"
            await page.goto(url, wait_until="load")
            await page.wait_for_timeout(1000)
            
            # Bypass login overlay
            await page.evaluate("""() => {
                const w = document.getElementById('beds-portal-login-wrapper');
                if (w) w.style.display = 'none';
                const d = document.getElementById('beds-portal-login-backdrop');
                if (d) d.style.display = 'none';
                if (window.BalsonsPortalLogin) window.BalsonsPortalLogin.isLoggedIn = true;
            }""")
            await page.wait_for_timeout(500)
            
            # Check Print Stage
            has_print_stage = await page.evaluate("() => !!document.getElementById('bedsPrintStage')")
            print(f"  ✓ Universal Print Stage (#bedsPrintStage): {'PRESENT' if has_print_stage else 'MISSING'}")
            if not has_print_stage: all_passed = False
            
            # Check Offline QR Engine
            has_qr_engine = await page.evaluate("() => typeof QRCode !== 'undefined'")
            print(f"  ✓ Offline QR Generator Engine: {'READY' if has_qr_engine else 'MISSING'}")
            if not has_qr_engine: all_passed = False
            
            # Check 360 Dossier
            has_dossier = await page.evaluate("() => typeof Balsons360Dossier !== 'undefined'")
            print(f"  ✓ Balsons360Dossier Hub Object: {'READY' if has_dossier else 'MISSING'}")
            if not has_dossier: all_passed = False

            # Trigger Documents Tab
            if portal['tab_trigger']:
                await page.evaluate(f"() => {{ {portal['tab_trigger']}; }}")
                await page.wait_for_timeout(500)

            # Verify #tab-documents
            docs_content = await page.evaluate("() => document.getElementById('tab-documents') ? document.getElementById('tab-documents').innerHTML : ''")
            has_root = "1p56Z_7_yHC5St8jsoadJnW7DJqJTIjde" in docs_content
            print(f"  ✓ Master Drive Root ID in DOM: {'PRESENT' if has_root else 'MISSING'}")
            if not has_root: all_passed = False

            real_errors = [e for e in errors if not ('Access to fetch' in e or 'ERR_FAILED' in e)]
            print(f"  ✓ Console Diagnostics: {'Clean Console (0 unhandled errors)' if not real_errors else f'ERRORS: {real_errors}'}")
            if real_errors: all_passed = False
            
            await page.close()

        # 4. Universal Verification Engine (verify.html)
        print(f"\n=======================================================")
        print("E2E Testing Universal Digital Verification (VERSION 3.0/verify.html)...")
        verify_html_path = os.path.join(V3_DIR, "verify.html")
        for param, val, expected in DOMAINS_TO_VERIFY:
            page = await context.new_page()
            url = f"file:///{verify_html_path.replace(os.sep, '/')}?{param}={val}"
            await page.goto(url, wait_until="load")
            await page.wait_for_timeout(500)
            
            body_text = await page.evaluate("() => document.body.innerText")
            passed = val.lower() in body_text.lower() and expected.lower() in body_text.lower()
            print(f"  ✓ Domain [{param}={val}] -> {expected}: {'PASSED' if passed else 'FAILED'}")
            if not passed: all_passed = False
            await page.close()

        await browser.close()
        
        print("\n=======================================================")
        if all_passed:
            print("🎉 ALL VERSION 3.0 VERIFICATION CHECKS PASSED 100%!")
        else:
            print("❌ SOME VERSION 3.0 VERIFICATION CHECKS FAILED.")
            sys.exit(1)

if __name__ == "__main__":
    asyncio.run(run_v3_e2e())
