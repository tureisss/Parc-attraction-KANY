#!/bin/sh
set -e

# Wait for MariaDB to be ready
echo "Waiting for MariaDB to be ready..."
until nc -z -w 2 database 3306; do
	echo "MariaDB is unavailable - sleeping"
	sleep 2
done
echo "MariaDB is up!"

python3 init.py

python3 -m flask --debug run --host=0.0.0.0
