#!/usr/bin/env bash
# Exit on error
set -o errexit

# Update package lists and install tesseract-ocr
apt-get update && apt-get install -y tesseract-ocr tesseract-ocr-hin

# Install python dependencies
pip install -r requirements.txt
