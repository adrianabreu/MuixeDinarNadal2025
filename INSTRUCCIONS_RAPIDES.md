# 🎩 Barret Màgic Muixeranguer - Instruccions Ràpides

## 📦 Contingut del zip

Aquest zip conté l'aplicació web completa per a la dinàmica del Dinar de Nadal 2025 de la Muixeranga de Barcelona.

## 🚀 Instal·lació i Execució (MOLT FÀCIL!)

### Pas 1: Descomprimir
Descomprimeix el fitxer `barret-magic-muixeranga.zip` en una carpeta del teu ordinador.

### Pas 2: Instal·lar Node.js (si no el tens)
- Ves a https://nodejs.org/
- Descarrega i instal·la la versió LTS (recomanada)
- Reinicia el terminal després d'instal·lar

### Pas 3: Obrir terminal
- **Mac**: Obre Terminal (Cmd + Espai, escriu "Terminal")
- **Windows**: Obre PowerShell o CMD
- **Linux**: Obre la teva terminal preferida

### Pas 4: Navegar a la carpeta del projecte
```bash
cd ruta/on/has/descomprimit/barret-magic
```

### Pas 5: Instal·lar dependències
```bash
npm install
```
Això trigarà uns 2-3 minuts la primera vegada. ☕

### Pas 6: Executar l'aplicació
```bash
npm start
```

L'aplicació s'obrirà automàticament al navegador a http://localhost:4200/

**IMPORTANT**: Si la pàgina es carrega però no veus els membres (diu "Grup 1 de 0"), simplement fes clic al botó "Següent" i tot començarà a funcionar! És només un petit delay de càrrega inicial.

## 🎯 Com utilitzar durant el dinar

1. **Pantalla completa**: Prem F11 al navegador
2. **Connectar projector**: Connecta l'ordinador al projector
3. **Navegar**: Usa els botons grans a la part inferior
4. **Revelar**: Fes clic sobre els noms per revelar la informació

### Flux de revelació per cada persona:
- **1r clic** → Mostra la frase del barret
- **2n clic** → Mostra la categoria (casa) amb color
- **3r clic** → Torna a l'estat inicial

## 📝 Modificar les dades

Si necessites actualitzar les dades dels membres:

### Mètode fàcil (recomanat)
1. Edita l'Excel `barret_magic_muixeranga_COMPLET.xlsx`
2. Obre el terminal a la carpeta `barret-magic`
3. Executa:
   ```bash
   npm run update-data
   ```
4. Refresca el navegador amb **Cmd+Shift+R** (Mac) o **Ctrl+Shift+R** (Win/Linux)

**Important**: El venv Python ja està configurat a `../venv/`. Si no existeix, crea'l primer:
```bash
cd .. # des de barret-magic, puja un nivell
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install openpyxl
cd barret-magic
```

### Format de l'Excel
L'Excel ha de tenir aquestes columnes:
1. **Nom**: Nom complet
2. **Àlies (pinyes)**: Nom curt
3. **Frase del barret**: Text revelació
4. **Context**: Descripció
5. **Categoria**: Muixelovers | FOMO de Ferro | Talents emergents | Comboiet

## ❓ Problemes comuns

### No es veu res quan es carrega
➡️ Fes clic al botó "Següent", les dades estan allà!

### Error "npm: command not found"
➡️ Has d'instal·lar Node.js (veure Pas 2)

### Port 4200 ocupat
➡️ Executa amb un altre port: `npm start -- --port 4201`

### No es veuen les dades actualitzades
➡️ Refresca la pàgina amb Ctrl+F5 (o Cmd+Shift+R al Mac)

## 📞 Contacte

Qualsevol dubte o problema, contacta amb Llorenç de la Muixeranga de Barcelona.

---

## 📋 Dades del projecte

- **72 membres** organitzats en **18 grups** de 4 persones
- **4 categories**: Muixelovers, FOMO de Ferro, Talents emergents, Comboiet
- Cada categoria té el seu color distintiu

## 🎉 Bon Dinar de Nadal 2025!

Que la dinàmica sigui un èxit i que passeu una molt bona estona!

*Visca la Muixeranga de Barcelona! 🎊*


