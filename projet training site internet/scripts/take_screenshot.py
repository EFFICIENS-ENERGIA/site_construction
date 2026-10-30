import subprocess
import time
import os
import shutil

edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
html_path = os.path.abspath('site_construction/index.html')
dest_dir = r'C:\Users\EFFICIENS ENERGIA\.gemini\antigravity\brain\0eaf1d75-e40e-421b-85e7-018dd775334d'

out_light = os.path.abspath('site_construction_preview.png')
out_dark = os.path.abspath('site_construction_dark_preview.png')

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Capture Thème Clair
print('Capture Claire en cours...')
cmd_light = [
    edge,
    '--headless=new',
    '--disable-gpu',
    '--window-size=1280,3000',
    '--screenshot=' + out_light,
    'file:///' + html_path.replace('\\', '/')
]
subprocess.run(cmd_light)
if os.path.exists(out_light):
    dest_light = os.path.join(dest_dir, 'site_construction_preview.png')
    shutil.copy2(out_light, dest_light)
    print('SCREENSHOT_LIGHT_SUCCESS:', dest_light, os.path.getsize(dest_light), 'octets')

# 2. Capture Thème Sombre
dark_html = html_content.replace('data-theme="light"', 'data-theme="dark"')
dark_path = os.path.abspath('site_construction/index_dark.html')
with open(dark_path, 'w', encoding='utf-8') as f:
    f.write(dark_html)

print('Capture Sombre en cours...')
cmd_dark = [
    edge,
    '--headless=new',
    '--disable-gpu',
    '--window-size=1280,3000',
    '--screenshot=' + out_dark,
    'file:///' + dark_path.replace('\\', '/')
]
subprocess.run(cmd_dark)
if os.path.exists(out_dark):
    dest_dark = os.path.join(dest_dir, 'site_construction_dark_preview.png')
    shutil.copy2(out_dark, dest_dark)
    print('SCREENSHOT_DARK_SUCCESS:', dest_dark, os.path.getsize(dest_dark), 'octets')

if os.path.exists(dark_path):
    try:
        os.remove(dark_path)
    except:
        pass



