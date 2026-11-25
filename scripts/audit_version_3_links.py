import os
import re

v3_dir = r"VERSION 3.0"
issues = []
files_checked = 0

for root, dirs, files in os.walk(v3_dir):
    for f in files:
        if f.endswith(".html"):
            files_checked += 1
            p = os.path.join(root, f)
            rel_p = os.path.relpath(p, v3_dir)
            with open(p, "r", encoding="utf-8", errors="ignore") as fp:
                content = fp.read()
            
            # Check script src links
            script_srcs = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', content)
            for src in script_srcs:
                if src.startswith("http") or src.startswith("//") or src.startswith("data:"):
                    continue
                clean_src = src.split("?")[0].split("#")[0]
                target_p = os.path.normpath(os.path.join(os.path.dirname(p), clean_src))
                if not os.path.exists(target_p):
                    issues.append(f"{rel_p}: Missing script -> {src} (resolved: {target_p})")
                    
            # Check link href css
            css_hrefs = re.findall(r'<link[^>]+href=["\']([^"\']+\.css[^"\']*)["\']', content)
            for href in css_hrefs:
                if href.startswith("http") or href.startswith("//") or href.startswith("data:"):
                    continue
                clean_href = href.split("?")[0].split("#")[0]
                target_p = os.path.normpath(os.path.join(os.path.dirname(p), clean_href))
                if not os.path.exists(target_p):
                    issues.append(f"{rel_p}: Missing css -> {href} (resolved: {target_p})")
                    
            # Check images
            img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
            for img in img_srcs:
                if img.startswith("http") or img.startswith("//") or img.startswith("data:"):
                    continue
                clean_img = img.split("?")[0].split("#")[0]
                target_p = os.path.normpath(os.path.join(os.path.dirname(p), clean_img))
                if not os.path.exists(target_p):
                    issues.append(f"{rel_p}: Missing img -> {img} (resolved: {target_p})")

print(f"Total HTML files audited: {files_checked}")
print(f"Total asset issues found: {len(issues)}")
for iss in issues:
    print("  ISSUE:", iss)
