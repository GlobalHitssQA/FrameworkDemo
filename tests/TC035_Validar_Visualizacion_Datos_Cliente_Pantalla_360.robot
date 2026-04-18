*** Settings ***
Documentation    Caso de prueba ID 35: Validar visualización de datos del cliente en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Datos del cliente
...              Escenario: Verificar la correcta visualización de los datos personales del cliente
...              en la pantalla 360 cuando se consulta un crédito Amigo Paguitos
...
...              Precondiciones:
...              - Cliente registrado en BES con crédito Amigo Paguitos
...              - Usuario autenticado en pantalla 360
...              - Servicio CustomerManagement disponible
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Validar Visualización De Datos Del Cliente En Pantalla 360
    [Documentation]    Este caso de prueba verifica la correcta visualización de los datos
    ...                personales del cliente en la pantalla 360 cuando se consulta un crédito
    ...                Amigo Paguitos, incluyendo nombres completos, CURP, RFC y datos de región.
    ...
    ...                Pasos:
    ...                1. Desde la pantalla 360 de BES, consultar un cliente con número telefónico asociado a crédito Amigo Paguitos
    ...                2. Verificar que se muestren los nombres del cliente (firstName, middleName, lastName)
    ...                3. Verificar que se muestren los datos fiscales CURP y RFC del cliente
    ...                4. Verificar que se muestren los datos de región (RegionID y regionName)
    ...                5. Validar que la información mostrada coincida con los datos almacenados en BES
    ...
    ...                Verificaciones:
    ...                - Sistema invoca CustomerManagement Service.GetCustomerbasicinfo de BES
    ...                - Pantalla 360 despliega nombres completos del cliente
    ...                - Se visualizan campos CURP y RFC con valores correspondientes
    ...                - Pantalla muestra identificador y nombre de región asociada al cliente
    ...                - Datos del cliente corresponden con información registrada en BES
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Consulta un cliente con número telefónico asociado a crédito Amigo Paguitos en pantalla 360
    Cuando consulta un cliente con número telefónico asociado a crédito Amigo Paguitos en pantalla 360
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema invoca el servicio CustomerManagement Service.GetCustomerbasicinfo de BES
    Entonces el sistema invoca el servicio CustomerManagement Service GetCustomerbasicinfo de BES

    # WHEN: Verifica que se muestren los nombres del cliente (firstName, middleName, lastName)
    Cuando verifica que se muestren los nombres del cliente firstName middleName lastName

    # THEN: La pantalla 360 despliega correctamente los nombres completos del cliente
    Entonces la pantalla 360 despliega correctamente los nombres completos del cliente

    # WHEN: Verifica que se muestren los datos fiscales CURP y RFC del cliente
    Cuando verifica que se muestren los datos fiscales CURP y RFC del cliente

    # THEN: Se visualizan los campos CURP y RFC con los valores correspondientes
    Entonces se visualizan los campos CURP y RFC con los valores correspondientes

    # WHEN: Verifica que se muestren los datos de región (RegionID y regionName)
    Cuando verifica que se muestren los datos de región RegionID y regionName

    # THEN: La pantalla muestra el identificador y nombre de la región asociada al cliente
    Entonces la pantalla muestra el identificador y nombre de la región asociada al cliente

    # WHEN: Valida que la información mostrada coincida con los datos almacenados en BES
    Cuando valida que la información mostrada coincida con los datos almacenados en BES

    # THEN: Todos los datos del cliente corresponden con la información registrada en el sistema BES
    Entonces todos los datos del cliente corresponden con la información registrada en el sistema BES

    [Teardown]    Y cierra la sesión de la pantalla 360
