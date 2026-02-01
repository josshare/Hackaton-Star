# Instrucciones para el Despliegue Continuo en Google Cloud

Sigue estos 4 pasos para configurar tu infraestructura y el activador de Cloud Build.

---

### Paso 1: Configurar el Proyecto y Permisos en tu Terminal

Abre una terminal y ejecuta los siguientes comandos. Asegúrate de tener `gcloud` instalado y autenticado.

```bash
# 1. Establece tu proyecto de Google Cloud
gcloud config set project team-42a8d

# 2. Activa las APIs necesarias para Cloud Build y Deployment Manager
gcloud services enable cloudbuild.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

---

### Paso 2: Crear el Bucket de Google Cloud Storage

El siguiente comando creará el bucket donde se alojará tu web.

**Importante:** El nombre del bucket debe ser **único a nivel mundial**. Usaremos `team-42a8d-frontend` como ejemplo, pero si ya existe, deberás cambiarlo.

```bash
# 1. Define el nombre de tu bucket (cámbialo si ya existe)
BUCKET_NAME="team-42a8d-frontend"

# 2. Crea el bucket
 gsutil mb -p team-42a8d -l US-CENTRAL1 gs://${BUCKET_NAME}

# 3. Configura el bucket para alojar una web (importante para React Router)
 gsutil web set -m index.html -e index.html gs://${BUCKET_NAME}

# 4. Otorga permisos públicos de lectura al bucket para que sea una web pública
 gsutil iam ch allUsers:objectViewer gs://${BUCKET_NAME}

# 5. Otorga permisos a la cuenta de servicio de Cloud Build para que pueda escribir en el bucket
PROJECT_NUMBER=$(gcloud projects describe team-42a8d --format="value(projectNumber)")
gcloud storage buckets add-iam-policy-binding gs://${BUCKET_NAME} \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/storage.objectAdmin"
```

---

### Paso 3: Conectar tu Repositorio de Git a Cloud Build

Para que Cloud Build se active con cada `git push`, debes conectar tu repositorio (GitHub, GitLab, etc.).

1.  **Abre la consola de Cloud Build:**
    [https://console.cloud.google.com/cloud-build/triggers?project=team-42a8d](https://console.cloud.google.com/cloud-build/triggers?project=team-42a8d)

2.  En el menú de la izquierda, ve a **"Repositorios"**.
3.  Haz clic en **"Conectar repositorio"** en la parte superior.
4.  Selecciona tu proveedor de Git (ej. GitHub), autentícate y sigue los pasos para seleccionar el repositorio donde está tu código.

---

### Paso 4: Crear el Activador (Trigger) de Cloud Build

Este es el último paso. El activador le dirá a Cloud Build qué hacer cuando hagas `push`.

1.  **Vuelve a la sección "Activadores"** de Cloud Build.
2.  Haz clic en **"Crear activador"**.
3.  **Rellena el formulario:**
    *   **Nombre:** `deploy-frontend-on-push`
    *   **Evento:** `Subir a una rama` (Push to a branch)
    *   **Repositorio:** Selecciona el repositorio que acabas de conectar.
    *   **Nombre de la rama:** `^main$` o `^master$` (la que uses como principal).
    *   **Configuración:** `Archivo de configuración de Cloud Build (yaml o json)`.
    *   **Ubicación:** `Repositorio` (debería detectar tu `cloudbuild.yaml`).

4.  **IMPORTANTE: Variables de Sustitución**
    *   En la sección de "Variables de sustitución avanzadas", haz clic en **"AÑADIR VARIABLE"** por cada una de las siguientes:
        *   `_BUCKET_NAME`: Pon el nombre del bucket que creaste (ej. `team-42a8d-frontend`).
        *   `_REACT_APP_API_KEY`: Pega el valor de tu archivo `.env`.
        *   `_REACT_APP_AUTH_DOMAIN`: Pega el valor de tu archivo `.env`.
        *   `_REACT_APP_PROJECT_ID`: Pega el valor de tu archivo `.env`.
        *   `_REACT_APP_STORAGE_BUCKET`: Pega el valor de tu archivo `.env`.
        *   `_REACT_APP_MESSAGING_SENDER_ID`: Pega el valor de tu archivo `.env`.
        *   `_REACT_APP_APP_ID`: Pega el valor de tu archivo `.env`.

5.  Haz clic en **"Crear"**.

---

### ¡Listo!

A partir de ahora, cada vez que hagas `git push` a tu rama principal, Cloud Build compilará tu aplicación y la desplegará automáticamente en Google Cloud Storage.

Puedes ver tu sitio web en: `https://storage.googleapis.com/NOMBRE_DE_TU_BUCKET/index.html`
