#!/bin/sh
# thumb.sh <desk-shot.png> <name>  — crop the plate (right of the rail) to 16:10 and save thumbs/<name>.jpg
set -e
sips -c 680 1088 --cropOffset 110 346 "$1" --out /tmp/_thumb.png >/dev/null
sips -s format jpeg -s formatOptions 80 --resampleWidth 880 /tmp/_thumb.png --out "thumbs/$2.jpg" >/dev/null
rm /tmp/_thumb.png
