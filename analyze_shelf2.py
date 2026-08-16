from PIL import Image

img = Image.open('public/bookshelf.png').convert('RGB')
w, h = img.size

def get_pixel_brightness(x_pct, y_pct):
    x = min(int(w * x_pct / 100), w-1)
    y = min(int(h * y_pct / 100), h-1)
    r,g,b = img.getpixel((x, y))
    return (r+g+b)//3, r, g, b

# Analyze specific rows more carefully
# From brightness analysis:
# y=0-3%: bright (top/ceiling area)
# y=4-42%: dark (books area - top shelf)
# y=42-44%: transition
# y=44-65%: books area (middle shelf)
# y=66-68%: dark gap
# y=68-82%: books area (bottom shelf)
# y=82-100%: floor/base

print("=== DETAILED SHELF ROW ANALYSIS ===")

# Find exact shelf board positions by looking for bright horizontal bands
print("\nRow brightness (full width average):")
shelf_boards = []
for y_pct in range(0, 101, 1):
    y = min(int(h * y_pct / 100), h-1)
    total = 0
    n = 40
    for i in range(n):
        x = int(w * (i+1) / (n+1))
        r,g,b = img.getpixel((x, y))
        total += (r+g+b)//3
    avg = total // n
    if avg > 150:
        shelf_boards.append(y_pct)
        print(f"  y={y_pct}%: {avg} *** BRIGHT (shelf board?)")

print(f"\nBright rows: {shelf_boards}")

# Now find book boundaries at key y positions
# Top shelf books: y around 10-40%
# Middle shelf books: y around 46-64%  
# Bottom shelf books: y around 68-80%

print("\n=== BOOK BOUNDARY DETECTION ===")

def find_boundaries(y_pct, label):
    y = int(h * y_pct / 100)
    print(f"\n{label} (y={y_pct}%):")
    
    # Get color at each x%
    colors = []
    for x_pct in range(0, 101):
        x = min(int(w * x_pct / 100), w-1)
        r,g,b = img.getpixel((x, y))
        colors.append((r,g,b))
    
    # Find significant color changes
    boundaries = [0]
    for i in range(1, len(colors)):
        r1,g1,b1 = colors[i-1]
        r2,g2,b2 = colors[i]
        diff = abs(r1-r2) + abs(g1-g2) + abs(b1-b2)
        if diff > 35:
            boundaries.append(i)
    
    # Merge close boundaries
    merged = [boundaries[0]]
    for b in boundaries[1:]:
        if b - merged[-1] >= 2:
            merged.append(b)
    
    print(f"  Boundaries at x%: {merged}")
    
    # Show color at each boundary
    for bx in merged[:20]:
        r,g,b = colors[bx]
        brightness = (r+g+b)//3
        print(f"    x={bx}%: rgb({r},{g},{b}) brightness={brightness}")
    
    return merged

# Top shelf - sample at multiple y positions
find_boundaries(10, "Top shelf - y=10%")
find_boundaries(18, "Top shelf - y=18%")
find_boundaries(30, "Top shelf - y=30%")

# Middle shelf
find_boundaries(50, "Middle shelf - y=50%")
find_boundaries(57, "Middle shelf - y=57%")

# Bottom shelf
find_boundaries(72, "Bottom shelf - y=72%")
find_boundaries(76, "Bottom shelf - y=76%")

# Right side - check for globe, camera, plant
print("\n=== RIGHT SIDE OBJECTS ===")
print("Checking x=55-100% for non-book objects:")
for y_pct in [10, 20, 30, 40, 50, 60, 70, 80]:
    y = int(h * y_pct / 100)
    row = []
    for x_pct in range(55, 101, 2):
        x = int(w * x_pct / 100)
        r,g,b = img.getpixel((x, y))
        br = (r+g+b)//3
        row.append(f"{x_pct}:{br}")
    print(f"  y={y_pct}%: {' | '.join(row[:15])}")
