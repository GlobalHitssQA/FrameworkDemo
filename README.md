# Proyecto de Automatización - Telcel
## Robot Framework + SeleniumLibrary + Page Object Model

### Estructura del Proyecto
```
telcel-master/
├── tests/              # Test Cases (.robot)
│   ├── TC001_almacenamiento_datos_usuario_bes.robot
│   └── ejemplo_login.robot
├── resources/          # Keywords transversales
│   └── keywords.resource
├── pages/              # Page Resources (locators + keywords específicos)
│   ├── Login.resource
│   ├── AmigoPaguitos.resource
│   └── BES.resource
├── libraries/          # Librerías Python custom (si son necesarias)
├── CLAUDE.md           # Guía de desarrollo para IA
└── README.md           # Este archivo
```

### Requisitos Previos
- Python 3.x
- Robot Framework
- SeleniumLibrary
- ChromeDriver o GeckoDriver

### Instalación
```bash
pip install robotframework
pip install robotframework-seleniumlibrary
```

### Ejecución de Tests

#### Ejecutar todos los tests
```bash
robot tests/
```

#### Ejecutar un test específico
```bash
robot tests/TC001_almacenamiento_datos_usuario_bes.robot
```

#### Ejecutar tests por tags
```bash
robot --include PruebaGeneradaIA tests/
robot --include Integral tests/
robot --include BES tests/
```

#### Generar reportes en directorio específico
```bash
robot --outputdir results tests/
```

### Casos de Prueba Implementados

#### TC001: Almacenamiento de información del usuario provista por Amigo Paguitos en BES
- **Proceso**: Venta
- **Aplicación**: BES
- **Tipo de prueba**: Integral
- **Complejidad**: Baja
- **Técnica ISTQB**: Casos de uso

**Pasos del test**:
1. Formalizar venta en Amigo Paguitos Autogestión
2. Enviar información de usuario a BES
3. Verificar almacenamiento correcto en BES
4. Consultar información mediante API

### Convenciones de Código

1. **Page Resources (Append-Only)**:
   - NUNCA eliminar locators existentes
   - Crear variables NUEVAS si se necesita un locator diferente

2. **Prioridad de Locators**:
   - 1️⃣ `id`
   - 2️⃣ `name`
   - 3️⃣ CSS semántico
   - 4️⃣ XPath (último recurso)

3. **Separación de Responsabilidades**:
   - **Test Cases**: Solo Given/When/Then
   - **Keywords.resource**: Lógica de negocio
   - **Page Resources**: Interacción UI

4. **Tags Obligatorios**:
   - Todos los tests: `PruebaGeneradaIA`
   - Solo 1 Test Case por archivo

### Datos de Prueba
Los datos de prueba están definidos en `resources/keywords.resource`:
- Usuario: `usuario_test`
- Password: `password_test`
- Cliente de ejemplo: Juan Pérez (ID: ABC123456)

### Notas Importantes
- Los locators en este proyecto son ejemplos genéricos
- Antes de ejecutar en ambiente real, actualizar URLs y selectores según el DOM real
- Verificar conectividad entre Amigo Paguitos y BES
- Asegurar que las APIs de integración estén disponibles
