from PIL import Image, ImageDraw, ImageFont
import json

img = Image.open('public/bookshelf.png').convert('RGB')
w, h = img.size
draw = ImageDraw.Draw(img)

# Based on analysis:
# Top shelf books: y=4% to y=42% (books area)
# Shelf board 1: y=42-44%
# Middle shelf books: y=44% to y=65%
# Shelf board 2: y=65-68%
# Bottom shelf books: y=68% to y=82%
# Floor: y=82%+

# From boundary analysis, let me map out book positions
# Top shelf (y=4-42%): boundaries at x% from y=18% scan:
# 0, 2, 4, 7, 9, 11, 13, 15, 17, 19, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 43, 45, 48, 51, 53, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 89, 91

# Let me draw grid lines to understand structure
# Horizontal lines at key y positions
for y_pct in [0, 4, 42, 44, 65, 68, 82, 100]:
    y = int(h * y_pct / 100)
    draw.line([(0, y), (w, y)], fill=(255, 255, 0), width=3)
    draw.text((5, y+2), f"y={y_pct}%", fill=(255,255,0))

# Vertical lines at key x positions from top shelf analysis
top_shelf_x = [0, 2, 4, 7, 9, 11, 13, 15, 17, 19, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 43, 45, 48, 51, 53, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 89, 91, 100]
for x_pct in top_shelf_x:
    x = int(w * x_pct / 100)
    draw.line([(x, int(h*0.04)), (x, int(h*0.42))], fill=(255, 100, 100), width=1)

# Middle shelf vertical lines
mid_shelf_x = [0, 2, 4, 7, 10, 12, 15, 17, 19, 21, 23, 25, 27, 29, 37, 49, 51, 53, 57, 59, 61, 63, 65, 77, 79, 81, 83, 85, 87, 90, 100]
for x_pct in mid_shelf_x:
    x = int(w * x_pct / 100)
    draw.line([(x, int(h*0.44)), (x, int(h*0.65))], fill=(100, 255, 100), width=1)

# Bottom shelf
bot_shelf_x = [0, 2, 5, 7, 12, 17, 22, 24, 29, 41, 47, 49, 55, 58, 61, 63, 65, 67, 69, 73, 76, 79, 83, 86, 89, 91, 100]
for x_pct in bot_shelf_x:
    x = int(w * x_pct / 100)
    draw.line([(x, int(h*0.68)), (x, int(h*0.82))], fill=(100, 100, 255), width=1)

img.save('public/bookshelf_annotated.png')
print("Saved bookshelf_annotated.png")
print(f"Image size: {w}x{h}")

# Now let's identify book groups more carefully
# Looking at top shelf y=18% boundaries:
# x=0-7%: bright area (wall/frame left)
# x=7-9%: dark (book spine gap)
# x=9-11%: book
# x=11-13%: book  
# x=13-15%: book
# x=15-17%: dark gap
# x=17-19%: book
# x=19-22%: bright (wide book or gap)
# etc.

# Let me do a cleaner analysis - find book groups
print("\n=== CLEAN BOOK GROUP ANALYSIS ===")

def analyze_row(y_pct, x_start=0, x_end=100, threshold=30):
    y = int(h * y_pct / 100)
    
    # Get brightness at each x%
    brightnesses = []
    for x_pct in range(x_start, x_end+1):
        x = min(int(w * x_pct / 100), w-1)
        r,g,b = img.getpixel((x, y))
        brightnesses.append((r+g+b)//3)
    
    return brightnesses

# Analyze top shelf at y=20% (middle of books)
print("\nTop shelf brightness at y=20% (x=0-55%):")
br = analyze_row(20, 0, 55)
for i, b in enumerate(br):
    bar = '█' if b > 80 else ('▓' if b > 40 else '░')
    print(f"x={i}%: {bar} {b}")
