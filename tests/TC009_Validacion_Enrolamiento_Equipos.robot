*** Settings ***
Documentation    Caso de prueba: Validación del enrolamiento de equipos en el sistema
...              Proceso: Venta
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Enrolamiento de Equipos
...              Escenario: Verificar que el sistema ejecute correctamente la etapa de
...              Enrolamiento de Equipos en el flujo de venta después de aceptar la oferta
...              de financiamiento
...
...              Precondiciones:
...              - Oferta de financiamiento aceptada
...              - Equipo disponible para venta
...              - Servicios de validación de IMEI activos
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo
${IMEI_EQUIPO}                123456789012345
${NUMERO_TELEFONICO}          5512345678

*** Test Cases ***
Validación Del Enrolamiento De Equipos En El Sistema
    [Documentation]    Este caso de prueba verifica que el sistema ejecute correctamente
    ...                la etapa de Enrolamiento de Equipos en el flujo de venta después de
    ...                aceptar la oferta de financiamiento, validando que el sistema valide
    ...                y registre el IMEI del equipo, asocie el equipo con el financiamiento
    ...                y el número telefónico, y registre el equipo enrolado permitiendo
    ...                avanzar al pago de enganche.
    ...
    ...                Pasos:
    ...                1. Completar la etapa de Oferta con aceptación del cliente
    ...                2. Ingresar el IMEI del equipo a financiar
    ...                3. Asociar el equipo con el financiamiento y el número telefónico
    ...                4. Completar el proceso de enrolamiento
    [Tags]    PruebaGeneradaIA

    # Precondición: Oferta de financiamiento aceptada
    Dado que la oferta de financiamiento fue aceptada

    # Step 1: Completar la etapa de Oferta con aceptación del cliente
    Cuando el sistema avanza a la etapa de Enrolamiento de Equipos

    Entonces la oferta aceptada permite enrolar equipo

    # Step 2: Ingresar el IMEI del equipo a financiar
    Cuando ingreso el IMEI del equipo a financiar    ${IMEI_EQUIPO}

    Entonces el sistema valida y registra el IMEI del equipo

    # Step 3: Asociar el equipo con el financiamiento y el número telefónico
    Cuando asocio el equipo con el financiamiento y el número telefónico    ${NUMERO_TELEFONICO}

    Entonces el sistema crea la relación entre equipo crédito y línea telefónica

    # Step 4: Completar el proceso de enrolamiento
    Cuando completo el proceso de enrolamiento

    Entonces el sistema registra el equipo enrolado y permite avanzar al pago de enganche

    [Teardown]    Entonces cerrar la sesión del navegador
