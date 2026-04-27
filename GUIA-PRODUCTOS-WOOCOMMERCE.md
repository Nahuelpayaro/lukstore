# Guía de Productos — Lukstore Admin
### Cómo subir y editar productos desde WooCommerce

---

## ACCESO AL PANEL

1. Entrá a **inventario.lukstore.cl/wp-admin**
2. Ingresá tu usuario y contraseña
3. En el menú de la izquierda, hacé click en **Productos**

---

## CÓMO AGREGAR UN PRODUCTO NUEVO

### Paso 1 — Crear el producto
1. Click en **Productos → Agregar nuevo**

### Paso 2 — Nombre del producto
- En el campo grande de arriba escribí el nombre completo
- Ejemplo: `Jordan 4 Red Thunder`

### Paso 3 — Imágenes
- En el panel derecho buscá **"Imagen del producto"**
- Click en **"Establecer imagen del producto"** → subí la foto principal
- Más abajo buscá **"Galería del producto"**
- Click en **"Agregar a la galería"** → subí el resto de las fotos
- **Recomendación:** subí entre 3 y 6 fotos por producto (frente, lateral, talón, suela, detalle)

### Paso 4 — Precio
- En la sección **"Datos del producto"** → pestaña **"General"**
- **Precio normal:** el precio de venta en CLP (sin puntos ni comas, solo números)
  - Ejemplo: `135000`
- **Precio rebajado:** solo si el producto tiene descuento (opcional)

### Paso 5 — Inventario (Stock)
- Click en la pestaña **"Inventario"** dentro de "Datos del producto"
- **SKU:** podés dejarlo como está o escribir un código propio
- **Gestionar stock:** activá esta opción (tildar el checkbox)
- **Cantidad en stock:**
  - Si tenés el producto para vender → escribí cuántas unidades tenés (ejemplo: `1`)
  - Si el producto ya se vendió o está agotado → escribí `0`
- **Estado del stock:**
  - Se va a actualizar solo según la cantidad
  - Si querés forzarlo como agotado sin cambiar la cantidad → elegí **"Agotado"** en el desplegable

### Paso 6 — Categorías
- En el panel derecho buscá **"Categorías de producto"**
- Seleccioná la categoría que corresponda:

| Producto | Categoría a seleccionar |
|----------|------------------------|
| Zapatillas Jordan | Zapatillas → Jordan |
| Zapatillas Nike Dunk | Zapatillas → Nike Dunk |
| Zapatillas Air Force | Zapatillas → Air Force |
| Zapatillas Adidas/Yeezy | Zapatillas → Adidas/Yeezy |
| Hoodies / Buzos | Ropa → Hoodies |
| Poleras / Remeras | Ropa → Poleras |
| Pantalones / Joggers | Ropa → Pantalones |
| Gorros / Caps | Accesorios → Gorros |
| Calcetines | Accesorios → Calcetines |

- **Importante:** seleccioná SIEMPRE la subcategoría (la del nivel hijo), no solo la categoría padre

### Paso 7 — Atributos
- Click en la pestaña **"Atributos"** dentro de "Datos del producto"
- Para cada atributo hacé click en el desplegable, elegilo y click en **"Agregar"**:

| Atributo | Qué escribir |
|----------|-------------|
| **Talle** | El número de talle (ejemplo: `9 US` o `9.5 US`) |
| **Género** | `Hombre`, `Mujer` o `Unisex` |
| **Marca** | La marca (ejemplo: `Jordan`, `Nike`, `Adidas`) |
| **Condición** | `Nuevo` o `Usado` |

- Después de agregar cada atributo, **activá la opción "Visible en la página del producto"**

### Paso 8 — Tags (opcional)
- En el panel derecho buscá **"Etiquetas del producto"**
- Si el producto es un **Drop** (lanzamiento especial) → escribí `drop` y presioná Enter
- Si querés que aparezca en "Nuevos Ingresos" → escribí `nuevo-ingreso` y presioná Enter

### Paso 9 — Destacado (opcional)
- En la lista de productos, hacé click en la **estrellita** al lado del producto
- Los productos destacados aparecen en la sección "Selección Destacada" del home

### Paso 10 — Publicar
- En el panel derecho, click en el botón **"Publicar"**
- El producto ya aparece en la tienda

---

## CÓMO EDITAR UN PRODUCTO EXISTENTE

1. Click en **Productos → Todos los productos**
2. Buscá el producto por nombre en la barra de búsqueda
3. Click en el nombre del producto o en **"Editar"**
4. Hacé los cambios que necesitás
5. Click en **"Actualizar"** (botón azul arriba a la derecha)

### Cambios más comunes

**Cambiar el precio:**
- Datos del producto → General → Precio normal

**Subir fotos:**
- Panel derecho → Imagen del producto / Galería del producto

**Marcar como agotado:**
- Datos del producto → Inventario → Cantidad en stock → escribí `0`

**Marcar como disponible (llegó nuevo stock):**
- Datos del producto → Inventario → Cantidad en stock → escribí la cantidad que tenés

**Cambiar la talla:**
- Datos del producto → Atributos → Talle → editá el valor

---

## CÓMO EDITAR VARIOS PRODUCTOS A LA VEZ

Si necesitás cambiar el precio o el stock de varios productos al mismo tiempo:

1. Click en **Productos → Todos los productos**
2. Seleccioná los productos con el checkbox de la izquierda
3. En el desplegable **"Acciones en lote"** → elegí **"Editar"**
4. Click en **"Aplicar"**
5. Cambiá los campos que necesitás (precio, stock, etc.)
6. Click en **"Actualizar"**

---

## IMPORTANTE — VISIBILIDAD DE PRODUCTOS AGOTADOS

Para que los productos agotados **sigan apareciendo** en la tienda (como referencia de lo que vendiste):

1. Ir a **WooCommerce → Ajustes → Productos → Inventario**
2. Asegurarse que **"Ocultar artículos agotados del catálogo"** esté **DESACTIVADO**
3. Click en **"Guardar cambios"**

---

## PREGUNTAS FRECUENTES

**¿Por qué el producto no aparece en la tienda?**
- Verificá que esté en estado "Publicado" (no Borrador)
- Verificá que tenga categoría asignada

**¿Por qué el producto aparece pero no se puede comprar?**
- Está marcado como Agotado (stock = 0). Cambiá la cantidad a 1 o más.

**¿Puedo cambiar el nombre del producto?**
- Sí, editá el título y hacé click en Actualizar. El nombre en la tienda se actualiza solo.

**¿Qué pasa si subo una foto en formato incorrecto?**
- WordPress acepta JPG, PNG y WEBP. Si tenés fotos en HEIC (iPhone), convertílas primero a JPG.
