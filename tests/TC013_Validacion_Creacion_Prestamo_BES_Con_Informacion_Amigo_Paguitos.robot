*** Settings ***
Documentation    Caso de prueba: Validación de creación de préstamo en BES con información de Amigo Paguitos
...              Proceso: Administración de crédito
...              Aplicación: BES
...              Funcionalidad: Creación de préstamo
...              Escenario: Verificar que BES crea correctamente el préstamo almacenando la
...              información del usuario y del crédito provista por Amigo Paguitos
...
...              Precondiciones:
...              - AP.AG ha enviado información válida del préstamo
...              - APIs de BES disponibles
...              - Base de datos de BES operativa
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Préstamo
${NUMERO_TELEFONICO}             5512345678

*** Test Cases ***
Validación De Creación De Préstamo En BES Con Información De Amigo Paguitos
    [Documentation]    Este caso de prueba verifica que BES crea correctamente el préstamo
    ...                almacenando la información del usuario y del crédito provista por Amigo
    ...                Paguitos. Valida que BES reciba la petición con la información completa del
    ...                préstamo desde AP.AG, procese la información utilizando las APIs
    ...                CustomerManagementService, BCService y ArService, almacene los datos del
    ...                usuario y del crédito en las entidades correspondientes, permita consultar
    ...                el préstamo recién creado mediante número telefónico o identificador del
    ...                préstamo, devuelva toda la información del préstamo incluyendo serviceNumber,
    ...                subscriberId, accountId, CustID, installmentPlanInstId, totalCycle, totalAmount,
    ...                cycleSequence, initialAmount, status, verifique que el calendario de cobranza
    ...                haya sido creado correctamente con las fechas de vencimiento y montos
    ...                correspondientes según los parámetros del financiamiento, y valide que el
    ...                estado del préstamo sea activo y disponible para administración.
    ...
    ...                Pasos:
    ...                1. Enviar desde AP.AG la información completa del préstamo a las APIs de BES
    ...                2. Ejecutar la creación del préstamo en BES
    ...                3. Consultar el préstamo recién creado en BES
    ...                4. Verificar que el calendario de cobranza fue creado correctamente
    ...                5. Validar que el estado del préstamo sea activo
    [Tags]    PruebaGeneradaIA

    # Step 1: Enviar desde AP.AG la información completa del cliente, préstamo y equipo a las APIs de BES para creación de préstamo
    Cuando envío desde AP AG la información completa del préstamo a las APIs de BES

    # Step 2: Ejecutar la creación del préstamo en BES utilizando las APIs CustomerManagementService, BCService y ArService
    Entonces BES procesa la información y almacena los datos del usuario y del crédito

    # Step 3: Consultar el préstamo recién creado en BES mediante el número telefónico o identificador del préstamo
    Cuando consulto el préstamo recién creado en BES    ${NUMERO_TELEFONICO}

    Entonces BES devuelve toda la información del préstamo incluyendo calendario de cobranza

    # Step 4: Verificar que el calendario de cobranza haya sido creado correctamente en BES con las fechas de vencimiento
    Entonces el calendario de cobranza fue creado correctamente con las fechas de vencimiento

    # Step 5: Validar que el estado del préstamo sea activo y disponible para administración
    Entonces el préstamo aparece con status activo y disponible para administración

    [Teardown]    Entonces cerrar la sesión del navegador
