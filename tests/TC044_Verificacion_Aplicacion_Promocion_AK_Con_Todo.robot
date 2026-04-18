*** Settings ***
Documentation    Caso de prueba ID 44: Verificación de aplicación de promoción AK con Todo
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Aplicación de promociones en Amigo Paguitos
...              Escenario: Verificar que el sistema aplique correctamente la promoción AK con Todo
...              durante la activación de línea celular sobre equipo vendido en el esquema de
...              Amigo Paguitos
...
...              Precondiciones:
...              - Promoción AK con Todo configurada y vigente
...              - Usuario autenticado en Amigo Paguitos
...              - BES operativo e integrado con Amigo Paguitos
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo vendido
${IMEI_EQUIPO}                      567890123456789
${MARCA_EQUIPO}                     Realme
${MODELO_EQUIPO}                    GT Neo 5

# Promoción vigente
${PROMOCION_AK_CON_TODO}            AK con Todo

# Datos del cliente
${NOMBRE_CLIENTE}                   Patricia Daniela Morales Castillo
${NUMERO_TELEFONICO}                5534567890

*** Test Cases ***
Verificar Aplicación De Promoción AK Con Todo
    [Documentation]    Este caso de prueba verifica que el sistema aplique correctamente la
    ...                promoción AK con Todo durante la activación de línea celular sobre equipo
    ...                vendido en el esquema de Amigo Paguitos, validando que los beneficios se
    ...                reflejan correctamente y BES almacena y gestiona la promoción durante
    ...                la vida del financiamiento.
    ...
    ...                Pasos:
    ...                1. Consultar las promociones vigentes de tipo AK con Todo en el sistema
    ...                2. Realizar venta de equipo y activación de línea aplicando promoción AK con Todo
    ...                3. Verificar que los beneficios de la promoción se reflejan correctamente
    ...                4. Confirmar en BES que la promoción se registró y se administra durante la vida del financiamiento
    ...
    ...                Verificaciones:
    ...                - Sistema muestra las promociones AK con Todo activas y sus condiciones
    ...                - Sistema permite seleccionar y aplicar la promoción AK con Todo
    ...                - Términos del financiamiento y activación incluyen todos los beneficios de la promoción
    ...                - BES almacena y gestiona correctamente la promoción AK con Todo asociada al crédito del cliente
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    Promociones    Low

    # GIVEN: Usuario ha iniciado sesión en BES
    Dado que el usuario ha iniciado sesión en BES

    # WHEN: Consulta las promociones vigentes de tipo AK con Todo en el sistema
    Cuando consulta las promociones vigentes de tipo AK con Todo en el sistema

    # THEN: Sistema muestra las promociones AK con Todo activas y sus condiciones
    Entonces el sistema muestra las promociones AK con Todo activas y condiciones

    # WHEN: Realiza venta de equipo y activación de línea aplicando la promoción AK con Todo
    Cuando realiza venta de equipo y activación de línea con promoción
    ...    ${IMEI_EQUIPO}
    ...    ${MARCA_EQUIPO}
    ...    ${MODELO_EQUIPO}
    ...    ${PROMOCION_AK_CON_TODO}
    ...    ${NOMBRE_CLIENTE}

    # THEN: Sistema permite seleccionar y aplicar la promoción AK con Todo
    Entonces el sistema permite seleccionar y aplicar la promoción
    ...    ${PROMOCION_AK_CON_TODO}

    # THEN: Los beneficios de la promoción AK con Todo se reflejan correctamente
    Y los términos del financiamiento incluyen beneficios de la promoción
    ...    ${PROMOCION_AK_CON_TODO}

    # WHEN: Accede a BES para confirmar almacenamiento de la promoción
    Cuando accede a BES para confirmar registro de la promoción
    ...    ${NUMERO_TELEFONICO}

    # THEN: BES registra la promoción asociada al crédito del cliente
    Entonces BES almacena la promoción asociada al crédito del cliente
    ...    ${PROMOCION_AK_CON_TODO}

    # THEN: BES gestiona la promoción durante la vida del financiamiento
    Y BES gestiona correctamente la promoción durante la vida del financiamiento
    ...    ${PROMOCION_AK_CON_TODO}

    [Teardown]    Entonces cerrar la sesión del navegador
