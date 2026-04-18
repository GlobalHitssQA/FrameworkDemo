*** Settings ***
Documentation    Caso de prueba: Comprobar manejo de código de error ESB1 esquema no válido
...              Proceso: Administración de Crédito
...              Aplicación: BES - Amigo Paguitos
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar el manejo de errores de validación de esquema cuando el
...              mensaje de entrada contiene datos con formato incorrecto
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Capa de Integración configurada y disponible
...              - Servicio PACPagosService desplegado
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Test Cases ***
Comprobar Manejo De Código De Error ESB1 Esquema No Válido
    [Documentation]    Este caso de prueba verifica el manejo de errores cuando se envía
    ...                un mensaje con esquema no válido al servicio PACPagosService.Consulta.
    ...
    ...                Flujo de validación:
    ...                1. Preparar mensaje SOAP con campo de tipo de dato incorrecto
    ...                2. Enviar solicitud malformada al servicio
    ...                3. Verificar que Capa de Integración valida el esquema
    ...                4. Verificar que retorna código de error ESB1
    ...                5. Confirmar que no se realiza procesamiento adicional ni invocación a BES
    [Tags]    PruebaGeneradaIA    CasosDeError    CapaIntegracion    ValidacionEsquema    ESB1

    # STEP 1: Preparar mensaje de solicitud SOAP con campo de tipo de dato incorrecto
    Cuando se prepara un mensaje de solicitud SOAP con campo de tipo de dato incorrecto

    # STEP 2: Enviar solicitud malformada al servicio PACPagosService.Consulta
    Y se envía la solicitud malformada al servicio PACPagosService Consulta

    # STEP 3: Validar el esquema del mensaje de entrada en Capa de Integración
    Entonces Capa de Integración detecta que el esquema no es válido

    # STEP 4: Verificar que se retorna el código de error ESB1
    Y retorna el código de error ESB1 con mensaje Esquema NO valido mensaje de entrada

    # STEP 5: Confirmar que no se realiza procesamiento adicional ni invocación a BES
    Y confirma que no se realiza procesamiento adicional ni invocación a BES
