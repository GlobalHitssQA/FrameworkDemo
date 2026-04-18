*** Settings ***
Documentation    Caso de prueba: Validar error ESB11 con Token inválido en request
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Validación de token de seguridad
...              Escenario: Verificar que el ESB rechaza peticiones cuando el Token de autenticación
...              en el request es inválido o no corresponde al ambiente
...
...              Precondiciones:
...              - Token de autenticación inválido o expirado
...              - Servicio BES disponible
...              - Validación de Token habilitada en ESB
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para consulta
${NUMERO_TELEFONICO_VALIDO}    5512345678

# Token inválido o expirado que no corresponde al ambiente
${TOKEN_INVALIDO}              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID_TOKEN_EXPIRED_OR_WRONG_ENVIRONMENT

# ID de transacción para consulta de logs
${TRANSACTION_ID}              TXN_ESB11_TOKEN_INVALIDO_001

*** Test Cases ***
Validar Error ESB11 Con Token Inválido En Request
    [Documentation]    Este caso de prueba verifica que el ESB rechaza peticiones cuando el Token
    ...                de autenticación en el request es inválido, expirado o no corresponde al
    ...                ambiente del ESB (pruebas, QA, producción).
    ...
    ...                Flujo de validación:
    ...                1. Preparar una petición con un Token de autenticación inválido, expirado o que no corresponde al ambiente del ESB
    ...                2. Enviar la petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService incluyendo el Token inválido
    ...                3. Ejecutar la validación de Token en el ESB verificando su validez y correspondencia con el ambiente
    ...                4. Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por Token inválido
    ...                5. Revisar el log de seguridad para validar que se registró el intento de acceso con Token inválido
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionToken    SeguridadToken

    # STEP 1: Preparar una petición con un Token de autenticación inválido, expirado o que no corresponde al ambiente del ESB
    Dado que se prepara una petición con un Token de autenticación inválido expirado o que no corresponde al ambiente del ESB
    ...    ${TOKEN_INVALIDO}

    # STEP 2: Enviar la petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService incluyendo el Token inválido
    Cuando se envía la petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService incluyendo el Token inválido
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 (validación): El ESB recibe la petición con el Token inválido
    Entonces el ESB recibe la petición con el Token inválido

    # STEP 3: Ejecutar la validación de Token en el ESB verificando su validez y correspondencia con el ambiente
    Cuando se ejecuta la validación de Token en el ESB verificando su validez y correspondencia con el ambiente

    # STEP 3 (validación): El ESB detecta que el Token es inválido, expirado o no corresponde al ambiente
    Entonces el ESB detecta que el Token es inválido expirado o no corresponde al ambiente de pruebas QA o producción

    # STEP 4: Verificar que el ESB devuelve el código de error ESB11 indicando falta de privilegios por Token inválido
    Y el ESB devuelve error ESB11 con descripción específica de Token inválido

    # STEP 5: Revisar el log de seguridad para validar que se registró el intento de acceso con Token inválido
    Cuando se revisa el log de seguridad para validar que se registró el intento de acceso con Token inválido
    ...    ${TRANSACTION_ID}

    # STEP 5 (validación): El log de seguridad registra el intento fallido con timestamp, Token usado y origen de la petición
    Entonces el log de seguridad registra el intento fallido con timestamp Token usado y origen de la petición
