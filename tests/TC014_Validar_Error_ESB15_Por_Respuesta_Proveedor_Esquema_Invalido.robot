*** Settings ***
Documentation    Caso de prueba: Validar error ESB15 por respuesta de proveedor con esquema inválido
...              Proceso: Administración de Crédito
...              Aplicación: BES (Billing and Enterprise System)
...              Funcionalidad: Validación de respuestas de servicios BES
...              Escenario: Verificar que el ESB detecte y maneje correctamente el error ESB15 cuando
...              los servicios proveedores de BES retornen respuestas con esquema inválido o XML mal
...              formado durante la consulta de información de Amigo Paguitos
...
...              Precondiciones:
...              - Servicio PACPagosService desplegado y configurado
...              - Validación de esquemas habilitada en el ESB
...              - Servicios de BES disponibles pero con capacidad de retornar respuestas inválidas
...              - Usuario autenticado con permisos
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido del consumidor
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Error ESB15 Por Respuesta De Proveedor Con Esquema Inválido
    [Documentation]    Este caso de prueba verifica que el ESB detecta y reporta correctamente
    ...                el error ESB15 cuando los servicios proveedores de BES retornan respuestas
    ...                con esquema inválido o XML mal formado durante la consulta de información
    ...                de Amigo Paguitos.
    ...
    ...                Flujo de validación:
    ...                1. Configurar servicios BES para retornar respuestas con estructura inválida
    ...                2. Ejecutar petición válida desde el consumidor hacia PACPagosService
    ...                3. ESB invoca servicios BES y recibe respuesta con esquema inválido
    ...                4. ESB detecta inconsistencias en el RESPONSE del proveedor
    ...                5. Sistema genera código de error ESB15 indicando problema en esquema de respuesta
    ...                6. Validar que el mensaje indica levantar incidente a TI para análisis
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionEsquema    RespuestaProveedor

    # STEP 1: Configurar servicios de BES (CustomerManagement Service, TelcelCustomService,
    # BCService o ArService) para retornar respuestas con XML mal formado o con valores
    # que no corresponden al esquema esperado
    Dado que servicios de BES están configurados para retornar respuestas con estructura inválida

    # STEP 2: Ejecutar una petición válida desde el consumidor hacia el servicio
    # PACPagosService con número telefónico correcto
    Cuando se ejecuta petición válida desde consumidor hacia PACPagosService con número telefónico correcto
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 3: Permitir que el ESB invoque los servicios de BES y reciba la respuesta
    # con esquema inválido
    Entonces el ESB recibe la petición correctamente formateada y la procesa invocando servicios de BES

    # STEP 3 (continuación): BES retorna un RESPONSE que no cumple con la especificación
    # (XML mal formado, elementos faltantes o valores que no corresponden sintácticamente)
    Y BES retorna RESPONSE que no cumple con la especificación con XML mal formado o elementos faltantes

    # STEP 4: Validar que el mecanismo de validación del ESB detecte las inconsistencias
    # en el RESPONSE del proveedor
    Entonces el mecanismo de validación del ESB detecta inconsistencias en el RESPONSE del proveedor

    # STEP 5: Verificar que el sistema genere el código de error ESB15 con la descripción
    # 'Esquema NO valido: respuesta de proveedor Éxito, estado final'
    Y el sistema genera el código de error ESB15 con descripción de esquema no válido en respuesta de proveedor

    # STEP 6: Validar que el mensaje de error indique que se debe levantar incidente a TI
    # para realizar análisis e identificar el origen de la falla en el proveedor
    Entonces el mensaje de error indica levantar incidente a TI para análisis del problema en BES

    # Validar que no se realiza reintento automático
    Y valida que no se aplica reintento automático para error de validación ESB15
