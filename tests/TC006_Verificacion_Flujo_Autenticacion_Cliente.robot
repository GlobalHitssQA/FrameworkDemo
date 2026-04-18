*** Settings ***
Documentation    Caso de prueba: Verificación del flujo de autenticación del cliente
...              Proceso: Venta
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Autenticación de Cliente
...              Escenario: Verificar que el sistema ejecute correctamente la etapa de
...              Autenticación del cliente después del registro de usuario en el flujo
...              de venta de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario registrado en el sistema
...              - Etapa de Legales completada
...              - Servicios de autenticación disponibles
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Autenticación
${USUARIO_AUTH}               jrodriguez
${PASSWORD_AUTH}              P@ssw0rd123
${CODIGO_VERIFICACION}        123456

*** Test Cases ***
Verificación Del Flujo De Autenticación Del Cliente
    [Documentation]    Este caso de prueba verifica que el sistema ejecute correctamente
    ...                la etapa de Autenticación del cliente después del registro de usuario
    ...                en el flujo de venta de Amigo Paguitos, validando que el sistema
    ...                acepte las credenciales, autentique al cliente y almacene la información
    ...                de autenticación en la base de datos.
    ...
    ...                Pasos:
    ...                1. Completar la etapa de Legales en el flujo de venta
    ...                2. Ingresar las credenciales de autenticación del cliente
    ...                3. Completar el proceso de autenticación exitosamente
    ...                4. Verificar que la información de autenticación se almacene correctamente
    [Tags]    PruebaGeneradaIA

    # Precondición: Usuario registrado
    Dado que el usuario completó el registro en Amigo Paguitos

    # Step 1: Completar la etapa de Legales en el flujo de venta
    Cuando completo la etapa de Legales en el flujo de venta

    Entonces el sistema avanza a la etapa de Autenticación

    # Step 2: Ingresar las credenciales de autenticación del cliente
    Cuando ingreso las credenciales de autenticación del cliente
    ...    ${USUARIO_AUTH}
    ...    ${PASSWORD_AUTH}
    ...    ${CODIGO_VERIFICACION}

    Entonces el sistema valida las credenciales proporcionadas

    # Step 3: Completar el proceso de autenticación exitosamente
    Entonces el sistema autentica al cliente y permite continuar con la Evaluación crediticia

    # Step 4: Verificar que la información de autenticación se almacene correctamente
    Entonces verifico que la información de autenticación se almacena correctamente

    [Teardown]    Entonces cerrar la sesión del navegador
