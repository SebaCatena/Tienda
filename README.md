# Tienda de Ropa 🛍️

Catálogo de ropa responsive con carrito de compras desarrollado en **HTML, CSS y JavaScript puro**, sin frameworks ni dependencias de build.

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://sebacatena.github.io/Tienda/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

<!-- Agregá una captura en docs/preview.png y descomentá esta línea: -->
<!-- ![Vista previa](docs/preview.png) -->

## Demo

👉 **https://sebacatena.github.io/Tienda/**

## Funcionalidades

- Grilla de productos responsive (mobile first).
- Carrito lateral con animación de apertura y cierre.
- Agregar productos, evitar duplicados y quitar artículos.
- Control de cantidad por producto con recálculo automático del total.
- Checkout simulado con confirmación.
- Accesible con teclado: botones nativos, `aria-label`, cierre con `Escape` y foco visible.

## Stack

- **HTML5** semántico.
- **CSS3**: variables, grid, flexbox, media queries y transiciones.
- **JavaScript (ES6+)**: manipulación del DOM, delegación de eventos y `Intl.NumberFormat` vía `toLocaleString`.
- **Boxicons** para los íconos.

## Cómo correrlo

No necesita instalación. Opciones:

```bash
# Opción 1: abrir index.html en el navegador
# Opción 2: servidor local
python -m http.server 8000
```

Luego abrí <http://localhost:8000>.

## Estructura

```
Tienda/
├─ index.html     # estructura y catálogo
├─ style.css      # estilos y responsive
├─ app.js         # lógica del carrito
└─ img/           # imágenes de los productos
```

## Decisiones técnicas

- **Carrito en memoria**: el estado vive en un array y se vuelve a renderizar la vista en cada cambio. Simple y suficiente para una demo.
- **Delegación de eventos**: los listeners del carrito se registran una sola vez en el contenedor, así no se duplican al re-renderizar.
- **`textContent` en vez de `innerHTML`**: los datos de los productos se insertan como texto, lo que evita XSS si en el futuro vienen de una API.
- **Precios centralizados**: el total se calcula en un solo lugar y se formatea con `toLocaleString("es-AR")`.

## Limitaciones

- El carrito no persiste al recargar (no usa `localStorage` ni backend).
- Los precios y el stock son datos estáticos del HTML: en producción deben venir del servidor.
- No procesa pagos reales.

## Roadmap

- [ ] Persistir el carrito en `localStorage`.
- [ ] Migrar el catálogo a un backend Flask + SQLite.
- [ ] Autenticación de usuarios.
- [ ] Integrar una pasarela de pagos en modo test.
- [ ] Tests del carrito con Vitest.

## Licencia

MIT © 2024-2026 Sebastián Catena
