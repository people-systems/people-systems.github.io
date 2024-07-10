#!/bin/bash
# This script should be used to format images for a fresh labeling run.
# This will remove any existing txt files in this folder.

DIRECTORY=$1

# Initialize counter
count=1

# Loop through each image file in the folder
for file in "$DIRECTORY"/*.{png,PNG,svg,SVG,jpg,JPG}; do
    # Check if the file is a regular file
    if [ -f "$file" ]; then
        mv "$file" "$DIRECTORY"/"$count.png"
        # Increment counter
        ((count++))
    fi
done

