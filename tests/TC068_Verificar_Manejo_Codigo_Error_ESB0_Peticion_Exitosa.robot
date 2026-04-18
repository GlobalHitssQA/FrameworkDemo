*** Settings ***
Documentation    Caso de prueba: Verificar manejo de código de error ESB0 petición exitosa
...              Proceso: Integración
...              Aplicación: ESB - Capa de Integración
...              Funcionalidad: Manejo de códigos de respuesta
...              Escenario: Verificar que la Capa de Integración maneje correctamente el código
...              de respuesta ESB0 indicando una petición exitosa entre los sistemas involucrados
...
...              Precondiciones:
...              - Servicios de integración entre Amigo Paguitos y BES operativos
...              - Capa de Integración configurada y disponible
...              - Catálogo de errores ESB definido
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para petición exitosa
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Verificar Manejo De Código De Error ESB0 Petición Exitosa
    [Documentation]    Este caso de prueba verifica que la Capa de Integración maneje
    ...                correctamente el código de respuesta ESB0 cuando se ejecuta una
    ...                petición exitosa entre Amigo Paguitos y BES.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar petición válida desde Amigo Paguitos hacia BES
    ...                2. Verificar que Capa de Integración recibe y procesa correctamente
    ...                3. Validar que la mediación entre sistemas se ejecuta sin errores
    ...                4. Verificar que retorna código ESB0
    ...                5. Confirmar que el mensaje indica que request y response fueron ejecutados correctamente
    ...                6. Verificar que sistema consumidor procesa la respuesta exitosa
    [Tags]    PruebaGeneradaIA    Funcional    CapaIntegracion    CodigosRespuesta    ESB0

    # STEP 1: Ejecutar petición válida desde Amigo Paguitos hacia BES
    Cuando se ejecuta una petición válida desde Amigo Paguitos hacia BES a través de Capa de Integración
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2: Verificar que Capa de Integración recibe y procesa la petición correctamente
    Entonces Capa de Integración recibe y procesa la petición correctamente

    # STEP 3: Verificar que la mediación entre sistemas se ejecuta sin errores
    Y la mediación entre sistemas se ejecuta sin errores

    # STEP 4: Verificar que Capa de Integración retorna el código ESB0
    Entonces Capa de Integración retorna el código ESB0 indicando petición exitosa

    # STEP 5: El sistema incluye el mensaje indicando que las peticiones request y response fueron ejecutadas correctamente
    # Esta verificación está incluida en el keyword anterior que valida el mensaje asociado al código ESB0

    # STEP 6: Confirmar que la acción a seguir dependa del código de éxito devuelto
    Y el sistema consumidor procesa la respuesta exitosa y continúa con el flujo correspondiente
