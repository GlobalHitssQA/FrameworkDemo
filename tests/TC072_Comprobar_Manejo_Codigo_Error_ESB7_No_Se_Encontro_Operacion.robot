*** Settings ***
Documentation    Caso de prueba: Comprobar manejo de código de error ESB7 no se encontró operación
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el comportamiento cuando se invoca una operación que no existe
...              en el servicio configurado
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Servicio PACPagosService desplegado con operación ConsultarPaguitos definida
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Test Cases ***
Comprobar Manejo De Código De Error ESB7 No Se Encontró Operación
    [Documentation]    Este caso de prueba verifica que el sistema maneja correctamente el código
    ...                de error ESB7 cuando se invoca una operación que no existe en el servicio
    ...                configurado, y que retorna un mensaje apropiado sin ejecutar procesamiento
    ...                de negocio.
    ...
    ...                Pasos:
    ...                1. Preparar una solicitud SOAP con nombre de operación inexistente o incorrecto
    ...                2. Enviar la solicitud al endpoint del servicio PACPagosService
    ...                3. Intentar localizar la operación solicitada en la definición del servicio
    ...                4. Verificar que se retorna el código de error ESB7
    ...                5. Confirmar que no se ejecuta ningún procesamiento de negocio
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Casos_Error    ESB7

    # STEP 1: Preparar una solicitud SOAP con nombre de operación inexistente o incorrecto
    Cuando se prepara una solicitud SOAP con operación inexistente

    # STEP 2: Enviar la solicitud al endpoint del servicio PACPagosService
    Y se envía la solicitud al endpoint del servicio PACPagosService

    # STEP 3: Intentar localizar la operación solicitada en la definición del servicio
    Entonces el sistema no encuentra la operación especificada

    # STEP 4: Verificar que se retorna el código de error ESB7
    Y retorna el código de error ESB7 con mensaje No se encontró la operación

    # STEP 5: Confirmar que no se ejecuta ningún procesamiento de negocio
    Y confirma que no se ejecuta ningún procesamiento de negocio
