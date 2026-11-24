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
    ("BALSONS SAFETY MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS SAFETY MANAGER/frontend/index.html"),

    # Store Manager
    ("BALSONS STORE MANAGER/frontend/assets/js/api-client.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/api-client.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/app.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/tool-data.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/tool-data.js"),
    ("BALSONS STORE MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/assets/js/beds-workspace.js"),
    ("BALSONS STORE MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS STORE MANAGER/frontend/index.html"),

    # HR Manager
    ("BALSONS HR MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/index.html"),
    ("BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS HR MANAGER/frontend/assets/js/beds-workspace.js"),

    # Gate Entry Manager
    ("BALSONS GATE ENTRY MANAGER/frontend/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/index.html"),
    ("BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS GATE ENTRY MANAGER/frontend/assets/js/beds-workspace.js"),

    # Purchase Manager
    ("BALSONS PURCHASE MANAGER/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/index.html"),
    ("BALSONS PURCHASE MANAGER/assets/js/purchase-app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/purchase-app.js"),
    ("BALSONS PURCHASE MANAGER/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS PURCHASE MANAGER/assets/js/beds-workspace.js"),

    # Operations Manager
    ("BALSONS OPERATIONS MANAGER/index.html", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/index.html"),
    ("BALSONS OPERATIONS MANAGER/assets/js/operations-app.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/operations-app.js"),
    ("BALSONS OPERATIONS MANAGER/assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/BALSONS OPERATIONS MANAGER/assets/js/beds-workspace.js"),

    # Central beds-workspace
    ("assets/js/beds-workspace.js", "BALSONS ENTERPRISE LAUNCHER/assets/js/beds-workspace.js"),
    ("assets/js/beds-workspace.js", "docs/assets/js/beds-workspace.js")
]

for src, dst in files_to_mirror:
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        print(f"✓ Mirrored: {src} -> {dst}")
    else:
        print(f"✗ Source not found: {src}")

print("\nEnterprise Launcher mirroring completed successfully!")
