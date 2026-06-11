# QR Code Studio - Generador y Personalizador de Códigos QR Premium

**QR Code Studio** es una aplicación web moderna y sofisticada construida con HTML, CSS3 y JavaScript vanilla. Permite a los usuarios generar códigos QR estáticos para 8 diferentes tipos de datos, personalizando completamente el diseño visual (colores, formas de los puntos, diseño de esquinas) e integrando logotipos personalizados en el centro.

La aplicación realiza todo el renderizado y personalización directamente en el navegador del cliente utilizando la librería [qr-code-styling](https://github.com/kozakdenys/qr-code-styling), ofreciendo descargas en alta resolución sin necesidad de servidores externos.

## 🚀 Características Premium

* **8 Tipos de QR Dinámicos (Estáticos)**:
  * 🔗 **Enlace URL**: Con detección automática de protocolos `http/https`.
  * 📝 **Texto**: Mensajes, notas o información plana.
  * 📶 **WiFi**: Conexión rápida a redes inalámbricas (WPA/WPA2, WEP, abierta y redes ocultas).
  * 📇 **Contacto vCard**: Creación de tarjetas de contacto vCard 3.0 completas.
  * ✉️ **Email**: Redacción automática de correos con destinatario, asunto y mensaje.
  * 💬 **WhatsApp**: Enlace directo para abrir chats con mensajes predefinidos.
  * 📞 **Llamada**: Marcado telefónico directo.
  * 💬 **SMS**: Mensajes de texto configurados.
* **Personalización del Diseño**:
  * Paleta de color frontal y de fondo.
  * Formas de puntos (cuadrado, redondeado, extra redondeado, círculos, elegante).
  * Diseño de las tres esquinas de posicionamiento y sus centros de forma independiente.
* **Integración de Logotipo**:
  * Permite subir cualquier imagen de logo para centrarla dentro del código QR, aplicando un nivel de corrección de errores óptimo (30%) de forma automática.
* **Exportación de Calidad**:
  * Descargas en formato **PNG** y **SVG** (vectorial).
  * Selector de resolución interactivo desde 200px hasta 1000px.
* **Diseño UI Moderno**:
  * Interfaz fluida con temática oscura y efecto *Glassmorphism* (cristal esmerilado).
  * Totalmente responsivo para móviles y tabletas.

---

## 🛠️ Tecnologías

* **HTML5**: Estructura semántica de la aplicación.
* **CSS3**: Diseño moderno personalizado, fuentes de Google Fonts (Outfit, Inter) y variables dinámicas.
* **JavaScript (ES6+)**: Lógica interactiva con manejo de pestañas, formateadores de datos y debounce de rendimiento.
* **Librería externa**: [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) (cargada mediante CDN de jsDelivr).

---

## 💻 Instalación y Uso Local

No requiere bases de datos ni backend. Para correr la aplicación localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MoisesMJavier/generadorQr.git
   ```
2. Abre el archivo `index.html` en tu navegador favorito.
3. Alternativamente, puedes servirlo localmente usando cualquier servidor estático ligero:
   ```bash
   python -m http.server 8000
   ```

---

## 👥 Créditos y Contribuciones

* **Layout Base y Concepto Original:** Creado por [Antonio Heredia](https://github.com/Heran76) ([Portafolio](https://portfolioantonioheredia.netlify.app/)).
* **Mejoras, Estilización Premium y Ampliación de Formatos:** Desarrollado y optimizado por [MoisesMJavier](https://github.com/MoisesMJavier).

