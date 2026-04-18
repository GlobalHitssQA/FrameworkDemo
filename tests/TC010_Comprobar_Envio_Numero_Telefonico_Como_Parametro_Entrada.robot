*** Settings ***
Documentation    Caso de prueba: Comprobar envío de número telefónico como parámetro de entrada
...              Proceso: Consulta
...              Aplicación: Capa de Integración
...              Funcionalidad: Validación de parámetros de entrada
...              Escenario: Verificar que el servicio PACPagosService recibe y procesa correctamente
...              el número telefónico como parámetro de entrada desde los diferentes consumidores
...
...              Precondiciones:
...              - Servicio PACPagosService desplegado y operativo
...              - Validación de esquema configurada en Capa de Integración
...              - APIs de BES disponibles para consulta
...
...              Flujo de validación:
...              1. Enviar solicitud con número telefónico válido en formato correcto
...              2. Verificar que Capa de Integración valida formato y propaga a APIs de BES
...              3. Enviar solicitud con número telefónico en formato inválido o vacío
...              4. Verificar que servicio devuelve error ESB1 por esquema inválido
...              5. Consultar con número telefónico que no existe en BES
...              6. Verificar que BES procesa consulta y devuelve respuesta sin información
...
...              Técnica ISTQB: Valores límite
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Números telefónicos
${NUMERO_TELEFONICO_VALIDO}       5512345678
${NUMERO_TELEFONICO_INVALIDO}     ABC123INVALIDO
${NUMERO_TELEFONICO_INEXISTENTE}  9999999999

*** Test Cases ***
Comprobar Envío De Número Telefónico Como Parámetro De Entrada
    [Documentation]    Este caso de prueba verifica que el servicio PACPagosService
    ...                recibe y procesa correctamente el número telefónico como parámetro
    ...                de entrada desde los diferentes consumidores, validando:
    ...
    ...                1. Formato válido: Acepta y propaga a BES
    ...                2. Formato inválido: Retorna error ESB1
    ...                3. Número inexistente: Procesa y devuelve respuesta sin datos
    ...
    ...                Validaciones de formato:
    ...                - Número telefónico válido: 10 dígitos numéricos
    ...                - Número telefónico inválido: Caracteres alfabéticos o formato incorrecto
    ...                - Número telefónico vacío: String vacío o null
    ...
    ...                Verificaciones de integración:
    ...                - Propagación correcta a GetSubscriberinfo, GetAccountInfo,
    ...                  GetSubscriberAndIMEIInfo, QueryBalance y GetCustomerbasicinfo
    [Tags]    PruebaGeneradaIA    CasosDeError    CapaIntegracion    ValidacionParametros    ValoresLimite

    # WHEN: Enviar una solicitud al servicio PACPagosService.Consulta incluyendo un número telefónico válido en el formato correcto
    Cuando se envía una solicitud al servicio PACPagosService Consulta con número telefónico válido
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # THEN: Capa de Integración recibe el parámetro y valida que cumple con el formato esperado (esquema válido)
    Entonces Capa de Integración recibe el parámetro y valida que cumple con el formato esperado

    # AND: Verificar que Capa de Integración utiliza el número telefónico como parámetro para consumir todas las APIs de BES necesarias
    Y Capa de Integración utiliza el número telefónico para consumir todas las APIs de BES necesarias

    # WHEN: Enviar una solicitud con un número telefónico en formato inválido
    Cuando se envía una solicitud con número telefónico en formato inválido
    ...    ${NUMERO_TELEFONICO_INVALIDO}

    # THEN: El servicio devuelve error ESB1 indicando Esquema NO valido mensaje de entrada
    Entonces el servicio devuelve error ESB1 indicando Esquema NO valido mensaje de entrada

    # WHEN: Enviar una solicitud con número telefónico vacío
    Cuando se envía una solicitud con número telefónico vacío

    # THEN: El servicio devuelve error ESB1 indicando Esquema NO valido mensaje de entrada
    Entonces el servicio devuelve error ESB1 indicando Esquema NO valido mensaje de entrada

    # WHEN: Consultar con un número telefónico que no existe en BES
    Cuando se consulta con un número telefónico que no existe en BES
    ...    ${NUMERO_TELEFONICO_INEXISTENTE}

    # THEN: BES procesa la consulta y devuelve una respuesta indicando que no se encontró información para ese número telefónico
    Entonces BES procesa la consulta y devuelve una respuesta indicando que no se encontró información
