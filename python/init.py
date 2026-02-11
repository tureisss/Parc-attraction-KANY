import mariadb
import sys
import re
import time

def wait_for_db(max_retries=30, delay=2):
    for i in range(max_retries):
        try:
            conn = mariadb.connect(
                user="mysqlusr",
                password="mysqlpwd",
                host="database",
                port=3306,
                database="parc"
            )
            conn.close()
            print("Connexion à la base OK.", flush=True)
            return True
        except mariadb.Error as e:
            print(f"Attente de la base... ({i+1}/{max_retries}) : {e}", flush=True)
            time.sleep(delay)
    print("Impossible de se connecter à la base après plusieurs tentatives.", flush=True)
    return False

if not wait_for_db():
    sys.exit(1)

try:
    conn = mariadb.connect(
        user="mysqlusr",
        password="mysqlpwd",
        host="database",
        port=3306,
        database="parc"
    )
    cur = conn.cursor()
    print("Initialisation SQL : début", flush=True)

    with open('sql_file/init.sql') as f:
        fichier = f.read()
        lines = fichier.split(";")
        for index, line in enumerate(lines):
            line = line.replace("\n", "")
            line = re.sub("\s+", " ", line)
            if (line.strip() != ""):
                try:
                    cur.execute(line)
                    print(f"[init.sql] OK: {line}", flush=True)
                except Exception as e:
                    print(f"[init.sql] ERREUR: {line} => {e}", flush=True)

    with open('sql_file/create.sql') as f:
        fichier = f.read()
        lines = fichier.split(";")
        for index, line in enumerate(lines):
            line = line.replace("\n", "")
            line = re.sub("\s+", " ", line)
            if (line.strip() != ""):
                try:
                    cur.execute(line)
                    print(f"[create.sql] OK: {line}", flush=True)
                except Exception as e:
                    print(f"[create.sql] ERREUR: {line} => {e}", flush=True)
    conn.commit()
    conn.close()
    print("Initialisation SQL : terminé", flush=True)

except mariadb.Error as e:
    print(f"Erreur lors de la connection à la base de données: {e}", flush=True)
    sys.exit(1)