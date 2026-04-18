*** Settings ***
Documentation    Caso de prueba ID 43: Validación de respeto a promociones vigentes AK ASL
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Aplicación de promociones en Amigo Paguitos
...              Escenario: Verificar que el sistema respete y aplique correctamente la promoción
...              AK ASL vigente durante la activación de línea celular sobre equipo vendido
...
...              Precondiciones:
...              - Promoción AK ASL configurada y vigente
...              - Usuario autenticado en Amigo Paguitos
...              - BES operativo e integrado
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo vendido
${IMEI_EQUIPO}                      456789012345678
${MARCA_EQUIPO}                     Oppo
${MODELO_EQUIPO}                    Reno 10 Pro

# Promoción vigente
${PROMOCION_AK_ASL}                 AK ASL

# Datos del cliente
${NOMBRE_CLIENTE}                   Carlos Eduardo Ramírez Torres
${NUMERO_TELEFONICO}                5523456789

*** Test Cases ***
Validar Respeto A Promociones Vigentes AK ASL
    [Documentation]    Este caso de prueba verifica que el sistema respete y aplique correctamente
    ...                la promoción AK ASL vigente durante la activación de línea celular sobre
    ...                equipo vendido, validando que los beneficios se reflejan en el financiamiento
    ...                y BES almacena y gestiona correctamente la promoción.
    ...
    ...                Pasos:
    ...                1. Consultar las promociones vigentes de tipo AK ASL en el sistema
    ...                2. Realizar venta de equipo y activación de línea con promoción AK ASL
    ...                3. Verificar beneficios de la promoción en el financiamiento
    ...                4. Confirmar en BES que la promoción se almacenó y gestiona correctamente
    ...
    ...                Verificaciones:
    ...                - Sistema muestra las promociones AK ASL activas y sus condiciones
    ...                - Sistema aplica automáticamente la promoción AK ASL al cumplir condiciones
    ...                - Términos del financiamiento incluyen beneficios de la promoción AK ASL
    ...                - BES registra y gestiona la promoción durante la vida del financiamiento
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    Promociones    Low

    # GIVEN: Usuario ha iniciado sesión en BES
    Dado que el usuario ha iniciado sesión en BES

    # WHEN: Consulta las promociones vigentes de tipo AK ASL en el sistema
    Cuando consulta las promociones vigentes de tipo AK ASL en el sistema

    # THEN: Sistema muestra las promociones AK ASL activas y sus condiciones
    Entonces el sistema muestra las promociones AK ASL activas y condiciones

    # WHEN: Realiza venta de equipo y activación de línea con promoción AK ASL
    Cuando realiza venta de equipo y activación de línea con promoción
    ...    ${IMEI_EQUIPO}
    ...    ${MARCA_EQUIPO}
    ...    ${MODELO_EQUIPO}
    ...    ${PROMOCION_AK_ASL}
    ...    ${NOMBRE_CLIENTE}

    # THEN: Sistema aplica automáticamente la promoción AK ASL al cumplir las condiciones
    Entonces el sistema aplica automáticamente la promoción al cumplir condiciones
    ...    ${PROMOCION_AK_ASL}

    # THEN: Los beneficios de la promoción AK ASL se reflejan en el financiamiento
    Y los beneficios de la promoción se reflejan en el financiamiento
    ...    ${PROMOCION_AK_ASL}

    # WHEN: Accede a BES para confirmar almacenamiento de la promoción
    Cuando accede a BES para confirmar almacenamiento de la promoción
    ...    ${NUMERO_TELEFONICO}

    # THEN: BES registra la promoción AK ASL asociada al crédito
    Entonces BES registra la promoción asociada al crédito del cliente
    ...    ${PROMOCION_AK_ASL}

    # THEN: BES administra la promoción durante la vida del financiamiento
    Y BES administra la promoción durante la vida del financiamiento
    ...    ${PROMOCION_AK_ASL}

    [Teardown]    Entonces cerrar la sesión del navegador
