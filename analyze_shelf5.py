from PIL import Image, ImageDraw
import sys
sys.stdout.reconfigure(encoding='utf-8')

img = Image.open('public/bookshelf.png').convert('RGBA')
w, h = img.size

# Create overlay
overlay = Image.new('RGBA', (w, h), (0,0,0,0))
draw = ImageDraw.Draw(overlay)

def rect(x1p, y1p, x2p, y2p, color):
    x1 = int(w * x1p / 100)
    y1 = int(h * y1p / 100)
    x2 = int(w * x2p / 100)
    y2 = int(h * y2p / 100)
    draw.rectangle([x1, y1, x2, y2], outline=color, width=3)
    draw.rectangle([x1+1, y1+1, x2-1, y2-1], fill=(*color[:3], 60))

# Based on brightness analysis:
# TOP SHELF y=4-42%
# x=0-7%: wall (skip)
# Book groups identified from brightness patterns:

# Top shelf books (RED)
top_books = [
    (7, 4, 11, 42),    # book 1
    (11, 4, 17, 42),   # book 2
    (19, 4, 25, 42),   # book 3 (wide)
    (25, 4, 29, 42),   # book 4
    (29, 4, 34, 42),   # book 5
    (34, 4, 38, 42),   # book 6
    (38, 4, 43, 42),   # book 7
    (43, 4, 48, 42),   # book 8
    (48, 4, 55, 42),   # book 9
]
for b in top_books:
    rect(*b, (255, 80, 80, 255))

# Middle shelf books (GREEN) y=44-65%
mid_books = [
    (1, 44, 8, 65),    # book 1
    (11, 44, 18, 65),  # book 2
    (19, 44, 27, 65),  # book 3
    (27, 44, 33, 65),  # book 4 (dark)
    (40, 44, 47, 65),  # book 5
    (55, 44, 65, 65),  # book 6 (right side)
]
for b in mid_books:
    rect(*b, (80, 255, 80, 255))

# Bottom shelf books (BLUE) y=68-82%
bot_books = [
    (2, 68, 8, 82),    # book 1
    (14, 68, 22, 82),  # book 2
    (40, 68, 51, 82),  # book 3
]
for b in bot_books:
    rect(*b, (80, 80, 255, 255))

# Right side objects (YELLOW) - globe/camera/plant area
right_objects = [
    (55, 5, 70, 42),   # right top area
    (65, 44, 80, 65),  # right middle
    (55, 68, 75, 82),  # right bottom
]
for b in right_objects:
    rect(*b, (255, 255, 0, 255))

result = Image.alpha_composite(img, overlay)
result.convert('RGB').save('public/bookshelf_debug2.png')
print("Saved bookshelf_debug2.png")
print("RED=top books, GREEN=mid books, BLUE=bot books, YELLOW=right objects")
