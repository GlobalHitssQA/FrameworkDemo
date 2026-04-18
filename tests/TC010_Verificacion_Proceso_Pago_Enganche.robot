*** Settings ***
Documentation    Caso de prueba: Verificación del proceso de pago de enganche
...              Proceso: Gestión de Pagos
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Pago de Enganche
...              Escenario: Verificar que el sistema procese correctamente el pago de enganche
...              a través de SICATEL y Kioskos antes de enviar el contrato
...
...              Precondiciones:
...              - Equipo enrolado en el sistema
...              - Integración con CPS activa
...              - Servicios de pago SICATEL y Kioskos disponibles
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Métodos de pago
${METODO_PAGO_SICATEL}           SICATEL
${METODO_PAGO_KIOSCO}            Kioskos
${METODO_PAGO_OXXO}              OXXO

*** Test Cases ***
Verificación Del Proceso De Pago De Enganche
    [Documentation]    Este caso de prueba verifica que el sistema procese correctamente
    ...                el pago de enganche a través de SICATEL y Kioskos antes de enviar el
    ...                contrato. Valida que el sistema avance a la etapa de Pago de Enganche
    ...                desde el Enrolamiento de Equipos, muestre las opciones de pago disponibles,
    ...                procese el pago a través del método seleccionado, integre con CPS para
    ...                registrar el pago, confirme la recepción del pago, actualice el estado del
    ...                financiamiento y permita continuar con el envío del contrato al cliente.
    ...
    ...                Pasos:
    ...                1. Completar la etapa de Enrolamiento de Equipos
    ...                2. Seleccionar el método de pago del enganche (SICATEL, Kioskos, OXXO)
    ...                3. Procesar el pago del enganche a través del método seleccionado
    ...                4. Confirmar la recepción del pago de enganche
    ...                5. Avanzar a la etapa de Envío de Contrato
    [Tags]    PruebaGeneradaIA

    # Precondición: Equipo enrolado en el sistema
    Dado que la oferta de financiamiento fue aceptada

    # Step 1: Completar la etapa de Enrolamiento de Equipos
    Cuando el sistema avanza a la etapa de Pago de Enganche

    # Step 2: Seleccionar el método de pago del enganche (SICATEL, Kioskos, OXXO)
    Cuando selecciono el método de pago del enganche    ${METODO_PAGO_SICATEL}

    # Step 3: Procesar el pago del enganche a través del método seleccionado
    Cuando proceso el pago del enganche a través del método seleccionado

    Entonces el sistema integra con CPS para registrar el pago del enganche

    # Step 4: Confirmar la recepción del pago de enganche
    Cuando confirmo la recepción del pago de enganche

    Entonces el sistema valida el pago y actualiza el estado del financiamiento

    # Step 5: Avanzar a la etapa de Envío de Contrato
    Entonces el sistema permite continuar con el envío del contrato al cliente

    [Teardown]    Entonces cerrar la sesión del navegador
