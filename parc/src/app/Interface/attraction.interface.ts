export interface AttractionInterface {
    attraction_id: number | null,
    nom: string,
    description: string, 
    difficulte: number,
    visible: boolean,
    image_url?: string | null,
    hauteur?: number | null,
    vitesse?: number | null,
    longueur?: number | null,
    duree?: number | null,
    annee_construction?: number | null
}