# RESUMEN DEL PROYECTO - TELCEL ROBOT FRAMEWORK

## ✅ Proyecto Creado Exitosamente

Este proyecto implementa **5 casos de prueba automatizados** para funcionalidades de **Amigo Paguitos** en BES/CRM usando:
- **Robot Framework** con **SeleniumLibrary**
- **Page Object Model (POM)** como patrón de diseño
- **Python** como lenguaje base
- **Keywords en español** siguiendo estándares Telcel

---

## 📁 ARCHIVOS CREADOS

### 📄 Documentación (3 archivos)
```
CLAUDE.md              - Documentación técnica completa del proyecto
README.md              - Guía de inicio rápido
ESTRUCTURA.txt         - Arquitectura visual del proyecto
```

### 🧪 Test Cases (5 archivos .robot)
```
tests/TC_032_Validacion_Oferta_Primaria_Amigo_Paguitos.robot
tests/TC_033_Alta_Oferta_Suplementaria_Telcel_Up.robot
tests/TC_038_Restricciones_Tramites_Postactivacion.robot
tests/TC_039_Cambio_Ciclo_Facturacion_99.robot
tests/TC_067_Validar_No_Cambio_Oferta_Primaria.robot
```

### 📦 Page Resources (6 archivos .resource)
```
pages/LoginPage.resource           - Login y autenticación
pages/OfertasPage.resource         - Módulo de ofertas primarias
pages/ClientePage.resource         - Gestión de clientes
pages/TramitesPage.resource        - Trámites postactivación
pages/FacturacionPage.resource     - Facturación y ciclos
pages/SuscriptorPage.resource      - Vista 360 de suscriptores
```

### ⚙️ Recursos (2 archivos .resource)
```
resources/keywords.resource        - Keywords BDD de alto nivel
resources/config.resource          - Configuración global
```

### 🛠️ Utilidades (4 archivos)
```
run_tests.sh                       - Script de ejecución (con colores y menú)
requirements.txt                   - Dependencias Python
.gitignore                        - Archivos a ignorar en Git
RESUMEN_PROYECTO.md               - Este archivo
```

---

## 📊 CASOS DE PRUEBA IMPLEMENTADOS

| TC | Título | Complejidad | Módulo | Descripción |
|----|--------|-------------|---------|-------------|
| **TC032** | Validación oferta primaria Amigo Paguitos | Medium | Ofertas | Tarifa 0, sin unidades libres, sin suplementarias |
| **TC033** | Alta oferta suplementaria Telcel Up | Medium | Servicios | Agregar Telcel Up a cliente Amigo Paguitos |
| **TC038** | Restricciones trámites postactivación | Medium | Trámites | Bloqueo de cambio número/SIM/cesión/pérdida |
| **TC039** | Cambio ciclo facturación a 99 | Medium | Facturación | Solo por API, no por GUI |
| **TC067** | No cambio de oferta primaria | Low | Ofertas | Restricción total de cambio de oferta |

**Total:** 5 Test Cases | **Tag común:** `PruebaGeneradaIA`

---

## 🎯 ESTRUCTURA PAGE OBJECT MODEL

```
┌─────────────────────────────────────────┐
│          Test Cases Layer               │  ← 5 archivos .robot
│  • Lógica de negocio (BDD)             │     (Given/When/Then)
│  • NO contienen locators               │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│          Keywords Layer                 │  ← keywords.resource
│  • Acciones reutilizables              │     (Alto nivel)
│  • Combinan keywords de páginas        │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│        Page Objects Layer               │  ← 6 Page Resources
│  • Locators (variables)                │     (LoginPage, OfertasPage...)
│  • Keywords específicos de página      │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│       SeleniumLibrary                   │  ← Robot Framework
│  • Comandos Selenium                   │     (Click, Input, Wait...)
└─────────────────────────────────────────┘
```

---

## 🚀 CÓMO USAR EL PROYECTO

### 1️⃣ Instalación de Dependencias
```bash
# Instalar Python 3.8+
sudo apt-get update
sudo apt-get install python3 python3-pip

# Instalar dependencias del proyecto
pip3 install -r requirements.txt

# Instalar ChromeDriver
sudo apt-get install chromium-chromedriver
```

