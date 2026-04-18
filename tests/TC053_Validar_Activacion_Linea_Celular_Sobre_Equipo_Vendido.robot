*** Settings ***
Documentation    Caso de prueba: Validar activación de línea celular sobre equipo vendido
...              Proceso: Activación
...              Aplicación: BES
...              Funcionalidad: Activación de línea celular
...              Escenario: Verificar la activación de una línea celular prepagado sobre un equipo
...              vendido mediante el esquema de Amigo Paguitos en BES
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Equipo vendido mediante Amigo Paguitos con IMEI registrado
...              - Financiamiento activo del equipo
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo vendido
${IMEI_EQUIPO}             987654321098765
${MARCA_EQUIPO}            Samsung
${MODELO_EQUIPO}           Galaxy A54 5G

# Datos de prueba - Cliente
${NOMBRE_CLIENTE}          María Elena Rodríguez López
${CURP_CLIENTE}            ROLM920815MDFPPR04
${RFC_CLIENTE}             ROLM920815ABC
${DOMICILIO_CLIENTE}       Av. Insurgentes Sur 1234, Col. Del Valle, CDMX

*** Test Cases ***
Validar Activación De Línea Celular Sobre Equipo Vendido
    [Documentation]    Este caso de prueba verifica la activación de una línea celular
    ...                prepagado sobre un equipo que fue vendido mediante el esquema de
    ...                financiamiento Amigo Paguitos, validando que el sistema asocia
    ...                correctamente la línea al IMEI del equipo.
    ...
    ...                Pasos:
    ...                1. Acceder al módulo de activación de líneas en BES
    ...                2. Ingresar el IMEI del equipo vendido mediante Amigo Paguitos
    ...                3. Seleccionar el tipo de línea prepagado a activar
    ...                4. Ingresar los datos del cliente para la activación
    ...                5. Ejecutar el proceso de activación de la línea celular
    ...                6. Verificar el estado de la línea activada
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de activación de líneas

    Cuando ingresa el IMEI del equipo vendido mediante Amigo Paguitos    ${IMEI_EQUIPO}

    Entonces el sistema valida el IMEI y recupera la información del equipo y su financiamiento

    Cuando selecciona el tipo de línea prepagado a activar

    Entonces el sistema muestra las opciones de activación para prepagado

    Cuando ingresa los datos del cliente para la activación
    ...    ${NOMBRE_CLIENTE}
    ...    ${CURP_CLIENTE}
    ...    ${RFC_CLIENTE}
    ...    ${DOMICILIO_CLIENTE}

    Entonces el sistema valida los datos del cliente asociado al financiamiento

    Cuando ejecuta el proceso de activación de la línea celular

    Entonces el sistema activa la línea celular y la asocia al equipo vendido

    Y verifica que la línea está en estado activo vinculada al IMEI del equipo    ${IMEI_EQUIPO}

    [Teardown]    Entonces cerrar la sesión del navegador
