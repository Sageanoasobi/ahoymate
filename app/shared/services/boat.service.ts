import { Observable } from '@nativescript/core';
import { IBoat } from '../models/boat.interface';
import { StorageService } from './storage.service';

const BOAT_STORAGE_KEY = 'user_boat';

export class BoatService extends Observable {
  private _currentBoat: IBoat | null = null;

  constructor() {
    super();
    this.loadBoat();
  }

  private loadBoat(): void {
    this._currentBoat = StorageService.getItem<IBoat>(BOAT_STORAGE_KEY);
  }

  saveBoatDetails(boat: IBoat): void {
    this._currentBoat = boat;
    StorageService.setItem(BOAT_STORAGE_KEY, boat);
    this.notifyPropertyChange('currentBoat', boat);
  }

  getCurrentBoat(): IBoat | null {
    return this._currentBoat;
  }
}