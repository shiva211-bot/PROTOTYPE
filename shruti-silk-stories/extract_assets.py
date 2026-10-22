import cv2
import os

frames_dir = r"C:\Users\kd\.gemini\antigravity\brain\2645eda7-484d-4e69-9863-d74393ef35b9\scratch\frames"
assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"
os.makedirs(assets_dir, exist_ok=True)

# Let us extract clean assets directly from the video
# 1. Hero Showroom background from frame_002:
f2 = cv2.imread(os.path.join(frames_dir, "frame_002.jpg"))
if f2 is not None:
    # crop screen
    screen_hero = f2[350:785, 45:675]
    cv2.imwrite(os.path.join(assets_dir, "hero_showroom.jpg"), screen_hero)

# 2. Six moods cards from frame_005 / frame_006
f5 = cv2.imread(os.path.join(frames_dir, "frame_005.jpg"))
if f5 is not None:
    # the 6 archs are located between y: 440:540, x: 155 to 610
    arch_strip = f5[435:550, 150:615]
    cv2.imwrite(os.path.join(assets_dir, "six_moods_strip.jpg"), arch_strip)

# 3. Bridal banner from frame_012
f12 = cv2.imread(os.path.join(frames_dir, "frame_012.jpg"))
if f12 is not None:
    bridal_banner = f12[380:610, 60:250]
    cv2.imwrite(os.path.join(assets_dir, "bridal_feature.jpg"), bridal_banner)

# 4. Ivory Organza model from frame_015
f15 = cv2.imread(os.path.join(frames_dir, "frame_015.jpg"))
if f15 is not None:
    ivory_model = f15[365:680, 240:400]
    cv2.imwrite(os.path.join(assets_dir, "ivory_organza_model.jpg"), ivory_model)

print("Video assets extracted!")
