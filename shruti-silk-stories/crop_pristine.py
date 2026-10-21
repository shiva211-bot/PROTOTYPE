import cv2
import os

frames_dir = r"C:\Users\kd\.gemini\antigravity\brain\2645eda7-484d-4e69-9863-d74393ef35b9\scratch\original_frames"
assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"

# Clean Bride Seated from f_007
f7 = cv2.imread(os.path.join(frames_dir, "f_007.jpg"))
if f7 is not None:
    bride_seated = f7[355:780, 240:590]
    cv2.imwrite(os.path.join(assets_dir, "clean_bride_seated.jpg"), bride_seated)

# Clean Bridal Portrait from f_019
f19 = cv2.imread(os.path.join(frames_dir, "f_019.jpg"))
if f19 is not None:
    bridal_portrait = f19[385:660, 80:260]
    cv2.imwrite(os.path.join(assets_dir, "clean_bridal_portrait.jpg"), bridal_portrait)

# Clean Ivory & Rose Organza from f_029
f29 = cv2.imread(os.path.join(frames_dir, "f_029.jpg"))
if f29 is not None:
    ivory_girl = f29[365:750, 70:270]
    rose_girl = f29[365:750, 360:540]
    cv2.imwrite(os.path.join(assets_dir, "clean_ivory_organza.jpg"), ivory_girl)
    cv2.imwrite(os.path.join(assets_dir, "clean_rose_organza.jpg"), rose_girl)

# Clean Latest Trends from f_039
f39 = cv2.imread(os.path.join(frames_dir, "f_039.jpg"))
if f39 is not None:
    trends_models = f39[405:680, 290:475]
    cv2.imwrite(os.path.join(assets_dir, "clean_trends_models.jpg"), trends_models)

# Clean Showroom from f_003
f3 = cv2.imread(os.path.join(frames_dir, "f_003.jpg"))
if f3 is not None:
    clean_showroom = f3[355:780, 48:670]
    cv2.imwrite(os.path.join(assets_dir, "clean_showroom.jpg"), clean_showroom)

print("Pristine cutouts saved!")
