
---

# 🐳 Surf Web Server – Dockerized Nginx

Este proyecto contiene un servidor web basado en **Nginx** dockerizado, listo para ejecutarse en entorno local o desplegarse a través de Docker Hub.

---

## 📦 Requisitos

* Docker instalado
* Cuenta en Docker Hub (opcional para publicar la imagen)

---

# 🚀 1. Construir la Imagen

Desde la raíz del proyecto (donde está el `Dockerfile`):

```bash
docker build -t webserver .
```

Verificar que la imagen fue creada:

```bash
docker images
```

---

# ▶️ 2. Ejecutar el Contenedor en Local

```bash
docker run -d -p 8080:80 --name web webserver
```

Acceder desde el navegador:

```
http://localhost:8080
```

Ver contenedores en ejecución:

```bash
docker ps
```

---

# 🛑 3. Detener y Eliminar Contenedor

Detener:

```bash
docker stop web
```

Eliminar:

```bash
docker rm web
```

Eliminar forzadamente:

```bash
docker rm -f web
```

---

# ☁️ 4. Publicar Imagen en Docker Hub

Construir imagen con namespace de Docker Hub:

```bash
docker build -t jimmyegc/surf:latest .
```

Login:

```bash
docker login
```

Subir imagen:

```bash
docker push jimmyegc/surf:latest
```

---

# 📥 5. Descargar Imagen Desde Docker Hub

```bash
docker pull jimmyegc/surf:latest
```

---

# ▶️ 6. Ejecutar Imagen Descargada

```bash
docker run -d -p 8080:80 --name surf-container jimmyegc/surf:latest
```

Abrir en navegador:

```
http://localhost:8080
```

---

# 🧰 Comandos Esenciales de Docker

Ver imágenes:

```bash
docker images
```

Ver contenedores activos:

```bash
docker ps
```

Ver todos los contenedores:

```bash
docker ps -a
```

Eliminar imagen:

```bash
docker rmi NOMBRE_IMAGEN
```

---

# 🧠 Conceptos Clave

* **Imagen** → Plantilla inmutable.
* **Contenedor** → Instancia en ejecución de una imagen.
* **Tag** → Versión de la imagen (`latest`, `v1.0`, etc.).
* **Docker Hub** → Registro remoto de imágenes.

---

# 📁 Estructura del Proyecto

```
.
├── Dockerfile
└── sitio/
    └── index.html
```

El contenido del directorio `sitio/` se copia a:

```
/usr/share/nginx/html/
```

---

# 📌 Flujo Completo Resumido

```bash
docker build -t jimmyegc/surf:latest .
docker login
docker push jimmyegc/surf:latest

docker pull jimmyegc/surf:latest
docker run -d -p 8080:80 --name surf-container jimmyegc/surf:latest
```

---

## 👨‍💻 Autor

Jimmy García
Full Stack Developer

---