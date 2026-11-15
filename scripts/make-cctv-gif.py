from PIL import Image, ImageDraw, ImageEnhance, ImageFont

source = r"C:\Users\akanshu.vishwakarma_\.cursor\projects\c-Users-akanshu-vishwakarma-customer-portal-portfolio-akanshu-portfolio\assets\cctv-ad-plate.jpg"
out = r"public\work\cctv-cinematic.gif"

plate = Image.open(source).convert("RGB")
width, height = 800, 450
font = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 42)
small = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 18)

beats = [
    "LIVE VIEW",
    "RECORDING",
    "SNAPSHOT",
    "REPORTS",
    "SITE MAP",
    "ALERTS",
]
hold = 7
frames = []

for index, label in enumerate(beats):
    for step in range(hold):
        progress = (index * hold + step) / (len(beats) * hold)
        scale = 1.0 + 0.06 * progress
        crop_w = int(plate.width / scale)
        crop_h = int(plate.height / scale)
        left = (plate.width - crop_w) // 2
        top = int((plate.height - crop_h) * 0.42)
        frame = plate.crop((left, top, left + crop_w, top + crop_h)).resize((width, height), Image.Resampling.LANCZOS)
        frame = ImageEnhance.Contrast(frame).enhance(1.08)
        overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        draw.rectangle((0, 0, width, 28), fill=(0, 0, 0, 170))
        draw.rectangle((0, height - 28, width, height), fill=(0, 0, 0, 170))
        for y in range(150):
            shade = int(150 * (y / 150))
            draw.line((0, height - 150 + y, width, height - 150 + y), fill=(8, 7, 6, shade))
        if label == "SNAPSHOT" and step < 2:
            draw.rectangle((0, 0, width, height), fill=(255, 255, 255, 90))
        ink = (255, 212, 138, 255)
        draw.text((48, height - 118), label, font=font, fill=ink)
        draw.rectangle((48, height - 64, 210, height - 60), fill=(232, 163, 58, 255))
        if label == "RECORDING" and step % 2 == 0:
            draw.ellipse((width - 150, 46, width - 132, 64), fill=(220, 48, 48, 255))
        draw.text((width - 124, 44), "REC", font=small, fill=(255, 236, 214, 230))
        composed = Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")
        frames.append(composed)
    palette = frames[0].quantize(colors=32, method=Image.Quantize.MEDIANCUT)
    quantized = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in frames]
    quantized[0].save(
        out,
        save_all=True,
        append_images=quantized[1:],
        duration=160,
        loop=0,
        optimize=True,
    )
print(out, len(frames))
