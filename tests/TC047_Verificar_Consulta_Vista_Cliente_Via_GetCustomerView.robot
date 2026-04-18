*** Settings ***
Documentation    Caso de prueba ID 47: Verificar consulta de vista de cliente vía GetCustomerView
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Vista 360 de cliente
...              Escenario: Verificar la consulta de vista 360 del cliente cuando se solicita una vista
...              consolidada de información de un cliente de Amigo Paguitos desde la pantalla 360 de BES
...
...              Precondiciones:
...              - Usuario autenticado en el sistema con acceso a vista 360
...              - Número telefónico válido de cliente con financiamiento activo
...              - Servicios de BES disponibles
...              - Conexión a BES activa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con financiamiento activo en Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificar Consulta De Vista De Cliente Vía GetCustomerView
    [Documentation]    Este caso de prueba verifica que al solicitar una vista consolidada de
    ...                información de un cliente de Amigo Paguitos desde la pantalla 360 de BES,
    ...                el sistema BES recibe la petición, ejecuta consultas a múltiples servicios
    ...                (CustomerManagementService, TelcelCustomService, BCService, ArService)
    ...                para consolidar la información, genera una vista unificada del cliente y
    ...                devuelve el response con información completa incluyendo datos del cliente,
    ...                financiamiento, saldos, facturas y estado de cuenta.
    ...
    ...                Pasos:
    ...                1. Enviar solicitud de vista de cliente mediante GetCustomerView con número telefónico
    ...                2. BES recibe la petición y procesa la consulta de vista 360
    ...                3. BES ejecuta consultas a múltiples servicios para consolidar información
    ...                4. BES consolida la información de las diferentes fuentes y genera vista unificada
    ...                5. BES devuelve response con vista completa del cliente
    ...                6. Verificar que la vista incluye crédito vigente, parcialidades pendientes, saldo y facturación
    ...
    ...                Verificaciones:
    ...                - BES recibe la petición y procesa la consulta de vista 360
    ...                - Sistema obtiene datos de suscriptor, cuenta, financiamiento, facturación y pagos
    ...                - Sistema integra correctamente toda la información en estructura consolidada
    ...                - Capa de integración recibe vista 360 con información completa y estructurada
    ...                - Vista 360 presenta información completa de la relación del cliente con Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Integral    BES    Vista360    GetCustomerView    Medium

    # GIVEN: Se solicita una vista consolidada de cliente Amigo Paguitos desde pantalla 360 de BES
    Dado que se solicita una vista consolidada de cliente Amigo Paguitos desde pantalla 360 de BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # WHEN: Se envía solicitud de vista de cliente mediante GetCustomerView con número telefónico como parámetro
    Cuando se envía solicitud de vista de cliente mediante el servicio GetCustomerView
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema BES recibe la petición y procesa la consulta de vista 360
    Entonces el sistema BES recibe la petición y procesa la consulta de vista 360

    # AND: BES ejecuta consultas a múltiples servicios para consolidar la información
    Cuando BES ejecuta consultas a múltiples servicios para consolidar la información

    # AND: BES consolida la información de las diferentes fuentes y genera una vista unificada del cliente
    Entonces BES consolida la información de las diferentes fuentes y genera una vista unificada del cliente

    # AND: BES devuelve el response con la vista completa del cliente
    Y BES devuelve el response con la vista completa del cliente

    # AND: La vista 360 incluye información de crédito vigente
    Entonces la vista 360 incluye información de crédito vigente

    # AND: La vista 360 incluye parcialidades pendientes
    Y la vista 360 incluye parcialidades pendientes

    # AND: La vista 360 incluye saldo de cuenta
    Y la vista 360 incluye saldo de cuenta

    # AND: La vista 360 incluye datos de facturación
    Y la vista 360 incluye datos de facturación
