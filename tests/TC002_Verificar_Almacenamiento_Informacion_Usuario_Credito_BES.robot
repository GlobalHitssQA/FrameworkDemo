*** Settings ***
Documentation    Caso de prueba: Verificar almacenamiento de información del usuario y crédito en BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Almacenamiento de información de crédito
...              Escenario: Verificar que BES almacena correctamente la información del usuario
...              y del crédito provista por Amigo Paguitos cuando se crea un nuevo préstamo
...
...              Precondiciones:
...              - Venta completada desde Amigo Paguitos
...              - APIs de BES para creación de préstamo disponibles
...              - Información completa del usuario, crédito y equipo generada
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Usuario
${TELEFONO_PRUEBA}        5512345678
${NOMBRE_USUARIO}         Juan Pérez García
${CURP_USUARIO}           PEGJ850315HDFRNN09
${RFC_USUARIO}            PEGJ850315ABC
${REGION_USUARIO}         Ciudad de México

# Datos de prueba - Crédito
${MONTO_CREDITO}          15000
${CICLO_PAGO}             quincenal
${PLAZO_MESES}            6
${TIPO_FINANCIAMIENTO}    Personal

# Datos de prueba - Equipo
${IMEI_EQUIPO}            123456789012345
${PRODUCTO_EQUIPO}        Samsung Galaxy A54 5G

*** Test Cases ***
Verificar Almacenamiento De Información Del Usuario Y Crédito En BES
    [Documentation]    Este caso de prueba verifica que BES almacena correctamente
    ...                toda la información del usuario, crédito y equipo que es
    ...                enviada desde Amigo Paguitos al crear un nuevo préstamo.
    ...
    ...                Pasos:
    ...                1. Enviar información completa del usuario desde Amigo Paguitos
    ...                2. Enviar información del crédito desde Amigo Paguitos
    ...                3. Enviar información del equipo desde Amigo Paguitos
    ...                4. Consultar el préstamo en BES usando el número telefónico
    ...                5. Verificar que toda la información se almacenó correctamente
    [Tags]    PruebaGeneradaIA

    Dado que se crea un préstamo desde Amigo Paguitos con información completa
    ...    ${TELEFONO_PRUEBA}
    ...    ${NOMBRE_USUARIO}
    ...    ${CURP_USUARIO}
    ...    ${RFC_USUARIO}
    ...    ${REGION_USUARIO}
    ...    ${MONTO_CREDITO}
    ...    ${CICLO_PAGO}
    ...    ${PLAZO_MESES}
    ...    ${TIPO_FINANCIAMIENTO}
    ...    ${IMEI_EQUIPO}
    ...    ${PRODUCTO_EQUIPO}

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de consulta de préstamos

    Cuando busca un préstamo por número telefónico    ${TELEFONO_PRUEBA}

    Entonces el sistema muestra correctamente los datos del usuario
    ...    ${NOMBRE_USUARIO}
    ...    ${CURP_USUARIO}
    ...    ${RFC_USUARIO}
    ...    ${REGION_USUARIO}

    Y el sistema muestra correctamente los datos del crédito
    ...    ${MONTO_CREDITO}
    ...    ${CICLO_PAGO}
    ...    ${PLAZO_MESES}
    ...    ${TIPO_FINANCIAMIENTO}

    Y el sistema muestra correctamente los datos del equipo
    ...    ${IMEI_EQUIPO}
    ...    ${PRODUCTO_EQUIPO}

    [Teardown]    Entonces cerrar la sesión del navegador
