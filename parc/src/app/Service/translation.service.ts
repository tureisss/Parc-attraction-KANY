import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = {
    fr: {
      'welcome': 'Bienvenue sur le site internet du parc d\'attraction',
      'name': 'Nom',
      'description': 'Description',
      'difficulty': 'Difficulté',
      'actions': 'Actions',
      'show': 'Voir',
      'hide': 'Cacher',
      'logout': 'Déconnexion',
      'login': 'Connexion Admin',
      'no_reviews': 'Aucun avis',
      'add_review': 'Ajouter un avis',
      'add_attraction': 'Ajouter une attraction',
      'edit': 'Modifier',
      'delete': 'Supprimer',
      'save': 'Enregistrer',
      'visible': 'Visible'
    },
    en: {
      'welcome': 'Welcome to the theme park website',
      'name': 'Name',
      'description': 'Description',
      'difficulty': 'Difficulty',
      'actions': 'Actions',
      'show': 'Show',
      'hide': 'Hide',
      'logout': 'Logout',
      'login': 'Admin Login',
      'no_reviews': 'No reviews',
      'add_review': 'Add a review',
      'add_attraction': 'Add an attraction',
      'edit': 'Edit',
      'delete': 'Delete',
      'save': 'Save',
      'visible': 'Visible'
    }
  };

  private currentLocale = new BehaviorSubject<string>(this.localeService.getLocale());

  constructor(private localeService: LocaleService) {}

  get(key: string): string {
    const locale = this.currentLocale.value;
    return this.translations[locale as keyof typeof this.translations]?.[key as keyof typeof this.translations.fr] || key;
  }

  getLocale(): Observable<string> {
    return this.currentLocale.asObservable();
  }

  setLocale(locale: string): void {
    this.currentLocale.next(locale);
    this.localeService.setLocale(locale);
  }
}
