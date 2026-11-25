import os
import re
import shutil
from playwright.sync_api import sync_playwright

workspace = r"d:\BALSONS JUPITER PROJECT\OTHER\balsons portals"
v3_cert_html = os.path.join(workspace, "VERSION 3.0", "uat_signoff_certificate.html")
v3_pdf_dir = os.path.join(workspace, "VERSION 3.0", "docs", "certificates")
os.makedirs(v3_pdf_dir, exist_ok=True)
v3_pdf_path = os.path.join(v3_pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.pdf")
v3_png_path = os.path.join(v3_pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.png")

# Also sync to root
root_cert_html = os.path.join(workspace, "uat_signoff_certificate.html")
with open(v3_cert_html, "r", encoding="utf-8") as f_in:
    cert_content = f_in.read()
with open(root_cert_html, "w", encoding="utf-8") as f_out:
    f_out.write(cert_content)

file_uri = "file:///" + v3_cert_html.replace("\\", "/")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    page.goto(file_uri, wait_until="networkidle")
    page.wait_for_timeout(1000)
    
    page.pdf(
        path=v3_pdf_path,
        format="A4",
        print_background=True,
        prefer_css_page_size=True
    )
    
    cert_el = page.query_selector("#uatCertificateA4")
    if cert_el:
        cert_el.screenshot(path=v3_png_path)
    browser.close()

# Copy PDF and PNG to root docs/certificates
root_pdf_dir = os.path.join(workspace, "docs", "certificates")
os.makedirs(root_pdf_dir, exist_ok=True)
shutil.copy2(v3_pdf_path, os.path.join(root_pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.pdf"))
shutil.copy2(v3_png_path, os.path.join(root_pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.png"))

# Copy PNG to artifact directory
artifact_dir = r"C:\Users\Lenovo\.gemini\antigravity\brain\dc3f61c8-f59a-4011-8848-dfd09672ae23"
shutil.copy2(v3_png_path, os.path.join(artifact_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.png"))

# Verify page count
import pypdf
reader = pypdf.PdfReader(v3_pdf_path)
pages = len(reader.pages)
print(f"V3 PDF generated: {v3_pdf_path}")
print(f"Size: {os.path.getsize(v3_pdf_path)} bytes")
print(f"Total Pages count: {pages}")
assert pages == 1, f"Spill detected: pages={pages}!"
print("EXACTLY 1 PAGE VERIFIED WITH ZERO SPILL!")
