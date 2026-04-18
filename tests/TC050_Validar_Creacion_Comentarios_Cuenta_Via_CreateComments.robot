*** Settings ***
Documentation    Caso de prueba: Validar creación de comentarios de cuenta vía CreateComments
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Gestión de comentarios de cuenta
...              Escenario: Verificar la creación de comentarios asociados a una cuenta cuando se
...              registra una interacción o evento relacionado con la cuenta del cliente
...
...              Precondiciones:
...              - Usuario autenticado con permisos de creación de comentarios
...              - Cuenta existente en el sistema
...              - Servicio CreateComments disponible
...              - Conexión a BES activa
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cuenta
${ACCOUNT_ID}                     ACC987654321
${TIPO_COMENTARIO}                Interaccion
${DESCRIPCION_COMENTARIO}         Cliente solicita información sobre saldo de cuenta y próximas fechas de facturación
${USUARIO_REGISTRA}               agente_posventa01

*** Test Cases ***
Validar Creación De Comentarios De Cuenta Vía CreateComments
    [Documentation]    Este caso de prueba verifica la creación de comentarios asociados a una cuenta
    ...                cuando se registra una interacción o evento relacionado con la cuenta del cliente.
    ...
    ...                Pasos:
    ...                1. Preparar la información del comentario a crear incluyendo accountId, tipo de
    ...                   comentario, descripción, usuario que registra y fecha
    ...                2. Enviar solicitud de creación de comentario mediante el servicio CreateComments
    ...                   con los datos de la cuenta y el comentario
    ...                3. BES ejecuta la creación del comentario en el sistema asociándolo al accountId
    ...                   correspondiente
    ...                4. BES devuelve el response confirmando la creación del comentario con el commentId
    ...                   generado y timestamp de registro
    ...                5. Consultar los comentarios de la cuenta para verificar que el nuevo comentario
    ...                   fue registrado correctamente con toda la información
    [Tags]    PruebaGeneradaIA

    Dado que se prepara la información del comentario de cuenta incluyendo accountId tipo descripción y usuario
    ...    ${ACCOUNT_ID}
    ...    ${TIPO_COMENTARIO}
    ...    ${DESCRIPCION_COMENTARIO}
    ...    ${USUARIO_REGISTRA}

    Entonces los datos del comentario de cuenta están completos y válidos para la creación

    Cuando envía solicitud de creación de comentario de cuenta mediante CreateComments con datos de la cuenta

    Entonces el sistema BES recibe la petición y valida la estructura de los datos del comentario de cuenta

    Cuando BES ejecuta la creación del comentario asociándolo al accountId correspondiente

    Entonces el sistema registra exitosamente el comentario de cuenta y asigna identificador único al registro

    Cuando BES devuelve el response confirmando la creación del comentario con commentId generado y timestamp

    Entonces la capa de integración recibe la confirmación con el identificador del comentario y fecha de creación

    Cuando consulta los comentarios de la cuenta para verificar que el nuevo comentario fue registrado

    Entonces el comentario creado aparece en la lista de comentarios de la cuenta con los datos completos y correctos
