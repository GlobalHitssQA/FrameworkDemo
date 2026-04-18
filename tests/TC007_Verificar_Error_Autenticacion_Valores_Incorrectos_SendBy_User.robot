*** Settings ***
Documentation    Caso de prueba: Verificar error de autenticación con valores incorrectos de sendBy y user
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Autenticación de peticiones
...              Escenario: Verificar que el ESB rechaza peticiones cuando los valores de sendBy y user
...              en el encabezado no corresponden al ambiente configurado
...
...              Precondiciones:
...              - Usuario autenticado con credenciales incorrectas
...              - Servicio BES disponible
...              - Validación de autenticación habilitada en ESB
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para consulta
${NUMERO_TELEFONICO_VALIDO}    5512345678

# Valores incorrectos de autenticación para ambiente de pruebas
${SENDBY_INCORRECTO}           PROD_SENDER
${USER_INCORRECTO}             prod_user_123

*** Test Cases ***
Verificar Error De Autenticación Con Valores Incorrectos De SendBy Y User
    [Documentation]    Este caso de prueba verifica que el ESB rechaza peticiones cuando los valores
    ...                de sendBy y user en el encabezado HTTP no corresponden al ambiente configurado.
    ...
    ...                Flujo de validación:
    ...                1. Preparar una petición con valores incorrectos en los parámetros sendBy y user del encabezado HTTP
    ...                2. Enviar la petición al servicio AmigoPaguitosPagosService desde Amigo Paguitos
    ...                3. Ejecutar la validación de autenticación en el ESB verificando los valores de sendBy y user
    ...                4. Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por autenticación incorrecta
    ...                5. Validar que el error incluye información sobre qué parámetros tienen valores incorrectos
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    Autenticacion    IntegracionServicios

    # STEP 1: Preparar una petición con valores incorrectos en los parámetros sendBy y user del encabezado HTTP
    Dado que se prepara una petición con valores incorrectos en sendBy y user del encabezado HTTP
    ...    ${SENDBY_INCORRECTO}    ${USER_INCORRECTO}

    # STEP 2: Enviar la petición al servicio AmigoPaguitosPagosService desde Amigo Paguitos
    Cuando se envía la petición al servicio AmigoPaguitosPagosService desde Amigo Paguitos
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 (validación): El ESB recibe la petición con los valores incorrectos en el encabezado
    Entonces el ESB recibe la petición con los valores incorrectos en el encabezado

    # STEP 3: Ejecutar la validación de autenticación en el ESB verificando los valores de sendBy y user
    Cuando el ESB ejecuta la validación de autenticación verificando los valores de sendBy y user

    # STEP 3 (validación): El ESB detecta que los valores no corresponden al ambiente configurado
    Entonces el ESB detecta que los valores no corresponden al ambiente configurado de pruebas QA o producción

    # STEP 4: Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por autenticación incorrecta
    Y el ESB devuelve el código de error ESB11 indicando falta de privilegios por autenticación incorrecta

    # STEP 5: Validar que el error incluye información sobre qué parámetros tienen valores incorrectos
    Entonces el mensaje de error especifica si sendBy user o ambos tienen valores no válidos
