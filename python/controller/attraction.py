import request.request as req

def add_attraction(data):
    print(data, flush=True)
    if (not "nom" in data or data["nom"] == ""):
        return False
    
    if (not "description" in data or data["description"] == ""):
        return False

    if (not "difficulte" in data or data["difficulte"] is None):
        return False

    if (not "visible" in data):
        data["visible"] = True

    # Champs optionnels pour les statistiques
    image_url = data.get("image_url", None)
    hauteur = data.get("hauteur", None)
    vitesse = data.get("vitesse", None)
    longueur = data.get("longueur", None)
    duree = data.get("duree", None)
    annee_construction = data.get("annee_construction", None)

    if ("attraction_id" in data and data["attraction_id"]):
      requete = f"UPDATE attraction SET nom='{data['nom']}', description='{data['description']}', difficulte={data['difficulte']}, visible={data['visible']}, image_url=?, hauteur=?, vitesse=?, longueur=?, duree=?, annee_construction=? WHERE attraction_id = {data['attraction_id']}"
      req.insert_in_db(requete, (image_url, hauteur, vitesse, longueur, duree, annee_construction))
      id = data['attraction_id']
    else:
      requete = "INSERT INTO attraction (nom, description, difficulte, visible, image_url, hauteur, vitesse, longueur, duree, annee_construction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
      id = req.insert_in_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"], image_url, hauteur, vitesse, longueur, duree, annee_construction))

    return id

def get_all_attraction(only_visible=False):
    if only_visible:
        json = req.select_from_db("SELECT * FROM attraction WHERE visible = 1")
    else:
        json = req.select_from_db("SELECT * FROM attraction")
    return json

def get_attraction(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_attraction(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))

    return True