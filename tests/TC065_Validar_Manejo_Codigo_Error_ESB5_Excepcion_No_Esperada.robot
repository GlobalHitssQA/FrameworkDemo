*** Settings ***
Documentation    Caso de prueba: Validar manejo de código de error ESB5 excepción no esperada
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el comportamiento cuando ocurre una excepción no controlada
...              en el BUS o en los proveedores involucrados
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Capa de Integración configurada
...              - Servicios BES disponibles
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para provocar excepción no esperada
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Manejo De Código De Error ESB5 Excepción No Esperada
    [Documentation]    Este caso de prueba verifica el comportamiento cuando ocurre una
    ...                excepción no controlada en el BUS o en los proveedores.
    ...
    ...                Flujo de validación:
    ...                1. Preparar solicitud válida para el servicio
    ...                2. Configurar condición que genere excepción no esperada
    ...                3. Enviar solicitud al servicio a través de Capa de Integración
    ...                4. Provocar ejecución de condición de excepción no esperada
    ...                5. Verificar que el sistema captura la excepción y retorna código ESB5
    ...                6. Confirmar que se registra información para troubleshooting
    [Tags]    PruebaGeneradaIA    CasosDeError    CapaIntegracion    ExcepcionNoEsperada

    # STEP 1: Preparar solicitud válida para el servicio PACPagosService.Consulta
    Cuando se prepara una solicitud válida para el servicio PACPagosService Consulta
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2, 3 y 4: Configurar condición que genere excepción, enviar solicitud y provocar excepción
    Y se configura una condición que genera excepción no esperada en el flujo

    # STEP 5: Verificar que el sistema captura la excepción y retorna código ESB5
    Entonces el sistema captura la excepción y retorna código ESB5

    # STEP 6: Confirmar que se registra información de la excepción para análisis posterior
    Y confirma que se registra información de la excepción para análisis posterior
