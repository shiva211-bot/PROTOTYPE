import cv2
import os

frames_dir = r"C:\Users\kd\.gemini\antigravity\brain\2645eda7-484d-4e69-9863-d74393ef35b9\scratch\frames"
assets_dir = r"C:\Users\kd\.gemini\antigravity\scratch\shruti-silk-stories\assets"

# Frame 5/6 has the six moods arches:
f5 = cv2.imread(os.path.join(frames_dir, "frame_005.jpg"))
if f5 is not None:
    # y: 435 to 525, total width of arches is roughly x: 155 to 615
    # Let's crop each of the 6 arches
    # x approx:
    # 1: 155 to 225
    # 2: 232 to 300
    # 3: 310 to 380
    # 4: 390 to 460
    # 5: 470 to 540
    # 6: 550 to 620
    arch_coords = [
        ("mood_teal.jpg", 155, 228),
        ("mood_mustard.jpg", 232, 305),
        ("mood_orange.jpg", 310, 385),
        ("mood_pink.jpg", 390, 465),
        ("mood_wine.jpg", 470, 542),
        ("mood_emerald.jpg", 548, 620),
    ]
    for name, x1, x2 in arch_coords:
        arch = f5[435:525, x1:x2]
        if arch.size > 0:
            cv2.imwrite(os.path.join(assets_dir, name), arch)

# Frame 8 has the 3D curved carousel cards:
f8 = cv2.imread(os.path.join(frames_dir, "frame_008.jpg"))
if f8 is not None:
    # let's crop the cards across x
    # Card 1 (Temple Silk): x: 110 to 220, y: 485 to 640
    # Card 2 (Katan): x: 225 to 335, y: 480 to 635
    # Card 3 (Banarasi/Patola): x: 345 to 450, y: 480 to 635
    # Card 4 (Festive Red): x: 460 to 565, y: 480 to 635
    # Card 5 (Royal Gold): x: 570 to 670, y: 485 to 640
    carousel_coords = [
        ("carousel_1.jpg", 110, 220, 485, 640),
        ("carousel_2.jpg", 225, 335, 480, 635),
        ("carousel_3.jpg", 345, 450, 480, 635),
        ("carousel_4.jpg", 460, 565, 480, 635),
        ("carousel_5.jpg", 570, 670, 485, 640),
    ]
    for name, x1, x2, y1, y2 in carousel_coords:
        card = f8[y1:y2, x1:x2]
        if card.size > 0:
            cv2.imwrite(os.path.join(assets_dir, name), card)

# Frame 12 has the bridal cards:
f12 = cv2.imread(os.path.join(frames_dir, "frame_012.jpg"))
if f12 is not None:
    bridal_cards = [
        ("bridal_1.jpg", 260, 335, 410, 560),
        ("bridal_2.jpg", 340, 420, 410, 560),
        ("bridal_3.jpg", 430, 510, 410, 560),
        ("bridal_4.jpg", 520, 600, 410, 560),
    ]
    for name, x1, x2, y1, y2 in bridal_cards:
        card = f12[y1:y2, x1:x2]
        if card.size > 0:
            cv2.imwrite(os.path.join(assets_dir, name), card)

# Frame 13 has Autumn Winter 3 arches:
f13 = cv2.imread(os.path.join(frames_dir, "frame_013.jpg"))
if f13 is not None:
    aw_cards = [
        ("aw_arch_1.jpg", 195, 310, 420, 550),
        ("aw_arch_2.jpg", 320, 435, 420, 550),
        ("aw_arch_3.jpg", 445, 545, 420, 550),
    ]
    for name, x1, x2, y1, y2 in aw_cards:
        card = f13[y1:y2, x1:x2]
        if card.size > 0:
            cv2.imwrite(os.path.join(assets_dir, name), card)

# Frame 15 has Ivory Organza thumbnails:
f15 = cv2.imread(os.path.join(frames_dir, "frame_015.jpg"))
if f15 is not None:
    cv2.imwrite(os.path.join(assets_dir, "thumb_1.jpg"), f15[385:445, 95:135])
    cv2.imwrite(os.path.join(assets_dir, "thumb_2.jpg"), f15[460:540, 75:135])

# Frame 20 / 23 First Light / Artisanal Loom:
f23 = cv2.imread(os.path.join(frames_dir, "frame_021.jpg"))
if f23 is not None:
    cv2.imwrite(os.path.join(assets_dir, "artisanal_loom.jpg"), f23[355:620, 45:675])

print("All card assets cropped and saved successfully!")
