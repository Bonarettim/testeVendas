import { Injectable } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  async getVendas(): Promise<any[]> {
    const db = getDatabase();
    const vendasRef = ref(db, 'venda');
    try {
      const snapshot = await get(vendasRef);
      if (snapshot.exists()) {
        // Converta o objeto em um array
        return Object.values(snapshot.val()); // Isso irá retornar um array dos valores
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao obter produtos: ", error);
      throw error;
    }
  }
}
