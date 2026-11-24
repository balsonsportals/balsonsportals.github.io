import os
from playwright.sync_api import sync_playwright

workspace = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
cert_html_path = os.path.join(workspace, "uat_signoff_certificate.html")
pdf_dir = os.path.join(workspace, "docs", "certificates")
os.makedirs(pdf_dir, exist_ok=True)
pdf_output_path = os.path.join(pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.pdf")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    page.goto(f"file:///{cert_html_path.replace(os.sep, '/')}", wait_until="networkidle")
    page.wait_for_timeout(1000)
    
    # Export single-sheet A4 PDF
    page.pdf(
        path=pdf_output_path,
        format="A4",
        print_background=True,
        prefer_css_page_size=True
    )
    
    # Capture crisp screenshot preview
    png_output_path = os.path.join(pdf_dir, "BALSONS_ENTERPRISE_UAT_SIGNOFF_CERTIFICATE_LOCKED.png")
    cert_el = page.query_selector("#uatCertificateA4")
    if cert_el:
        cert_el.screenshot(path=png_output_path)
        print(f"Captured screenshot preview: {png_output_path} ({os.path.getsize(png_output_path)} bytes)")
        
    browser.close()

print(f"Successfully generated PDF certificate: {pdf_output_path}")
print(f"PDF file size: {os.path.getsize(pdf_output_path)} bytes")
