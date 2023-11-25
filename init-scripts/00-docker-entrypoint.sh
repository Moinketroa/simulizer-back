#!/bin/bash
set -e

# Download the remote CSV file using wget
wget -O /tmp/airports-raw.csv https://davidmegginson.github.io/ourairports-data/airports.csv

awk 'NR%2==1{gsub(",","|")}1' RS='"' ORS='"' /tmp/airports-raw.csv  > /tmp/airports-formatted.csv

cut -d\| -f2,3,4,5,6,11,14 /tmp/airports-formatted.csv > /tmp/airports-columns.csv

grep 'large_airport' /tmp/airports-columns.csv > /tmp/airports-filtered.csv

# Call the original entrypoint script
exec /usr/local/bin/docker-entrypoint.sh "$@"