from PIL import Image

def extract_image_signals(path):
    signals = []
    img = Image.open(path)
    exif_data = img._getexif()

    if not exif_data:
        signals.append("metadata_missing")

    if img.format == "JPEG":
        signals.append("compression")

    return signals
