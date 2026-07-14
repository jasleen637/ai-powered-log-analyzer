import io

from PIL import Image, ImageOps
import pytesseract


def extract_text(image_bytes: bytes) -> str:
    """
    Extract text from an uploaded image using Tesseract OCR.
    """

    try:
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_bytes))

        # Convert to grayscale (improves OCR)
        image = ImageOps.grayscale(image)

        # OCR Configuration
        custom_config = r'--oem 3 --psm 6'

        extracted_text = pytesseract.image_to_string(
            image,
            config=custom_config
        )

        return extracted_text.strip()

    except Exception as e:
        print(f"OCR Error: {e}")
        return ""