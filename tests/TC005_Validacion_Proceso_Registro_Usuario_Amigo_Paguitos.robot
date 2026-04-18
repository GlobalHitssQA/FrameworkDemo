*** Settings ***
Documentation    Caso de prueba: Validación del proceso de registro de usuario en Amigo Paguitos
...              Proceso: Venta
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Registro de Usuario
...              Escenario: Verificar que el flujo de venta ejecute correctamente la etapa de
...              Registro de Usuario desde la plataforma de Amigo Paguitos Autogestión
...
...              Precondiciones:
...              - Plataforma Amigo Paguitos Autogestión disponible
...              - Conexión a servicios backend activa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Usuario
${NOMBRE_USUARIO}              Juan Carlos
${APELLIDO_PATERNO}            Rodríguez
${APELLIDO_MATERNO}            Martínez
${CURP_USUARIO}                ROMJ850315HDFRNN09
${RFC_USUARIO}                 ROMJ850315ABC
${TELEFONO_CONTACTO}           5512345678
${EMAIL_USUARIO}               jrodriguez@email.com
${DOMICILIO_USUARIO}           Calle Reforma 123
${CIUDAD_USUARIO}              Ciudad de México
${ESTADO_USUARIO}              CDMX
${CODIGO_POSTAL}               06600

*** Test Cases ***
Validación Del Proceso De Registro De Usuario En Amigo Paguitos
    [Documentation]    Este caso de prueba verifica que el flujo de venta ejecute
    ...                correctamente la etapa de Registro de Usuario desde la plataforma
    ...                de Amigo Paguitos Autogestión (AP.AG), validando que el sistema
    ...                presente la etapa como primer paso, acepte y valide los datos del
    ...                usuario, y almacene la información permitiendo avanzar a la siguiente
    ...                etapa del flujo.
    ...
    ...                Pasos:
    ...                1. Acceder a la plataforma Amigo Paguitos Autogestión (AP.AG)
    ...                2. Iniciar el flujo de venta de equipo con financiamiento
    ...                3. Ingresar los datos del usuario: nombre, apellidos, CURP, RFC, datos de contacto
    ...                4. Completar el registro de usuario
    [Tags]    PruebaGeneradaIA

    # Step 1: Acceder a la plataforma Amigo Paguitos Autogestión (AP.AG)
    Dado que la plataforma Amigo Paguitos Autogestión está disponible

    Cuando el sistema muestra la pantalla de inicio del proceso de venta

    # Step 2: Iniciar el flujo de venta de equipo con financiamiento
    Cuando inicio el flujo de venta de equipo con financiamiento

    Entonces el sistema presenta la etapa de Registro de Usuario como primer paso

    # Step 3: Ingresar los datos del usuario: nombre, apellidos, CURP, RFC, datos de contacto
    Cuando ingreso los datos del usuario para registro
    ...    ${NOMBRE_USUARIO}
    ...    ${APELLIDO_PATERNO}
    ...    ${APELLIDO_MATERNO}
    ...    ${CURP_USUARIO}
    ...    ${RFC_USUARIO}
    ...    ${TELEFONO_CONTACTO}
    ...    ${EMAIL_USUARIO}
    ...    ${DOMICILIO_USUARIO}
    ...    ${CIUDAD_USUARIO}
    ...    ${ESTADO_USUARIO}
    ...    ${CODIGO_POSTAL}

    Entonces el sistema valida y acepta los datos del usuario ingresados

    # Step 4: Completar el registro de usuario
    Cuando completo el registro de usuario

    Entonces el sistema almacena la información del usuario y permite avanzar a la siguiente etapa

    [Teardown]    Entonces cerrar la sesión del navegador
