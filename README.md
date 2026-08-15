# 🌌 Nuestro Universo — Para Michelle ❤️

Una experiencia web interactiva, romántica y personalizada para el cumpleaños de Michelle.

## 📁 Estructura

```
nuestro-universo/
├── index.html          → Estructura de la página
├── style.css           → Diseño, animaciones y responsive
├── script.js           → Interacciones y personalización
├── assets/
│   ├── photos/         → Coloca aquí las fotografías
│   └── music/          → Coloca aquí la canción de fondo
└── README.md           → Este archivo
```

## 🚀 Cómo usar

1. Abre `index.html` directamente en tu navegador (no necesitas servidor).
2. Coloca tus fotografías en `assets/photos/` con estos nombres:

| Archivo          | Descripción                          |
|------------------|--------------------------------------|
| `michelle1.jpg`  | Foto de Michelle 1                   |
| `michelle2.jpg`  | Foto de Michelle 2                   |
| `michelle3.jpg`  | Foto de Michelle 3                   |
| `juntos1.jpg`    | Foto de ustedes juntos 1             |
| `juntos2.jpg`    | Foto de ustedes juntos 2             |
| `juntos3.jpg`    | Foto de ustedes juntos 3             |
| `juntos4.jpg`    | Foto de ustedes juntos 4             |
| `especial.jpg`   | Foto especial                        |

3. Coloca tu canción en `assets/music/cancion.mp3` (MP3 recomendado).
   - Si el archivo no existe, la página funciona sin música.

## ✏️ Personalización

Abre `script.js` y busca la sección **PERSONALIZACIÓN** (al principio del archivo).

Todo se edita desde el objeto `CONFIG`:

- **`girlfriendName`** — nombre de tu novia
- **`relationshipStart`** — fecha de inicio de la relación
- **`nickname`** — apodo cariñoso
- **`signature`** — tu nombre o apodo para la firma final
- **`music`** — ruta del archivo de música
- **`photos`** — lista de fotografías con sus descripciones
- **`timeline`** — línea del tiempo (fechas y textos editables)
- **`qualities`** — tarjetas "Lo que amo de ti"
- **`birthdayLetter`** — tu carta de amor (usa `\n` para saltos de línea)

### 📝 Línea del tiempo

Los eventos vacíos (sin fecha y sin texto) se ocultan automáticamente.
Solo completa los que quieras mostrar.

### 📸 Fotografías

Si una fotografía no existe, se muestra un placeholder elegante en su lugar.
La página nunca se rompe por imágenes faltantes.

### 💌 Carta

El texto se escribe con efecto de máquina de escribir.
Usa `\n` en `birthdayLetter` para crear párrafos.

## 🎵 Música

La música comienza automáticamente al pulsar **"ABRIR MI REGALO"**.
Si el navegador bloquea el autoplay, usa el reproductor flotante (🎵) en la esquina inferior derecha.

> **Nota:** Algunos navegadores requieren interacción del usuario para reproducir audio. La página lo maneja automáticamente.

## 📱 Compatibilidad

Funciona en:
- PC / Laptop
- Tablets
- Celulares Android
- iPhone / iPad

## 🎬 Secciones

1. **Bienvenida** — Pantalla inicial con estrellas animadas
2. **Feliz Cumpleaños** — Mensaje con entrada cinematográfica
3. **Nuestros Recuerdos** — Galería estilo polaroid con lightbox
4. **Nuestra Historia** — Línea del tiempo romántica
5. **Lo que amo de ti** — Tarjetas de cualidades animadas
6. **Mi carta para ti** — Carta con efecto de escritura
7. **Nuestro Universo** — Constelación interactiva
8. **Su Cumpleaños** — Tarta con vela y celebración final

---

Hecho con ❤️ para Michelle.