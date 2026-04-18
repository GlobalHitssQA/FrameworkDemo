*** Settings ***
Documentation    Caso de prueba ID 28: Comprobar respuesta con datos personales del cliente desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que BES retorna correctamente los datos personales del cliente
...              incluyendo nombre completo, CURP, RFC y región al consultar información básica del cliente
...
...              Precondiciones:
...              - Cliente registrado en BES con datos personales completos y validados
...              - Número telefónico asociado al cliente activo
...              - CURP y RFC válidos registrados
...              - Servicio CustomerManagement operativo
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con información completa
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Comprobar Respuesta Con Datos Personales Del Cliente Desde BES
    [Documentation]    Este caso de prueba verifica que la API CustomerManagement Service
    ...                GetCustomerbasicinfo de BES devuelve todos los datos personales del cliente
    ...                incluyendo nombre completo (Firstname, middleName, lastName), CURP, RFC
    ...                y región (RegionID, regionName) con formato válido.
    ...
    ...                Pasos:
    ...                1. Ejecutar la consulta CustomerManagement Service.GetCustomerbasicinfo con número telefónico válido
    ...                2. Verificar que BES procesa la consulta y genera respuesta con datos del cliente
    ...                3. Verificar que la respuesta incluye los campos Firstname, middleName y lastName
    ...                4. Verificar que la respuesta incluye el campo CURP con 18 caracteres alfanuméricos
    ...                5. Verificar que la respuesta incluye el campo RFC con 12 o 13 caracteres alfanuméricos
    ...                6. Verificar que la respuesta incluye los campos RegionID y regionName
    ...                7. Validar que todos los campos obligatorios están presentes y cumplen con el formato esperado
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Venta    IntegracionBES    Medium

    # WHEN: Se ejecuta la consulta CustomerManagement Service.GetCustomerbasicinfo con número telefónico válido
    Cuando se ejecuta la consulta CustomerManagement Service GetCustomerbasicinfo con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: BES procesa la consulta y genera respuesta con datos del cliente
    Entonces BES procesa la consulta y genera respuesta con datos del cliente

    # AND: La respuesta incluye los campos Firstname, middleName y lastName con el nombre completo del cliente
    Y la respuesta incluye los campos Firstname middleName y lastName con el nombre completo del cliente

    # AND: La respuesta incluye el campo CURP con la Clave Única de Registro de Población
    Y la respuesta incluye el campo CURP con la Clave Única de Registro de Población

    # AND: La respuesta incluye el campo RFC con el Registro Federal de Contribuyentes
    Y la respuesta incluye el campo RFC con el Registro Federal de Contribuyentes

    # AND: La respuesta incluye los campos RegionID y regionName con la información de región
    Y la respuesta incluye los campos RegionID y regionName con la información de región

    # THEN: Validar que todos los campos obligatorios están presentes y cumplen con el formato esperado
    Entonces todos los campos obligatorios están presentes y cumplen con el formato esperado
