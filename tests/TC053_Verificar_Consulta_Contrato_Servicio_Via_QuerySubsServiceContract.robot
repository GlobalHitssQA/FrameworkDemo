*** Settings ***
Documentation    Caso de prueba: Verificar consulta de contrato de servicio vía QuerySubsServiceContract
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Consulta de Contratos de Servicio
...              Escenario: Verificar la consulta del contrato de servicio del suscriptor cuando se
...              invoca QuerySubsServiceContract desde la plataforma de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Suscriptor con contrato de servicio activo en BES
...              - Conexión a servicios backend disponible
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico de suscriptor con contrato activo
${NUMERO_TELEFONICO_SUSCRIPTOR}    5512345678

*** Test Cases ***
Verificar Consulta De Contrato De Servicio Via QuerySubsServiceContract
    [Documentation]    Este caso de prueba valida la consulta del contrato de servicio del suscriptor
    ...                cuando se invoca el servicio QuerySubsServiceContract desde la plataforma de
    ...                Amigo Paguitos hacia BES.
    ...
    ...                Flujo de prueba:
    ...                1. Invocar el servicio QuerySubsServiceContract con el número telefónico del suscriptor
    ...                2. Validar que el ESB recibe la petición y la envía a BES para consulta
    ...                3. Verificar que BES consulta el contrato de servicio asociado al suscriptor
    ...                4. Verificar que la respuesta contiene los datos del contrato de servicio
    ...                5. Confirmar que los datos del contrato se devuelven correctamente al consumidor
    ...
    ...                Campos validados del contrato de servicio:
    ...                - serviceNumber: Número telefónico del suscriptor
    ...                - subscriberId: Identificador único del suscriptor
    ...                - contractType: Tipo de contrato de servicio
    ...                - effectiveDate: Fecha de inicio de vigencia
    ...                - expirationDate: Fecha de fin de vigencia
    ...                - contractedServices: Servicios contratados
    ...                - termsAndConditions: Términos y condiciones del contrato
    ...                - contractStatus: Estado actual del contrato
    [Tags]    PruebaGeneradaIA    Funcional    AdministracionCredito    BES    API

    # GIVEN: Se tiene un suscriptor con contrato de servicio activo en BES
    Dado que se tiene un suscriptor con contrato de servicio activo en BES

    # WHEN: Se invoca el servicio QuerySubsServiceContract con el número telefónico del suscriptor
    Cuando se invoca el servicio QuerySubsServiceContract con el número telefónico del suscriptor
    ...    ${NUMERO_TELEFONICO_SUSCRIPTOR}

    # THEN: El ESB recibe la petición y la envía a BES para consulta
    Entonces el ESB recibe la petición y la envía a BES para consulta

    # AND: BES consulta el contrato de servicio asociado al suscriptor
    Y BES consulta el contrato de servicio asociado al suscriptor

    # AND: La respuesta contiene los datos del contrato de servicio
    Entonces la respuesta contiene los datos del contrato de servicio

    # AND: Los datos del contrato se devuelven correctamente al consumidor
    Y los datos del contrato se devuelven correctamente al consumidor
