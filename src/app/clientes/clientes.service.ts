import { Injectable } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  async getClientes(): Promise<any[]> {
    const db = getDatabase();
    const clientesRef = ref(db, 'client');
    try {
      const snapshot = await get(clientesRef);
      if (snapshot.exists()) {
        // Converta o objeto em um array
        return Object.values(snapshot.val()); // Isso irá retornar um array dos valores
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao obter clientes: ", error);
      throw error;
    }
  }
}
