import os
from playwright.sync_api import sync_playwright

workspace = r"d:\BALSONS JUPITER PROJECT\OTHER\balsons portals"
v3_dir = os.path.join(workspace, "VERSION 3.0")

pages_to_test = [
    ("Launcher", "index.html"),
    ("Master Directory", "balsons-master-ecosystem-directory.html"),
    ("UAT Certificate", "uat_signoff_certificate.html"),
    ("Universal Verify", "verify.html?empId=EMP-2026-0001"),
    ("Gate Entry Portal", "BALSONS GATE ENTRY MANAGER/frontend/index.html"),
    ("HR Portal", "BALSONS HR MANAGER/frontend/index.html"),
    ("HR Register Wizard", "BALSONS HR MANAGER/frontend/register.html"),
    ("Safety Portal", "BALSONS SAFETY MANAGER/frontend/index.html"),
    ("Store Portal", "BALSONS STORE MANAGER/frontend/index.html"),
    ("Purchase Portal", "BALSONS PURCHASE MANAGER/index.html"),
    ("Operations Portal", "BALSONS OPERATIONS MANAGER/index.html"),
    ("Reports Portal", "BALSONS REPOTS PORTAL/index.html")
]

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    
    for label, rel_url in pages_to_test:
        full_path = os.path.join(v3_dir, rel_url.replace("/", os.sep))
        file_uri = "file:///" + full_path.replace("\\", "/")
        page = browser.new_page()
        
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        page.on("pageerror", lambda exc: console_errors.append(str(exc)))
        
        try:
            page.goto(file_uri, wait_until="networkidle", timeout=15000)
            page.wait_for_timeout(1000)
            title = page.title()
            results.append({
                "label": label,
                "url": rel_url,
                "status": "LOADED",
                "title": title,
                "errors": console_errors
            })
        except Exception as e:
            results.append({
                "label": label,
                "url": rel_url,
                "status": "FAILED",
                "error": str(e),
                "errors": console_errors
            })
        finally:
            page.close()
            
    browser.close()

print("="*60)
print("COMPREHENSIVE BROWSER DIAGNOSTICS AUDIT")
print("="*60)
for r in results:
    err_count = len(r.get("errors", []))
    status = r["status"]
    lbl = r["label"]
    title = r.get("title", "N/A")
    print(f"[{status}] {lbl} | Title: {title} | Console Errors: {err_count}")
    if err_count > 0:
        for err in r["errors"]:
            print(f"    -> ERROR: {err}")
print("="*60)
