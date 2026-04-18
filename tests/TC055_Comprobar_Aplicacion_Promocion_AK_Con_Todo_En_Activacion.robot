*** Settings ***
Documentation    Caso de prueba: Comprobar aplicación de promoción AK con Todo en activación
...              Proceso: Activación
...              Aplicación: BES
...              Funcionalidad: Aplicación de promociones en activación
...              Escenario: Verificar que el sistema BES aplique correctamente la promoción
...              AK con Todo durante la activación de una línea celular sobre equipo vendido
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Equipo vendido elegible para promoción AK con Todo
...              - Promoción AK con Todo vigente en el sistema
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo elegible para promoción
${IMEI_EQUIPO}             912345678901234
${MARCA_EQUIPO}            Apple
${MODELO_EQUIPO}           iPhone 15 Pro

# Datos de prueba - Cliente
${NOMBRE_CLIENTE}          Ana Patricia González Hernández
${CURP_CLIENTE}            GOHA940622MDFLRN01
${RFC_CLIENTE}             GOHA940622ABC
${DOMICILIO_CLIENTE}       Blvd. Manuel Ávila Camacho 2300, Col. Lomas de Chapultepec, CDMX

*** Test Cases ***
Comprobar Aplicación De Promoción AK Con Todo En Activación
    [Documentation]    Este caso de prueba verifica que el sistema BES aplique correctamente
    ...                la promoción AK con Todo durante la activación de una línea celular sobre
    ...                un equipo vendido, validando que se muestran los términos y beneficios,
    ...                se aplican correctamente y se registran en el sistema.
    ...
    ...                Pasos:
    ...                1. Iniciar proceso de activación de línea celular en BES
    ...                2. Ingresar el IMEI del equipo elegible para promoción AK con Todo
    ...                3. Seleccionar la promoción AK con Todo disponible
    ...                4. Confirmar la aplicación de la promoción AK con Todo
    ...                5. Completar el proceso de activación con la promoción aplicada
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de activación de líneas

    Cuando ingresa el IMEI del equipo vendido mediante Amigo Paguitos    ${IMEI_EQUIPO}

    Entonces el sistema valida el IMEI y recupera la información del equipo y su financiamiento

    Cuando el sistema detecta elegibilidad para promoción AK Con Todo

    Cuando selecciona la promoción AK Con Todo disponible

    Entonces el sistema muestra los términos y beneficios de la promoción AK Con Todo

    Cuando confirma la aplicación de la promoción AK Con Todo

    Entonces el sistema aplica los beneficios de la promoción AK Con Todo a la activación

    Cuando completa el proceso de activación con la promoción aplicada

    Entonces el sistema activa la línea con la promoción AK Con Todo y registra los beneficios otorgados

    [Teardown]    Entonces cerrar la sesión del navegador