### 2️⃣ Configuración
Editar `resources/config.resource`:
```robot
${URL_BASE}               https://bes-qa.telcel.com
${USUARIO_TEST}           tu_usuario
${PASSWORD_TEST}          tu_password
${CLIENTE_AMIGO_PAGUITOS}         5512345678
${SUSCRIPTOR_AMIGO_PAGUITOS}      5512345678
${CUENTA_AMIGO_PAGUITOS}          ACC123456
```

### 3️⃣ Ejecución de Pruebas

**Opción A: Usando el script** (recomendado)
```bash
# Ver opciones disponibles
./run_tests.sh help

# Ejecutar todos los tests
./run_tests.sh all

# Ejecutar un test específico
./run_tests.sh tc032
./run_tests.sh tc033
./run_tests.sh tc038
./run_tests.sh tc039
./run_tests.sh tc067

# Ejecutar por tags
./run_tests.sh ofertas
./run_tests.sh restricciones

# Validar sintaxis sin ejecutar
./run_tests.sh dryrun
```

**Opción B: Usando robot directamente**
```bash
# Todos los tests
robot -d reports tests/

# Un test específico
robot -d reports tests/TC_032_Validacion_Oferta_Primaria_Amigo_Paguitos.robot

# Por tags
robot -d reports -i PruebaGeneradaIA tests/
robot -d reports -i Ofertas tests/
robot -d reports -i AmigoPaguitos tests/
robot -d reports -i Medium tests/

# Validación de sintaxis
robot --dryrun -d reports tests/
```

### 4️⃣ Ver Reportes
```bash
# Los reportes se generan automáticamente en reports/
xdg-open reports/report.html    # Linux
open reports/report.html        # Mac
start reports/report.html       # Windows
```

---

## 📋 REGLAS DE ORO DEL PROYECTO

### ✅ DO (Hacer)
- ✓ Agregar nuevos locators al final de Page Resources
- ✓ Usar prioridad: id → name → CSS → XPath
- ✓ Reutilizar keywords existentes
- ✓ Seguir patrón Given/When/Then en Test Cases
- ✓ Tag `PruebaGeneradaIA` en todos los Test Cases
- ✓ Keywords en español con mayúsculas iniciales
- ✓ Esperas explícitas (Wait Until...)

### ❌ DON'T (No hacer)
- ✗ Eliminar o modificar locators existentes
- ✗ Poner locators en Test Cases o keywords.resource
- ✗ Usar XPath como primera opción
- ✗ Duplicar keywords que ya existen
- ✗ Más de 1 Test Case por archivo .robot
- ✗ Omitir el tag PruebaGeneradaIA

---

## 🏗️ KEYWORDS IMPLEMENTADOS

### Login y Sesión
- `Dado que el usuario ha iniciado sesión en BES`
- `Cerrar sesión del sistema`

### Ofertas (TC032)
- `Cuando accede al módulo de configuración de ofertas primarias`
- `Y busca la oferta primaria exclusiva para Amigo Paguitos`
- `Entonces la tarifa de renta debe ser cero`
- `Y no deben existir unidades libres configuradas`
- `Y no deben existir ofertas suplementarias adicionales`

### Servicios Adicionales (TC033)
- `Dado que existe un cliente de Amigo Paguitos con financiamiento activo`
- `Cuando accede a la opción de alta de servicios adicionales`
- `Y selecciona la oferta suplementaria Telcel Up`
- `Y confirma el alta de la oferta suplementaria`
- `Entonces el sistema debe registrar exitosamente el alta de Telcel Up`

### Restricciones Trámites (TC038)
- `Dado que existe un suscriptor de Amigo Paguitos activo`
- `Cuando intenta realizar un cambio de número`
- `Cuando intenta realizar un cambio de SIM`
- `Cuando intenta realizar una cesión de derechos`
- `Cuando intenta realizar un reporte de pérdida o robo`
- `Entonces el sistema debe bloquear la operación con mensaje de restricción`

### Cambio Ciclo (TC039)
- `Dado que existe una cuenta de Amigo Paguitos con ciclo activo`
- `Cuando intenta cambiar el ciclo a 99 desde la GUI`
- `Entonces el sistema no debe permitir el cambio desde la interfaz gráfica`
- `Cuando ejecuta el cambio de ciclo a 99 a través de API`
- `Entonces el sistema debe cambiar exitosamente el ciclo a 99`

