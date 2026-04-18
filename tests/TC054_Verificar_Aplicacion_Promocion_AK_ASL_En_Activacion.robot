*** Settings ***
Documentation    Caso de prueba: Verificar aplicación de promoción AK ASL en activación
...              Proceso: Activación
...              Aplicación: BES
...              Funcionalidad: Aplicación de promociones en activación
...              Escenario: Verificar que el sistema BES aplique correctamente la promoción
...              AK ASL durante la activación de una línea celular sobre equipo vendido
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Equipo vendido elegible para promoción AK ASL
...              - Promoción AK ASL vigente en el sistema
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo elegible para promoción
${IMEI_EQUIPO}             890123456789012
${MARCA_EQUIPO}            Samsung
${MODELO_EQUIPO}           Galaxy S23

# Datos de prueba - Cliente
${NOMBRE_CLIENTE}          Juan Carlos Pérez Martínez
${CURP_CLIENTE}            PEMJ850315HDFRNN08
${RFC_CLIENTE}             PEMJ850315XYZ
${DOMICILIO_CLIENTE}       Calle Reforma 567, Col. Centro, Guadalajara

*** Test Cases ***
Verificar Aplicación De Promoción AK ASL En Activación
    [Documentation]    Este caso de prueba verifica que el sistema BES aplique correctamente
    ...                la promoción AK ASL durante la activación de una línea celular sobre
    ...                un equipo vendido, validando que se muestran los términos y condiciones,
    ...                se aplican los beneficios y se registran correctamente en el sistema.
    ...
    ...                Pasos:
    ...                1. Iniciar proceso de activación de línea celular en BES
    ...                2. Ingresar el IMEI del equipo elegible para promoción AK ASL
    ...                3. Seleccionar la promoción AK ASL disponible
    ...                4. Confirmar la aplicación de la promoción AK ASL
    ...                5. Completar el proceso de activación con la promoción aplicada
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de activación de líneas

    Cuando ingresa el IMEI del equipo vendido mediante Amigo Paguitos    ${IMEI_EQUIPO}

    Entonces el sistema valida el IMEI y recupera la información del equipo y su financiamiento

    Cuando el sistema detecta elegibilidad para promoción AK ASL

    Cuando selecciona la promoción AK ASL disponible

    Entonces el sistema muestra los términos y condiciones de la promoción AK ASL

    Cuando confirma la aplicación de la promoción AK ASL

    Entonces el sistema aplica los beneficios de la promoción AK ASL a la activación

    Cuando completa el proceso de activación con la promoción aplicada

    Entonces el sistema activa la línea con la promoción AK ASL y registra los beneficios otorgados

    [Teardown]    Entonces cerrar la sesión del navegador
