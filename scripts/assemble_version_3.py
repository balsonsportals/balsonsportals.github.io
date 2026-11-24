import os
import shutil

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEST_DIR = os.path.join(WORKSPACE, "VERSION 3.0")

os.makedirs(DEST_DIR, exist_ok=True)

# 1. Root files
ROOT_FILES = [
    "index.html",
    "beds.css",
    "verify.html",
    "uat_signoff_certificate.html",
    "balsons-master-ecosystem-directory.html",
    ".nojekyll",
    "README.md"
]

print("=== Assembling VERSION 3.0 Root Files ===")
for rf in ROOT_FILES:
    src = os.path.join(WORKSPACE, rf)
    if os.path.exists(src):
        dst = os.path.join(DEST_DIR, rf)
        shutil.copy2(src, dst)
        print(f"✓ Copied root file: {rf}")

# 2. Directories to copy
DIRS_TO_COPY = [
    "assets",
    "docs",
    "tests",
    "BALSONS GATE ENTRY MANAGER",
    "BALSONS HR MANAGER",
    "BALSONS SAFETY MANAGER",
    "BALSONS STORE MANAGER",
    "BALSONS PURCHASE MANAGER",
    "BALSONS OPERATIONS MANAGER",
    "BALSONS REPOTS PORTAL"
]

IGNORE_PATTERNS = shutil.ignore_patterns(
    "__pycache__", "*.pyc", "*.pyo", "*.tmp", "*.log", ".git*", "node_modules", "desktop.ini", "Desktop.ini"
)

print("\n=== Assembling VERSION 3.0 Department Portals & Subsystems ===")
for d in DIRS_TO_COPY:
    src_dir = os.path.join(WORKSPACE, d)
    dst_dir = os.path.join(DEST_DIR, d)
    if os.path.exists(src_dir):
        if os.path.exists(dst_dir):
            shutil.rmtree(dst_dir)
        shutil.copytree(src_dir, dst_dir, ignore=IGNORE_PATTERNS)
        print(f"✓ Copied directory tree: {d} -> VERSION 3.0/{d}")

print("\n=== Verifying VERSION 3.0 Assembly Integrity ===")
total_files = 0
total_bytes = 0
for root, _, files in os.walk(DEST_DIR):
    for f in files:
        fp = os.path.join(root, f)
        total_files += 1
        total_bytes += os.path.getsize(fp)

print(f"Total Files in VERSION 3.0: {total_files}")
print(f"Total Size of VERSION 3.0:  {total_bytes / (1024 * 1024):.2f} MB")
print("VERSION 3.0 Assembly Complete!")
