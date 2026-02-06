import request.request as req

def add_critique(data):
    if not all(k in data for k in ("attraction_id", "texte", "note")):
        return False
    nom = data.get("nom", None)
    prenom = data.get("prenom", None)
    anonyme = data.get("anonyme", False)
    requete = """
        INSERT INTO critique (attraction_id, texte, note, nom, prenom, anonyme)
        VALUES (?, ?, ?, ?, ?, ?)
    """
    return req.insert_in_db(requete, (
        data["attraction_id"],
        data["texte"],
        data["note"],
        nom,
        prenom,
        anonyme
    ))

def get_critiques_by_attraction(attraction_id):
    requete = "SELECT * FROM critique WHERE attraction_id = ?"
    return req.select_from_db(requete, (attraction_id,))
