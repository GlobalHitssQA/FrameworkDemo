*** Settings ***
Documentation    Caso de prueba: Verificar error ESB11 con ClientId incorrecto según ambiente BUS
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Validación de ClientId
...              Escenario: Verificar que el ESB valida el ClientId y rechaza peticiones cuando no
...              corresponde al ambiente del BUS configurado
...
...              Precondiciones:
...              - ClientId configurado para ambiente diferente al ESB
...              - Usuario autenticado
...              - Validación de ClientId habilitada en ESB
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para consulta
${NUMERO_TELEFONICO_VALIDO}    5512345678

# ClientId incorrecto que no corresponde al ambiente del BUS configurado
${CLIENT_ID_INCORRECTO}        CLIENT_ID_PRODUCCION_EN_AMBIENTE_QA

*** Test Cases ***
Verificar Error ESB11 Con ClientId Incorrecto Según Ambiente BUS
    [Documentation]    Este caso de prueba verifica que el ESB valida el ClientId y rechaza peticiones
    ...                cuando no corresponde al ambiente del BUS configurado (pruebas, QA, producción).
    ...
    ...                Flujo de validación:
    ...                1. Preparar una petición con un valor de ClientId que no corresponde al ambiente del BUS configurado
    ...                2. Enviar la petición desde el consumidor al servicio AmigoPaguitosPagosService
    ...                3. Ejecutar la validación de ClientId en el ESB verificando su correspondencia con el ambiente configurado
    ...                4. Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por ClientId incorrecto
    ...                5. Validar que el consumidor debe garantizar el envío de ClientId correcto según el ambiente que desea usar
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionClientId    IntegracionServicios

    # STEP 1: Preparar una petición con un valor de ClientId que no corresponde al ambiente del BUS configurado
    Dado que se prepara una petición con un ClientId que no corresponde al ambiente del BUS configurado
    ...    ${CLIENT_ID_INCORRECTO}

    # STEP 2: Enviar la petición desde el consumidor al servicio AmigoPaguitosPagosService
    Cuando se envía la petición desde el consumidor al servicio AmigoPaguitosPagosService con ClientId incorrecto
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 (validación): El ESB recibe la petición con el ClientId incorrecto
    Entonces el ESB recibe la petición con el ClientId incorrecto

    # STEP 3: Ejecutar la validación de ClientId en el ESB verificando su correspondencia con el ambiente configurado
    Cuando se ejecuta la validación de ClientId en el ESB verificando su correspondencia con el ambiente configurado

    # STEP 3 (validación): El ESB detecta que el ClientId no corresponde al ambiente de pruebas, QA o producción configurado
    Entonces el ESB detecta que el ClientId no corresponde al ambiente de pruebas QA o producción configurado

    # STEP 4: Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por ClientId incorrecto
    Y el ESB devuelve error ESB11 con mensaje específico de ClientId no válido para el ambiente

    # STEP 5: Validar que el consumidor debe garantizar el envío de ClientId correcto según el ambiente que desea usar
    Entonces el mensaje de error orienta al consumidor sobre la necesidad de verificar el ClientId según el ambiente objetivo
