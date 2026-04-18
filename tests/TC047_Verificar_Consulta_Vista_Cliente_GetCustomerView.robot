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
# Datos de prueba - Cliente con financiamiento activo
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificar Consulta De Vista De Cliente Vía GetCustomerView
    [Documentation]    Este caso de prueba verifica la consulta de vista 360 del cliente cuando se solicita
    ...                una vista consolidada de información de un cliente de Amigo Paguitos desde la pantalla
    ...                360 de BES.
    ...
    ...                Flujo de prueba:
    ...                1. Enviar solicitud de vista de cliente mediante el servicio GetCustomerView
    ...                2. BES recibe la petición y procesa la consulta de vista 360
    ...                3. BES ejecuta consultas a múltiples servicios (CustomerManagementService, TelcelCustomService, BCService, ArService)
    ...                4. BES consolida la información de las diferentes fuentes y genera una vista unificada
    ...                5. BES devuelve el response con la vista completa del cliente
    ...                6. Verificar que la vista incluya información de crédito vigente, parcialidades pendientes, saldo de cuenta y datos de facturación
    ...
    ...                Verificaciones:
    ...                - BES procesa la consulta de vista 360 correctamente
    ...                - BES ejecuta consultas a múltiples servicios de manera orquestada
    ...                - BES consolida información de todas las fuentes
    ...                - Vista 360 incluye datos del cliente, financiamiento, saldos, facturas y estado de cuenta
    ...                - Vista 360 presenta información completa de la relación del cliente con Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Funcional    BES    Vista360    Posventa    API    Medium

    # WHEN: Se envía solicitud de vista de cliente mediante el servicio GetCustomerView con número telefónico como parámetro de entrada
    Cuando se envía solicitud de vista de cliente mediante el servicio GetCustomerView
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema BES recibe la petición y procesa la consulta de vista 360
    Entonces el sistema BES recibe la petición y procesa la consulta de vista 360

    # WHEN: BES ejecuta consultas a múltiples servicios (CustomerManagementService, TelcelCustomService, BCService, ArService) para consolidar la información
    Cuando BES ejecuta consultas a múltiples servicios para consolidar la información

    # THEN: BES consolida la información de las diferentes fuentes y genera una vista unificada del cliente
    Entonces BES consolida la información de las diferentes fuentes y genera una vista unificada del cliente

    # AND: BES devuelve el response con la vista completa incluyendo datos del cliente, financiamiento, saldos, facturas y estado de cuenta
    Y BES devuelve el response con la vista completa del cliente

    # THEN: Verificar que la vista incluya información de crédito vigente, parcialidades pendientes, saldo de cuenta y datos de facturación
    Entonces la vista 360 incluye información de crédito vigente
    Y la vista 360 incluye parcialidades pendientes
    Y la vista 360 incluye saldo de cuenta
    Y la vista 360 incluye datos de facturación
