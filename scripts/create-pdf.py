#!/usr/bin/env python3
"""
Create PDF from slide images using ReportLab.
"""

from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import os

SLIDES_DIR = "/home/z/my-project/public/images/slides"
OUTPUT_PATH = "/home/z/my-project/public/downloads/cell-lesson-presentation.pdf"

# Page size matches slide dimensions (1280x720 → 16:9 landscape)
page_width = 13.333 * inch
page_height = 7.5 * inch

c = canvas.Canvas(OUTPUT_PATH, pagesize=(page_width, page_height))

slide_files = [
    "slide-1.png",
    "slide-2.png", 
    "slide-3.png",
    "slide-4.png",
    "slide-5.png",
    "slide-6.png",
]

for slide_file in slide_files:
    slide_path = os.path.join(SLIDES_DIR, slide_file)
    if os.path.exists(slide_path):
        img = ImageReader(slide_path)
        c.drawImage(img, 0, 0, width=page_width, height=page_height)
        c.showPage()
        print(f"Added: {slide_file}")

c.save()
print(f"PDF created: {OUTPUT_PATH}")
