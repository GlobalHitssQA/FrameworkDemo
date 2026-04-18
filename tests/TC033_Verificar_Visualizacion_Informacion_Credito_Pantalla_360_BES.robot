*** Settings ***
Documentation    Caso de prueba ID 33: Verificar visualización de información de crédito en pantalla 360 de BES
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Información de crédito
...              Escenario: Verificar la correcta visualización de la información del crédito Amigo Paguitos
...              en la pantalla 360 de BES cuando se consulta un cliente
...
...              Precondiciones:
...              - Usuario autenticado en pantalla 360 de BES
...              - Cliente con crédito Amigo Paguitos registrado
...              - APIs de BES operativas
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito Amigo Paguitos activo
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificar Visualización De Información De Crédito En Pantalla 360 De BES
    [Documentation]    Este caso de prueba verifica que al consultar un cliente con crédito
    ...                Amigo Paguitos activo en la pantalla 360 de BES, el sistema consulta
    ...                las APIs necesarias y muestra correctamente toda la información del
    ...                crédito incluyendo installmentPlanInstId, tipo de financiamiento,
    ...                estatus del subsidio, total de ciclos y monto total del crédito.
    ...
    ...                Pasos:
    ...                1. Acceder a la pantalla 360 de BES con credenciales válidas
    ...                2. Ingresar el número telefónico de un cliente con crédito Amigo Paguitos activo
    ...                3. Verificar que el sistema ejecuta la consulta hacia las APIs de BES
    ...                4. Verificar que se muestre el identificador del plan de financiamiento (installmentPlanInstId)
    ...                5. Verificar que se muestre el tipo de financiamiento y estatus del subsidio
    ...                6. Verificar que se muestren el total de ciclos y monto total del crédito
    ...
    ...                Verificaciones:
    ...                - Usuario autenticado correctamente en pantalla 360 de BES
    ...                - Sistema ejecuta consulta hacia APIs de BES al ingresar número telefónico
    ...                - Pantalla 360 muestra el installmentPlanInstId asociado al crédito
    ...                - Se visualizan los campos type, installmentStatus y subsidyStatus del crédito
    ...                - La pantalla muestra totalCycle y totalAmount correspondientes al financiamiento
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Ingresa el número telefónico de un cliente con crédito Amigo Paguitos activo
    Cuando ingresa el número telefónico de un cliente con crédito Amigo Paguitos activo en la pantalla 360
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema ejecuta la consulta hacia las APIs de BES para recuperar información del crédito
    Entonces el sistema ejecuta la consulta hacia las APIs de BES para recuperar información del crédito

    # AND: La pantalla 360 muestra el installmentPlanInstId asociado al crédito
    Y la pantalla 360 muestra el installmentPlanInstId asociado al crédito

    # AND: Se visualizan los campos type, installmentStatus y subsidyStatus del crédito
    Entonces se visualizan los campos type installmentStatus y subsidyStatus del crédito

    # AND: La pantalla muestra totalCycle y totalAmount correspondientes al financiamiento
    Y la pantalla muestra totalCycle y totalAmount correspondientes al financiamiento

    [Teardown]    Y cierra la sesión de la pantalla 360
