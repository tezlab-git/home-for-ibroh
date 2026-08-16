from PIL import Image

img = Image.open('public/bookshelf.png').convert('RGB')
w, h = img.size
print(f'Size: {w}x{h}')

# Sample multiple x positions to understand shelf structure
print('\n=== BRIGHTNESS ANALYSIS ===')
print('Format: y% | x=5% | x=15% | x=30% | x=50% | x=70% | x=85%')
xs = [int(w*p) for p in [0.05, 0.15, 0.30, 0.50, 0.70, 0.85]]

for pct in range(0, 101, 2):
    y = min(int(h * pct / 100), h-1)
    vals = []
    for x in xs:
        r,g,b = img.getpixel((x, y))
        vals.append((r+g+b)//3)
    avg = sum(vals)//len(vals)
    bar = '#' * (avg // 10)
    print(f'y={pct:3d}% | {" | ".join(str(v).rjust(3) for v in vals)} | avg={avg:3d} {bar}')

# Find shelf board positions (bright horizontal bands)
print('\n=== SHELF BOARD DETECTION ===')
# Average brightness across full width at each y
row_brightness = []
for y in range(h):
    total = 0
    samples = 20
    for i in range(samples):
        x = int(w * i / samples)
        r,g,b = img.getpixel((x, y))
        total += (r+g+b)//3
    row_brightness.append(total // samples)

# Find local maxima (shelf boards)
threshold = 120
in_bright = False
bright_start = 0
print('Bright bands (potential shelf boards):')
for y, b in enumerate(row_brightness):
    pct = y * 100 / h
    if b > threshold and not in_bright:
        in_bright = True
        bright_start = pct
    elif b <= threshold and in_bright:
        in_bright = False
        print(f'  y={bright_start:.1f}% to y={pct:.1f}% (center={((bright_start+pct)/2):.1f}%)')

# Analyze color variation horizontally to find book boundaries
print('\n=== HORIZONTAL COLOR VARIATION (book spine detection) ===')
# Check at y=20% (top shelf books), y=55% (middle), y=82% (bottom)
for shelf_y_pct in [15, 20, 25, 55, 60, 82, 85]:
    y = int(h * shelf_y_pct / 100)
    print(f'\nAt y={shelf_y_pct}%:')
    prev_r, prev_g, prev_b = img.getpixel((0, y))
    changes = []
    for x_pct in range(1, 100):
        x = int(w * x_pct / 100)
        r,g,b = img.getpixel((x, y))
        diff = abs(r-prev_r) + abs(g-prev_g) + abs(b-prev_b)
        if diff > 40:
            changes.append(x_pct)
        prev_r, prev_g, prev_b = r, g, b
    print(f'  Color changes at x%: {changes[:30]}')
