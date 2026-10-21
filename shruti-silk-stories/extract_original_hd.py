import cv2
import os

frames_dir = r"C:\Users\kd\.gemini\antigravity\brain\2645eda7-484d-4e69-9863-d74393ef35b9\scratch\original_frames"
assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"
os.makedirs(assets_dir, exist_ok=True)

# Helper to crop laptop screen from 720x1280
# Laptop screen coordinates: y: 350 to 790, x: 45 to 675
def crop_screen(img):
    return img[350:790, 45:675]

# 1. Hero 1: Showroom with text
f3 = cv2.imread(os.path.join(frames_dir, "f_003.jpg"))
if f3 is not None:
    # Full background image without text (from frame 5 where text moved down)
    cv2.imwrite(os.path.join(assets_dir, "drift_hero_showroom.jpg"), crop_screen(f3))

# 2. Hero 2: Zoomed showroom with "Six weavers, one thread"
f5 = cv2.imread(os.path.join(frames_dir, "f_005.jpg"))
if f5 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_hero_weavers.jpg"), crop_screen(f5))

# 3. Hero 3: Seated bride in red saree
f7 = cv2.imread(os.path.join(frames_dir, "f_007.jpg"))
if f7 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_hero_bride.jpg"), crop_screen(f7))

# 4. Six moods strip
f9 = cv2.imread(os.path.join(frames_dir, "f_009.jpg"))
if f9 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_six_moods_screen.jpg"), crop_screen(f9))

# 5. Woven to be remembered curved cards
f11 = cv2.imread(os.path.join(frames_dir, "f_011.jpg"))
if f11 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_woven_screen.jpg"), crop_screen(f11))

# 6. Bridal section
f19 = cv2.imread(os.path.join(frames_dir, "f_019.jpg"))
if f19 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_bridal_screen.jpg"), crop_screen(f19))

# 7. Autumn Winter 2026
f25 = cv2.imread(os.path.join(frames_dir, "f_025.jpg"))
if f25 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_autumn_screen.jpg"), crop_screen(f25))

# 8. Ivory Organza interactive product
f29 = cv2.imread(os.path.join(frames_dir, "f_029.jpg"))
if f29 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_organza_product.jpg"), crop_screen(f29))

# 9. First Light campaign
f35 = cv2.imread(os.path.join(frames_dir, "f_035.jpg"))
if f35 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_first_light.jpg"), crop_screen(f35))

# 10. Latest trends
f39 = cv2.imread(os.path.join(frames_dir, "f_039.jpg"))
if f39 is not None:
    cv2.imwrite(os.path.join(assets_dir, "drift_trends.jpg"), crop_screen(f39))

print("Original high-definition assets extracted!")