### Cambio Oferta (TC067)
- `Cuando accede a la vista 360 del suscriptor Amigo Paguitos`
- `Y obtiene la oferta primaria actual`
- `Cuando intenta cambiar la oferta primaria desde la GUI`
- `Entonces el sistema debe mostrar mensaje de operación no permitida`
- `Y la oferta primaria debe permanecer sin cambios`

---

## 🔧 LOCATORS IMPLEMENTADOS (POR PÁGINA)

### LoginPage (7 locators)
```robot
${URL_LOGIN}              https://bes-qa.telcel.com/login
${INPUT_USERNAME}         id:username
${INPUT_PASSWORD}         id:password
${BTN_LOGIN}              id:btnLogin
${BTN_INGRESAR}           css:button[type='submit']
${LBL_DASHBOARD}          id:dashboard
${MENU_PRINCIPAL}         css:.main-menu
```

### OfertasPage (12 locators)
```robot
${MENU_CONFIGURACION}
${MENU_OFERTAS}
${SUBMENU_OFERTAS_PRIMARIAS}
${INPUT_BUSCAR_OFERTA}
${BTN_BUSCAR_OFERTA}
${TBL_RESULTADOS_OFERTAS}
${LINK_AMIGO_PAGUITOS}
${LBL_DETALLE_OFERTA}
${INPUT_TARIFA_RENTA}
${LBL_UNIDADES_LIBRES}
${SECTION_OFERTAS_SUPLEMENTARIAS}
${LBL_SIN_OFERTAS_SUPLEMENTARIAS}
```

### ClientePage (13 locators)
```robot
${MENU_CLIENTES}
${INPUT_BUSCAR_CLIENTE}
${BTN_BUSCAR_CLIENTE}
${TBL_RESULTADOS_CLIENTES}
${LINK_VER_CLIENTE}
${LBL_INFO_CLIENTE}
${LBL_TIPO_CUENTA}
${BTN_SERVICIOS_ADICIONALES}
${MODAL_SERVICIOS}
${DDL_SELECCIONAR_SERVICIO}
${OPTION_TELCEL_UP}
${BTN_AGREGAR_SERVICIO}
${MSG_CONFIRMACION}
${SECTION_SERVICIOS_ACTIVOS}
${LBL_SERVICIO_TELCEL_UP}
```

### TramitesPage (8 locators)
```robot
${MENU_TRAMITES}
${SUBMENU_POSTACTIVACION}
${BTN_CAMBIO_NUMERO}
${BTN_CAMBIO_SIM}
${BTN_CESION_DERECHOS}
${BTN_REPORTE_PERDIDA}
${MSG_ERROR_RESTRICCION}
${MSG_OPERACION_NO_PERMITIDA}
```

### FacturacionPage (9 locators)
```robot
${MENU_FACTURACION}
${SUBMENU_CAMBIO_CICLO}
${INPUT_NUMERO_CUENTA}
${BTN_BUSCAR_CUENTA}
${LBL_CICLO_ACTUAL}
${DDL_NUEVO_CICLO}
${BTN_CAMBIAR_CICLO_GUI}
${MSG_ERROR_GUI}
${LBL_CICLO_ACTUALIZADO}
```

### SuscriptorPage (11 locators)
```robot
${MENU_SUSCRIPTORES}
${INPUT_BUSCAR_SUSCRIPTOR}
${BTN_BUSCAR_SUSCRIPTOR}
${LINK_VER_SUSCRIPTOR}
${SECTION_VISTA_360}
${LBL_OFERTA_PRIMARIA}
${BTN_CAMBIAR_OFERTA}
${MSG_ERROR_CAMBIO_OFERTA}
${LBL_TIPO_SUSCRIPTOR}
${MODAL_CAMBIO_OFERTA}
${DDL_NUEVA_OFERTA}
```

**Total:** 60+ locators implementados

---

## 📈 TAGS DISPONIBLES PARA FILTRADO

### Tags Principales
- `PruebaGeneradaIA` - Todos los tests generados por IA (5 tests)
- `AmigoPaguitos` - Tests de Amigo Paguitos (5 tests)
- `Funcional` - Tests funcionales (4 tests)

### Tags por Módulo
- `Ofertas` - Tests de ofertas (2 tests: TC032, TC067)
- `ServiciosAdicionales` - Tests de servicios (1 test: TC033)
- `Tramites` - Tests de trámites (1 test: TC038)
- `Facturacion` - Tests de facturación (1 test: TC039)

