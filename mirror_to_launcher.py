# -*- coding: utf-8 -*-
import shutil
import os

files_to_mirror = [
    # Safety Manager
    ("BALSONS SAFETY MANAGER/frontend/assets/js/docx-forms-data.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/docx-forms-data.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/api-client.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/api-client.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/app.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/dossier-360.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/beds-workspace.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/balsons-docs-manager.js"),
    ("BALSONS SAFETY MANAGER/frontend/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/assets/js/qrcode.min.js"),
    ("BALSONS SAFETY MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/index.html"),
    ("BALSONS SAFETY MANAGER/frontend/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/verify.html"),
    ("BALSONS SAFETY MANAGER/apps-script/Code.gs", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/apps-script/Code.gs"),

    # Store Manager
    ("BALSONS STORE MANAGER/frontend/assets/js/api-client.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/api-client.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/app.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/qr-generator.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/qr-generator.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/dossier-360.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/qrcode.min.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/tool-data.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/tool-data.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/beds-workspace.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/balsons-docs-manager.js"),
    ("BALSONS STORE MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/index.html"),
    ("BALSONS STORE MANAGER/frontend/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/verify.html"),
    ("BALSONS STORE MANAGER/apps-script/Code.gs", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/apps-script/Code.gs"),

    # HR Manager
    ("BALSONS HR MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html"),
    ("BALSONS HR MANAGER/frontend/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/verify.html"),
    ("BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js"),
    ("BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/balsons-docs-manager.js"),
    ("BALSONS HR MANAGER/frontend/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/qrcode.min.js"),
    ("BALSONS HR MANAGER/frontend/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/dossier-360.js"),

    # Gate Entry Manager
    ("BALSONS GATE ENTRY MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/index.html"),
    ("BALSONS GATE ENTRY MANAGER/frontend/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/verify.html"),
    ("BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-workspace.js"),
    ("BALSONS GATE ENTRY MANAGER/frontend/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/balsons-docs-manager.js"),
    ("BALSONS GATE ENTRY MANAGER/frontend/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/qrcode.min.js"),
    ("BALSONS GATE ENTRY MANAGER/frontend/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/dossier-360.js"),

    # Purchase Manager
    ("BALSONS PURCHASE MANAGER/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/index.html"),
    ("BALSONS PURCHASE MANAGER/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/verify.html"),
    ("BALSONS PURCHASE MANAGER/assets/js/purchase-app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/purchase-app.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/qrcode.min.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/beds-workspace.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/balsons-docs-manager.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/balsons-sam-auth.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/balsons-sam-auth.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/dossier-360.js"),
    ("BALSONS PURCHASE MANAGER/apps-script/PurchaseService.gs", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/apps-script/PurchaseService.gs"),

    # Operations Manager
    ("BALSONS OPERATIONS MANAGER/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/index.html"),
    ("BALSONS OPERATIONS MANAGER/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/verify.html"),
    ("BALSONS OPERATIONS MANAGER/assets/js/operations-app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/operations-app.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/qrcode.min.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/beds-workspace.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/balsons-docs-manager.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/balsons-sam-auth.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/balsons-sam-auth.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/dossier-360.js"),
    ("BALSONS OPERATIONS MANAGER/apps-script/Code.gs", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/apps-script/Code.gs"),

    # Reports Portal
    ("BALSONS REPOTS PORTAL/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/index.html"),
    ("BALSONS REPOTS PORTAL/verify.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/verify.html"),
    ("BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/balsons-docs-manager.js"),
    ("BALSONS REPOTS PORTAL/assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/qrcode.min.js"),
    ("BALSONS REPOTS PORTAL/assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS REPOTS PORTAL/assets/js/dossier-360.js"),

    # Central Libraries & Maps
    ("assets/js/balsons-docs-manager.js", "BALSONS ENTERPRISE LAUNCHER/assets/js/balsons-docs-manager.js"),
    ("assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/assets/js/beds-workspace.js"),
    ("assets/js/qrcode.min.js", "BALSONS ENTERPRISE LAUNCHER/assets/js/qrcode.min.js"),
    ("assets/js/dossier-360.js", "BALSONS ENTERPRISE LAUNCHER/assets/js/dossier-360.js"),
    ("assets/js/beds-workspace.js", "docs/assets/js/beds-workspace.js"),
    ("docs/specifications/balsons_drive_folder_map.json", "BALSONS ENTERPRISE LAUNCHER/docs/specifications/balsons_drive_folder_map.json"),

    # Verification Portal Root & UAT Certificate
    ("verify.html", "BALSONS ENTERPRISE LAUNCHER/verify.html"),
    ("uat_signoff_certificate.html", "BALSONS ENTERPRISE LAUNCHER/uat_signoff_certificate.html")
]

for src, dst in files_to_mirror:
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        print(f"✓ Mirrored: {src} -> {dst}")
    else:
        print(f"✗ Source not found: {src}")

print("\nEnterprise Launcher mirroring completed successfully!")
