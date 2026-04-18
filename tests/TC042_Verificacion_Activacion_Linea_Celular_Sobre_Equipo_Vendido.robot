*** Settings ***
Documentation    Caso de prueba ID 42: Verificación de activación de línea celular sobre equipo vendido
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Activación de línea celular en Amigo Paguitos
...              Escenario: Verificar la activación de una línea celular sobre el equipo vendido
...              en el esquema de Amigo Paguitos respetando las promociones vigentes
...              AK ASL y AK con Todo
...
...              Precondiciones:
...              - Equipo vendido a través de Amigo Paguitos
...              - Promociones AK ASL y AK con Todo vigentes
...              - Usuario autenticado
...              - Integración con sistemas de activación operativa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo vendido
${IMEI_EQUIPO}                      345678901234567
${MARCA_EQUIPO}                     Xiaomi
${MODELO_EQUIPO}                    Redmi Note 12 Pro

# Datos del cliente
${NOMBRE_CLIENTE}                   Laura Patricia Hernández Díaz
${CURP_CLIENTE}                     HEDL910725MDFRZR02
${RFC_CLIENTE}                      HEDL910725ABC
${DOMICILIO_CLIENTE}                Av. Universidad 1000, Col. Santa Cruz, Puebla

# Promociones vigentes
${PROMOCION_AK_ASL}                 AK ASL
${PROMOCION_AK_CON_TODO}            AK con Todo

*** Test Cases ***
Verificar Activación De Línea Celular Sobre Equipo Vendido
    [Documentation]    Este caso de prueba verifica la activación de una línea celular sobre
    ...                el equipo vendido en el esquema de Amigo Paguitos respetando las
    ...                promociones vigentes AK ASL y AK con Todo, validando que BES gestiona
    ...                correctamente el financiamiento con la línea activada.
    ...
    ...                Pasos:
    ...                1. Completar venta de equipo a través de Amigo Paguitos
    ...                2. Solicitar activación de línea con promoción AK ASL
    ...                3. Verificar aplicación correcta de promoción AK ASL
    ...                4. Alternativamente solicitar activación con promoción AK con Todo
    ...                5. Confirmar que BES administra correctamente la vida del financiamiento
    ...
    ...                Verificaciones:
    ...                - Sistema registra venta del equipo exitosamente
    ...                - Sistema permite activación y aplica promoción AK ASL correctamente
    ...                - Promoción AK ASL se respeta según condiciones vigentes
    ...                - Sistema permite activación con promoción AK con Todo
    ...                - BES gestiona financiamiento y línea activada de manera integrada
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    Activacion    Medium

    # GIVEN: Venta de equipo completada a través de Amigo Paguitos
    Dado que se ha completado la venta de un equipo a través de Amigo Paguitos
    ...    ${IMEI_EQUIPO}
    ...    ${MARCA_EQUIPO}
    ...    ${MODELO_EQUIPO}

    # THEN: Sistema registra la venta del equipo exitosamente
    Entonces el sistema registra la venta del equipo exitosamente

    # WHEN: Solicita activación de línea celular con promoción AK ASL
    Cuando solicita la activación de línea celular aplicando la promoción
    ...    ${PROMOCION_AK_ASL}
    ...    ${NOMBRE_CLIENTE}
    ...    ${CURP_CLIENTE}
    ...    ${RFC_CLIENTE}
    ...    ${DOMICILIO_CLIENTE}

    # THEN: Sistema permite activación y aplica correctamente la promoción AK ASL
    Entonces el sistema permite la activación y aplica la promoción correctamente
    ...    ${PROMOCION_AK_ASL}

    # THEN: Promoción AK ASL se respeta según las condiciones vigentes
    Y la promoción se aplica con todos sus beneficios según condiciones vigentes
    ...    ${PROMOCION_AK_ASL}

    # WHEN: Alternativamente solicita activación con promoción AK con Todo
    Cuando solicita activación alternativa con promoción
    ...    ${PROMOCION_AK_CON_TODO}

    # THEN: Sistema permite activación y aplica correctamente la promoción AK con Todo
    Entonces el sistema permite activación con la promoción alternativa
    ...    ${PROMOCION_AK_CON_TODO}

    # THEN: BES administra correctamente la vida del financiamiento con la línea activada
    Y BES administra correctamente el financiamiento con línea activada

    [Teardown]    Entonces cerrar la sesión del navegador
