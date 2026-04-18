*** Settings ***
Documentation    Caso de prueba: Verificar creación de comentarios de suscriptor vía CreateComments
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Gestión de comentarios de suscriptor
...              Escenario: Verificar la creación de comentarios asociados a un suscriptor cuando se
...              registra una interacción o evento relacionado con el suscriptor
...
...              Precondiciones:
...              - Usuario autenticado con permisos de creación de comentarios
...              - Suscriptor existente en el sistema
...              - Servicio CreateComments disponible
...              - Conexión a BES activa
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Suscriptor y comentario
${SUBSCRIBER_ID_PRUEBA}           12345678
${TIPO_COMENTARIO_PRUEBA}         Interacción Atención al Cliente
${DESCRIPCION_COMENTARIO_PRUEBA}  Cliente solicitó información sobre su saldo disponible y estado de su cuenta prepago
${USUARIO_REGISTRADOR_PRUEBA}     test_admin

*** Test Cases ***
Verificar Creación De Comentarios De Suscriptor Via CreateComments
    [Documentation]    Este caso de prueba verifica la creación de comentarios asociados a un suscriptor
    ...                cuando se registra una interacción o evento relacionado mediante el servicio
    ...                CreateComments de BES.
    ...
    ...                Flujo de prueba:
    ...                1. Preparar la información del comentario a crear con subscriberId, tipo, descripción, usuario y fecha
    ...                2. Enviar solicitud de creación mediante el servicio CreateComments
    ...                3. Verificar que BES recibe y valida la estructura de los datos del comentario
    ...                4. Confirmar que BES ejecuta la creación del comentario asociándolo al subscriberId
    ...                5. Validar que BES devuelve confirmación con el commentId generado
    ...                6. Consultar los comentarios del suscriptor
    ...                7. Verificar que el comentario creado aparece en la lista con toda la información registrada
    ...
    ...                Campos validados en el comentario:
    ...                - commentId: Identificador único del comentario generado por BES
    ...                - subscriberId: Identificador del suscriptor al que se asocia el comentario
    ...                - tipoComentario: Tipo o categoría del comentario registrado
    ...                - descripcion: Descripción detallada del comentario o interacción
    ...                - usuario: Usuario que registró el comentario en el sistema
    ...                - fecha: Fecha y hora en que se registró el comentario
    [Tags]    PruebaGeneradaIA    Funcional    Posventa    BES    API

    # GIVEN: Se prepara la información del comentario a crear
    Dado que se prepara la información del comentario a crear para el suscriptor
    ...    ${SUBSCRIBER_ID_PRUEBA}
    ...    ${TIPO_COMENTARIO_PRUEBA}
    ...    ${DESCRIPCION_COMENTARIO_PRUEBA}
    ...    ${USUARIO_REGISTRADOR_PRUEBA}

    # WHEN: Se envía solicitud de creación de comentario mediante el servicio CreateComments
    Cuando se envía solicitud de creación de comentario mediante CreateComments

    # THEN: El sistema BES recibe la petición y valida la estructura de los datos del comentario
    Entonces el sistema BES recibe la petición y valida la estructura de los datos del comentario

    # AND: BES ejecuta la creación del comentario en el sistema asociándolo al subscriberId correspondiente
    Cuando BES ejecuta la creación del comentario asociándolo al subscriberId

    # AND: BES devuelve el response confirmando la creación del comentario con el commentId generado
    Entonces BES devuelve confirmación con el commentId generado

    # WHEN: Se consultan los comentarios del suscriptor para verificar que el nuevo comentario fue registrado
    Cuando se consultan los comentarios del suscriptor para verificar el registro

    # THEN: El comentario creado aparece en la lista de comentarios del suscriptor con toda la información registrada
    Entonces el comentario creado aparece en la lista de comentarios del suscriptor

    # AND: El comentario contiene toda la información registrada correctamente
    Y el comentario contiene toda la información registrada correctamente
