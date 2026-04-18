# Proyecto de Automatización Telcel - Amigo Paguitos

Proyecto de automatización de pruebas para funcionalidades de **Amigo Paguitos** en BES/CRM usando Robot Framework con SeleniumLibrary y patrón Page Object Model.

## Casos de Prueba Automatizados

| ID | Título | Complejidad | Tags |
|----|--------|-------------|------|
| TC032 | Validación de oferta primaria exclusiva Amigo Paguitos | Medium | Ofertas, Funcional |
| TC033 | Alta de oferta suplementaria Telcel Up | Medium | ServiciosAdicionales, TelcelUp |
| TC038 | Restricciones de trámites postactivación | Medium | Tramites, Restricciones |
| TC039 | Cambio de ciclo de facturación a 99 | Medium | Facturacion, API |
| TC067 | No se permite cambio de oferta primaria | Low | Ofertas, Restricciones |

## Estructura del Proyecto

```
telcel-master/
├── CLAUDE.md                 # Documentación completa del proyecto
├── README.md                 # Este archivo
├── tests/                    # Test Cases
│   ├── TC_032_Validacion_Oferta_Primaria_Amigo_Paguitos.robot
│   ├── TC_033_Alta_Oferta_Suplementaria_Telcel_Up.robot
│   ├── TC_038_Restricciones_Tramites_Postactivacion.robot
│   ├── TC_039_Cambio_Ciclo_Facturacion_99.robot
│   └── TC_067_Validar_No_Cambio_Oferta_Primaria.robot
├── pages/                    # Page Resources (POM)
│   ├── LoginPage.resource
│   ├── OfertasPage.resource
│   ├── ClientePage.resource
│   ├── TramitesPage.resource
│   ├── FacturacionPage.resource
│   └── SuscriptorPage.resource
├── resources/                # Keywords y configuración
│   ├── keywords.resource
│   └── config.resource
└── reports/                  # Reportes de ejecución
```

## Requisitos Previos

### Instalación de Dependencias

```bash
# Instalar Python 3.8+
sudo apt-get update
sudo apt-get install python3 python3-pip

# Instalar Robot Framework y librerías
pip3 install robotframework
pip3 install robotframework-seleniumlibrary

# Instalar ChromeDriver (para Chrome)
sudo apt-get install chromium-chromedriver

# O instalar GeckoDriver (para Firefox)
# wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz
# tar -xvzf geckodriver-v0.30.0-linux64.tar.gz
# sudo mv geckodriver /usr/local/bin/
```

## Ejecución de Pruebas

### Ejecutar un test específico
```bash
robot -d reports tests/TC_032_Validacion_Oferta_Primaria_Amigo_Paguitos.robot
```

### Ejecutar tests con tag específico
```bash
# Ejecutar todos los tests generados por IA
robot -d reports -i PruebaGeneradaIA tests/

# Ejecutar solo tests de ofertas
robot -d reports -i Ofertas tests/

# Ejecutar solo tests de complejidad media
robot -d reports -i Medium tests/
```

### Ejecutar todos los tests
```bash
robot -d reports tests/
```

### Ejecutar con diferentes navegadores
```bash
# Chrome (por defecto)
robot -d reports -v BROWSER:chrome tests/

# Firefox
robot -d reports -v BROWSER:firefox tests/

# Headless Chrome
robot -d reports -v BROWSER:headlesschrome tests/
```

## Configuración

### Actualizar URLs y Credenciales

Editar el archivo `resources/config.resource`:

```robot
*** Variables ***
${URL_BASE}               https://bes-qa.telcel.com
${USUARIO_TEST}           tu_usuario
${PASSWORD_TEST}          tu_password
```

### Actualizar Datos de Prueba

Editar datos de prueba en `resources/config.resource`:

```robot
${CLIENTE_AMIGO_PAGUITOS}         5512345678
${SUSCRIPTOR_AMIGO_PAGUITOS}      5512345678
${CUENTA_AMIGO_PAGUITOS}          ACC123456
```

## Reportes

Después de ejecutar las pruebas, los reportes se generan en el directorio `reports/`:

- **log.html**: Log detallado de la ejecución
- **report.html**: Reporte resumido con estadísticas
- **output.xml**: Salida en formato XML para integración CI/CD

### Abrir reportes
```bash
# En Linux
xdg-open reports/report.html

# En Mac
open reports/report.html

# En Windows
start reports/report.html
```

## Reglas de Desarrollo

### Page Object Model (POM)

1. **Page Resources son "Append-Only"**
   - NUNCA eliminar ni modificar locators existentes
   - Agregar nuevos locators al final del archivo

2. **Prioridad de Locators**
   - 1º: `id`
   - 2º: `name`
   - 3º: CSS semántico
   - 4º: XPath (último recurso)

3. **Separación de Responsabilidades**
   - Test Cases: Lógica de negocio (NO locators)
   - Keywords: Acciones reutilizables (NO locators)
   - Page Resources: Locators y keywords de página

### Estándares de Código

- Keywords en español
- Usar patrón Given/When/Then
- Tag obligatorio: `PruebaGeneradaIA`
- 1 Test Case por archivo .robot
- Esperas explícitas siempre

## Integración CI/CD

### Ejemplo para Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'robot -d reports tests/'
            }
        }
    }
    post {
        always {
            robot outputPath: 'reports',
                  logFileName: 'log.html',
                  outputFileName: 'output.xml',
                  reportFileName: 'report.html'
        }
    }
}
```

### Ejemplo para GitLab CI

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
    reports:
      junit: reports/output.xml
```

## Soporte

Para más información, consultar:
- [Documentación completa](./CLAUDE.md)
- [Robot Framework User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [SeleniumLibrary Documentation](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html)

## Generado con Claude Code

Este proyecto fue generado con Claude Code siguiendo las mejores prácticas de Robot Framework y Page Object Model.

Tag: `PruebaGeneradaIA`
