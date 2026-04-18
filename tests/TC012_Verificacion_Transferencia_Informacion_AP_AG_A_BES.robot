*** Settings ***
Documentation    Caso de prueba: Verificación de transferencia de información desde AP.AG hacia BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración AP.AG - BES
...              Escenario: Verificar la transferencia correcta de información del préstamo
...              desde Amigo Paguitos Autogestión hacia BES mediante interfaces para la creación
...              del nuevo préstamo
...
...              Precondiciones:
...              - AP.AG configurado correctamente
...              - APIs de BES disponibles
...              - Usuario autenticado en AP.AG
...              - Conexión entre AP.AG y BES establecida
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Test Cases ***
Verificación De Transferencia De Información Desde AP AG Hacia BES
    [Documentation]    Este caso de prueba verifica la transferencia correcta de información
    ...                del préstamo desde Amigo Paguitos Autogestión hacia BES mediante interfaces
    ...                para la creación del nuevo préstamo. Valida que AP.AG confirme la
    ...                formalización exitosa de la venta, transfiera la información del préstamo
    ...                hacia BES mediante las APIs definidas, BES reciba la petición con toda la
    ...                información necesaria (información del cliente, del préstamo, del equipo),
    ...                valide que BES haya recibido correctamente todos los campos obligatorios
    ...                (serviceNumber, subscriberId, accountId, CustID, IMEI, installmentPlanInstId,
    ...                totalCycle, totalAmount), y verifique que BES cree el préstamo exitosamente
    ...                devolviendo un código de confirmación con el identificador del préstamo creado.
    ...
    ...                Pasos:
    ...                1. Formalizar una venta y financiamiento desde AP.AG con datos completos
    ...                2. Transferir la información del préstamo desde AP.AG hacia BES mediante APIs
    ...                3. Validar que BES haya recibido correctamente todos los campos obligatorios
    ...                4. Verificar la creación del préstamo en BES con la información transferida
    [Tags]    PruebaGeneradaIA

    # Step 1: Formalizar una venta y financiamiento desde AP.AG con datos completos del cliente y equipo
    Cuando formalizo una venta y financiamiento desde AP AG con datos completos

    Entonces AP AG confirma la formalización exitosa de la venta

    # Step 2: Transferir la información del préstamo desde AP.AG hacia BES mediante las APIs definidas
    Cuando transfiero la información del préstamo desde AP AG hacia BES mediante las APIs definidas

    Entonces BES recibe la petición con toda la información necesaria para la creación del préstamo

    # Step 3: Validar que BES haya recibido correctamente todos los campos obligatorios para la creación del préstamo
    Cuando valido que BES haya recibido correctamente todos los campos obligatorios

    # Step 4: Verificar la creación del préstamo en BES con la información transferida desde AP.AG
    Entonces BES crea el préstamo exitosamente y devuelve un código de confirmación

    [Teardown]    Entonces cerrar la sesión del navegador
