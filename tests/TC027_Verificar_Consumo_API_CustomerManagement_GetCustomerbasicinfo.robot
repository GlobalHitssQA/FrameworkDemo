*** Settings ***
Documentation    Caso de prueba ID 27: Verificar consumo de API CustomerManagement GetCustomerbasicinfo
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que el sistema consume correctamente la API CustomerManagement
...              GetCustomerbasicinfo para obtener los datos personales del cliente desde BES
...
...              Precondiciones:
...              - Cliente registrado en BES con datos personales completos
...              - Número telefónico válido y activo
...              - Servicio CustomerManagement disponible
...              - Usuario autenticado en el sistema
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con información completa
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificar Consumo De API CustomerManagement GetCustomerbasicinfo
    [Documentation]    Este caso de prueba verifica que el sistema consume correctamente
    ...                la API CustomerManagement Service.GetCustomerbasicinfo enviando el
    ...                número telefónico del cliente como parámetro de entrada y que BES
    ...                procesa la solicitud retornando los datos personales del cliente
    ...                sin presentar errores de esquema, timeout o conexión.
    ...
    ...                Pasos:
    ...                1. Obtener el número telefónico del cliente desde la petición de consulta
    ...                2. Invocar la API CustomerManagement Service.GetCustomerbasicinfo
    ...                3. Verificar que BES procesa la solicitud y retorna datos personales
    ...                4. Validar que la transacción no presenta errores ESB0, ESB1, ESB2 o ESB3
    ...
    ...                Verificaciones:
    ...                - El ESB consume la API y envía la petición correctamente a BES
    ...                - BES devuelve los campos Firstname, middleName, lastName, CURP, RFC, RegionID, regionName
    ...                - La respuesta es exitosa con código ESB0 y sin errores
    [Tags]    PruebaGeneradaIA    Integral    BES    API    Venta    IntegracionBES    Low

    # WHEN: Se obtiene el número telefónico y se invoca la API CustomerManagement GetCustomerbasicinfo
    Cuando se ejecuta la consulta CustomerManagement Service GetCustomerbasicinfo con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: BES procesa la solicitud y retorna los datos personales del cliente
    Entonces BES procesa la consulta y genera respuesta con datos del cliente

    # AND: La respuesta incluye todos los campos requeridos (Firstname, middleName, lastName, CURP, RFC, RegionID, regionName)
    Y la respuesta incluye los campos Firstname middleName y lastName con el nombre completo del cliente
    Y la respuesta incluye el campo CURP con la Clave Única de Registro de Población
    Y la respuesta incluye el campo RFC con el Registro Federal de Contribuyentes
    Y la respuesta incluye los campos RegionID y regionName con la información de región

    # THEN: La transacción no presenta errores de esquema, timeout o conexión
    Entonces todos los campos obligatorios están presentes y cumplen con el formato esperado
