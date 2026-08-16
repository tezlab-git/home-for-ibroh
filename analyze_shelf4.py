from PIL import Image, ImageDraw
import sys
sys.stdout.reconfigure(encoding='utf-8')

img_orig = Image.open('public/bookshelf.png').convert('RGB')
w, h = img_orig.size

def analyze_row(y_pct, x_start=0, x_end=100):
    y = int(h * y_pct / 100)
    result = []
    for x_pct in range(x_start, x_end+1):
        x = min(int(w * x_pct / 100), w-1)
        r,g,b = img_orig.getpixel((x, y))
        result.append((r+g+b)//3)
    return result

# Top shelf at y=20%
print("Top shelf y=20% brightness (x=0-55%):")
br = analyze_row(20, 0, 55)
for i, b in enumerate(br):
    level = "H" if b > 100 else ("M" if b > 40 else "L")
    print(f"x={i:3d}%: {level} {b:3d}")

print("\nMiddle shelf y=55% brightness (x=0-55%):")
br2 = analyze_row(55, 0, 55)
for i, b in enumerate(br2):
    level = "H" if b > 100 else ("M" if b > 40 else "L")
    print(f"x={i:3d}%: {level} {b:3d}")

print("\nBottom shelf y=75% brightness (x=0-55%):")
br3 = analyze_row(75, 0, 55)
for i, b in enumerate(br3):
    level = "H" if b > 100 else ("M" if b > 40 else "L")
    print(f"x={i:3d}%: {level} {b:3d}")

print("\nRight side y=15-70% at x=55-100%:")
for y_pct in range(5, 85, 5):
    y = int(h * y_pct / 100)
    vals = []
    for x_pct in range(55, 101, 5):
        x = int(w * x_pct / 100)
        r,g,b = img_orig.getpixel((x, y))
        vals.append(f"{x_pct}:{(r+g+b)//3:3d}")
    print(f"y={y_pct:3d}%: {' '.join(vals)}")