### Tags Específicos
- `TelcelUp` - Tests de Telcel Up (TC033)
- `Restricciones` - Tests de restricciones (TC038, TC067)
- `API` - Tests que requieren API (TC039)

### Tags por Complejidad
- `Medium` - Complejidad media (4 tests)
- `Low` - Complejidad baja (1 test)

**Ejemplo de filtrado:**
```bash
robot -d reports -i Ofertas -i Restricciones tests/
robot -d reports -e Low tests/
```

---

## 📦 DEPENDENCIAS

```
robotframework==7.0
robotframework-seleniumlibrary==6.2.0
selenium==4.15.2
```

### Navegadores Soportados
- Chrome / Chromium (recomendado)
- Firefox
- Edge
- Safari

---

## 🔄 INTEGRACIÓN CI/CD

### Jenkins Pipeline
```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'pip3 install -r requirements.txt'
                sh 'robot -d reports tests/'
            }
        }
    }
    post {
        always {
            robot outputPath: 'reports'
        }
    }
}
```

### GitLab CI
```yaml
test:
  stage: test
  script:
    - pip3 install -r requirements.txt
    - robot -d reports tests/
  artifacts:
    when: always
    paths:
      - reports/
```

---

## 📞 PRÓXIMOS PASOS

1. **Actualizar locators reales:** Los locators actuales son ejemplos. Debes:
   - Navegar a la aplicación BES real
   - Inspeccionar elementos con DevTools
   - Reemplazar locators de ejemplo por los reales
   - Seguir prioridad: id → name → CSS → XPath

2. **Configurar credenciales:** Editar `resources/config.resource` con:
   - URL real de BES (QA/UAT/PRE)
   - Usuario y password de prueba
   - Datos de prueba (clientes, suscriptores, cuentas)

3. **Ejecutar validación:** Probar con `./run_tests.sh dryrun`

4. **Ajustar tiempos de espera:** Si la aplicación es lenta, modificar timeouts

5. **Implementar API calls:** Para TC039 (cambio ciclo 99 por API)

---

## ✨ CARACTERÍSTICAS DEL PROYECTO

✓ **Patrón POM** correctamente implementado
✓ **Keywords en español** siguiendo estándares Telcel
✓ **Append-Only** para Page Resources
✓ **Prioridad de locators** (id > name > CSS > XPath)
✓ **Separación de responsabilidades** (Test/Keywords/Pages)
✓ **BDD Given/When/Then** en Test Cases
✓ **Tag PruebaGeneradaIA** en todos los tests
✓ **Script de ejecución** con colores y menú
✓ **Documentación completa** (CLAUDE.md, README.md, ESTRUCTURA.txt)
✓ **5 Test Cases** implementados y listos
✓ **60+ locators** definidos en 6 Page Resources
✓ **40+ keywords** implementados
✓ **Reutilización** de código maximizada

---

## 🎓 RECURSOS ADICIONALES

- **CLAUDE.md**: Documentación técnica completa
- **README.md**: Guía de inicio rápido
- **ESTRUCTURA.txt**: Arquitectura visual del proyecto
- [Robot Framework Docs](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [SeleniumLibrary Docs](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html)

---

## 📝 NOTAS IMPORTANTES

⚠️ **Los locators son EJEMPLOS.** Debes inspeccionarlos en la aplicación real y actualizarlos.

⚠️ **Las URLs son FICTICIAS.** Actualiza en `resources/config.resource`.

⚠️ **Las credenciales son PLACEHOLDER.** Configura credenciales reales de QA/UAT.

⚠️ **TC039 requiere implementación de API.** El keyword simula la llamada API.

✅ **El proyecto está listo para ser adaptado** con locators e integración real.

---

## 🏆 PROYECTO COMPLETADO

```
✓ 5 Test Cases implementados
✓ 6 Page Resources creados
✓ 40+ Keywords en español
✓ 60+ Locators definidos
✓ Documentación completa
✓ Script de ejecución
✓ Patrón POM aplicado
✓ Estándares Telcel seguidos
```

---

**Generado con Claude Code**
**Tag:** `PruebaGeneradaIA`
**Fecha:** 2026-04-18
**Workspace:** `/tmp/telcel-master_chat_1776471737465_6pwql6gbn3u`

═══════════════════════════════════════════════════════════════
