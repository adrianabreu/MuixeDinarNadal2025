# 🎩 Barret Màgic Muixeranguer

Aplicació web per a la dinàmica del Dinar de Nadal 2025 de la Muixeranga de Barcelona.

## 📋 Requisits

- Node.js (versió 18 o superior)
- npm

## 🚀 Instal·lació i Execució

### 1. Instal·lar dependències

```bash
npm install
```

### 2. Executar en mode desenvolupament

```bash
npm start
```

L'aplicació s'obrirà automàticament a `http://localhost:4200/`

Si el port 4200 està ocupat, pots especificar un altre:

```bash
npm start -- --port 4201
```

## 🎯 Com utilitzar l'aplicació durant el dinar

### Preparació
1. Connecta l'ordinador portàtil al projector
2. Obre l'aplicació al navegador (`http://localhost:4200`)
3. Posa-la en pantalla completa (F11)

### Dinàmica
1. **Inici**: L'aplicació mostra el primer grup de 4 persones amb només els àlies visibles
2. **Revelar informació**: Fes clic sobre l'àlies de cada persona per revelar:
   - **1r clic**: Mostra la frase del barret
   - **2n clic**: Mostra la categoria (casa) amb color
   - **3r clic**: Torna a l'estat inicial (només àlies)
3. **Navegació**:
   - **Següent**: Avança al següent grup de persones
   - **Anterior**: Torna al grup anterior
   - **Reset**: Torna al primer grup

### Controls
- Usa els botons grans a la part inferior per navegar
- Els botons es desactiven automàticament quan arribes al principi o final
- Pots fer clic a qualsevol targeta en qualsevol moment per revelar la informació

## 🎨 Categories i Colors

- **Muixelovers**: Roig (#FF3F32) - Els que més estimen la muixeranga
- **FOMO de Ferro**: Blau (#19C7E6) - Els que no es perden res
- **Talents emergents**: Verd (#4CAF50) - Els nous talents
- **Comboiet**: Groc (#FFC107) - Els que aporten bon rotllo

## 📊 Dades

Les dades dels membres estan a `public/members.json`. Aquest fitxer es genera automàticament des de l'Excel original.

Per actualitzar les dades:
1. Modifica l'Excel `barret_magic_muixeranga_COMPLET.xlsx`
2. Executa el script de conversió:
   ```bash
   cd ..
   source venv/bin/activate
   python convert_excel.py
   cp members.json barret-magic/public/
   ```

## 🔧 Configuració

### Canviar el nombre de persones per grup

Edita la constant `MEMBERS_PER_GROUP` a `src/app/app.ts`:

```typescript
private readonly MEMBERS_PER_GROUP = 4; // Canvia aquest valor
```

### Modificar colors de les categories

Edita el mètode `getCategoryColor()` a `src/app/member-card.component.ts`

## 📝 Estructura del Projecte

```
barret-magic/
├── src/
│   ├── app/
│   │   ├── app.ts                      # Component principal
│   │   ├── app.html                    # Template principal
│   │   ├── app.css                     # Estils principals
│   │   ├── member-card.component.ts    # Component targeta membre
│   │   ├── member-card.component.html  # Template targeta
│   │   └── member-card.component.css   # Estils targeta
│   ├── main.ts                         # Punt d'entrada
│   └── styles.css                      # Estils globals
├── public/
│   └── members.json                    # Dades dels membres
└── README_MUIXERANGA.md               # Aquest fitxer
```

## 🎉 Bon Dinar de Nadal!

Que la dinàmica sigui un èxit i que passeu una molt bona estona!

---

*Creat amb ❤️ per la Muixeranga de Barcelona*

