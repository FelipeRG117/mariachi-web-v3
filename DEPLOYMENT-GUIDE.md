# 🚀 Guía de Deployment y SEO

Esta guía te ayudará a completar el deployment y configurar las herramientas de SEO después de que el sitio esté en producción.

---

## ✅ Checklist de Deployment

### **Fase 1: Verificar que el Build fue Exitoso**

1. **Ir a Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Buscar el proyecto: `mariachi-web-v3`
   - Verificar que el último deployment tenga estado ✅ "Ready"

2. **Probar el sitio en producción**
   - Abrir la URL de Vercel (ej: `https://mariachi-web-v3.vercel.app`)
   - Verificar que todas las páginas funcionan:
     - ✅ Página de inicio: `/`
     - ✅ Tienda: `/tienda`
     - ✅ Tour: `/tour`
     - ✅ Nosotros: `/nosotros`
     - ✅ Admin login: `/admin/login`

3. **Verificar archivos SEO generados automáticamente**
   - ✅ Sitemap: `https://tu-dominio.vercel.app/sitemap.xml`
   - ✅ Robots.txt: `https://tu-dominio.vercel.app/robots.txt`

---

### **Fase 2: Configurar Variables de Entorno en Vercel**

**IMPORTANTE:** Debes configurar las siguientes variables en Vercel:

1. **Ir a Vercel Dashboard → Settings → Environment Variables**

2. **Agregar las siguientes variables:**

```bash
# Base URL (cambia por tu dominio real cuando lo tengas)
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app

# Backend API URL (cuando despliegues el backend)
NEXT_PUBLIC_API_URL=https://api-mariachi-web.railway.app  # O la URL que uses

# Stripe (usa tu clave de producción cuando estés listo)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Cambiar a producción después
```

3. **Redeploy después de agregar variables:**
   - Vercel → Deployments → ... → Redeploy

---

### **Fase 3: Conectar Dominio Personalizado (Opcional)**

Si tienes un dominio personalizado (ej: `luiscarlosgago.com`):

1. **Ir a Vercel → Settings → Domains**
2. **Agregar tu dominio**
3. **Configurar DNS según instrucciones de Vercel**
4. **Actualizar `NEXT_PUBLIC_BASE_URL` con el nuevo dominio**

---

## 🔍 Configuración de Google Search Console

**REQUISITO:** El sitio debe estar deployado y público.

### Paso 1: Crear cuenta en Google Search Console

1. **Ir a:** https://search.google.com/search-console
2. **Click en "Agregar propiedad"**
3. **Seleccionar "Prefijo de URL"**
4. **Ingresar:** `https://tu-dominio.vercel.app`

### Paso 2: Verificar propiedad del sitio

**Opción A - Meta Tag (Recomendado):**

1. Google te dará un código de verificación como: `google-site-verification=ABC123...`
2. **Agregar en `web-front/src/app/layout.tsx`:**

```typescript
export const metadata: Metadata = {
  // ... otras configuraciones
  verification: {
    google: 'ABC123...',  // ← PEGA TU CÓDIGO AQUÍ
  },
};
```

3. Commit y push:
```bash
git add .
git commit -m "Add Google Search Console verification"
git push
```

4. Esperar que Vercel redeploy
5. Volver a Google Search Console y click "Verificar"

**Opción B - Archivo HTML:**
1. Descargar el archivo HTML que Google te da
2. Colocarlo en `web-front/public/google123abc.html`
3. Commit, push y verificar

### Paso 3: Enviar Sitemap

1. **En Google Search Console → Sitemaps**
2. **Agregar nueva sitemap:** `https://tu-dominio.vercel.app/sitemap.xml`
3. **Click "Enviar"**

✅ Google empezará a indexar tu sitio en 1-3 días.

---

## 📊 Configuración de Google Analytics 4 (Opcional)

### Paso 1: Crear propiedad GA4

1. **Ir a:** https://analytics.google.com
2. **Admin → Crear propiedad**
3. **Nombre:** "Luis Carlos Gago - Web"
4. **Configurar flujo de datos web**
5. **Copiar el MEASUREMENT ID** (ej: `G-XXXXXXXXXX`)

### Paso 2: Instalar Google Analytics en Next.js

1. **Instalar dependencias:**
```bash
cd web-front
npm install @next/third-parties
```

2. **Agregar en `web-front/src/app/layout.tsx`:**

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />  {/* ← TU ID AQUÍ */}
      </body>
    </html>
  )
}
```

3. **Commit y push**

---

## 🎯 Checklist Post-Deployment (Primeros 7 días)

### Día 1: Verificación Básica
- [ ] Sitio deployado y funcionando
- [ ] Variables de entorno configuradas
- [ ] Sitemap.xml y robots.txt accesibles
- [ ] Google Search Console configurado
- [ ] Sitemap enviado a Google

### Día 3-5: Primeros Datos
- [ ] Verificar en Google Search Console si hay páginas indexadas
- [ ] Revisar si hay errores de crawling
- [ ] Ver qué páginas visitó Google

### Día 7: Primera Optimización
- [ ] Analizar Core Web Vitals en Vercel Analytics
- [ ] Identificar imágenes pesadas (optimizar)
- [ ] Ver qué páginas tienen LCP alto (>2.5s)

---

## 📈 Herramientas para Monitorear

### **Gratuitas:**
1. **Google Search Console** - Indexación, errores, rendimiento en búsquedas
2. **Google Analytics 4** - Tráfico, comportamiento de usuarios
3. **Vercel Analytics** - Core Web Vitals reales
4. **Google PageSpeed Insights** - https://pagespeed.web.dev
5. **Lighthouse** (DevTools de Chrome) - Auditoría de performance

### **Pagadas (Opcional):**
1. **Ahrefs** - Keywords, backlinks, competencia ($99/mes)
2. **SEMrush** - SEO, keywords, análisis de competencia ($119/mes)

---

## 🚨 Errores Comunes y Soluciones

### Error: "Sitemap.xml no encontrado"
**Solución:** Verifica que `web-front/src/app/sitemap.ts` existe y está deployado.

### Error: "Google no puede verificar el sitio"
**Solución:** Asegúrate de que el meta tag está en `<head>` del HTML. Verifica en "Ver código fuente" del navegador.

### Error: "Páginas no indexadas"
**Solución:** Espera 3-7 días. Google es lento para indexar sitios nuevos.

### Error: "Core Web Vitals malos"
**Solución:** Optimiza imágenes, usa Next.js Image, implementa lazy loading.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard → Deployments → Functions
2. Revisa Google Search Console → Coverage → Errores
3. Usa Lighthouse en DevTools para diagnóstico local

---

## ✅ Siguiente Paso Recomendado

Una vez que el sitio esté deployado y Google Search Console configurado:

1. **Esperar 1-2 semanas** para recopilar datos
2. **Analizar** qué páginas tienen más tráfico
3. **Optimizar** las páginas más visitadas primero
4. **Crear contenido** para keywords con potencial

---

**Última actualización:** 2025-12-09
