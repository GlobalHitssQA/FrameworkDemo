*** Settings ***
Documentation    Caso de prueba ID 34: Comprobar visualización de ventas por vendedor en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Ventas por vendedor
...              Escenario: Verificar que la pantalla 360 de BES muestre correctamente la información
...              de ventas realizadas por vendedor en el esquema Amigo Paguitos
...
...              Precondiciones:
...              - Usuario con perfil de administrador o supervisor autenticado
...              - Ventas de Amigo Paguitos registradas en BES
...              - Reportes de ventas configurados
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Consulta de ventas por vendedor
${ID_VENDEDOR}            V001
${FECHA_INICIO}           01/01/2024
${FECHA_FIN}              31/12/2024

*** Test Cases ***
Comprobar Visualización De Ventas Por Vendedor En Pantalla 360
    [Documentation]    Este caso de prueba verifica que la pantalla 360 de BES muestre
    ...                correctamente la información de ventas realizadas por vendedor en el
    ...                esquema Amigo Paguitos, incluyendo datos del cliente, equipo vendido,
    ...                monto del crédito y concentrado de ventas por fuerza de venta.
    ...
    ...                Pasos:
    ...                1. Acceder a la sección de reportes de ventas en la pantalla 360 de BES
    ...                2. Seleccionar el filtro de ventas por vendedor para Amigo Paguitos
    ...                3. Ingresar el identificador del vendedor y rango de fechas a consultar
    ...                4. Verificar que se visualicen los datos del cliente, equipo vendido y monto del crédito
    ...                5. Verificar que se muestre el concentrado de ventas por fuerza de venta
    ...
    ...                Verificaciones:
    ...                - Sistema muestra opciones de consulta de ventas
    ...                - Campos de búsqueda por vendedor y rango de fechas habilitados
    ...                - Consulta ejecutada recupera ventas del vendedor en el período especificado
    ...                - Pantalla muestra serviceNumber, IMEI y totalAmount de cada venta
    ...                - Sistema presenta resumen consolidado de ventas agrupadas por vendedor
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Accede a la sección de reportes de ventas en la pantalla 360 de BES
    Cuando accede a la sección de reportes de ventas en la pantalla 360 de BES

    # THEN: El sistema muestra las opciones de consulta de ventas disponibles
    Entonces el sistema muestra las opciones de consulta de ventas disponibles

    # WHEN: Selecciona el filtro de ventas por vendedor para Amigo Paguitos
    Cuando selecciona el filtro de ventas por vendedor para Amigo Paguitos

    # THEN: El sistema habilita los campos de búsqueda por vendedor y rango de fechas
    Entonces el sistema habilita los campos de búsqueda por vendedor y rango de fechas

    # WHEN: Ingresa el identificador del vendedor y rango de fechas a consultar
    Cuando ingresa el identificador del vendedor y rango de fechas a consultar
    ...    ${ID_VENDEDOR}    ${FECHA_INICIO}    ${FECHA_FIN}

    # THEN: El sistema ejecuta la consulta y recupera las ventas del vendedor en el período especificado
    Entonces el sistema ejecuta la consulta y recupera las ventas del vendedor en el período especificado

    # WHEN: Verifica que se visualicen los datos del cliente, equipo vendido y monto del crédito
    Cuando verifica que se visualicen los datos del cliente equipo vendido y monto del crédito

    # THEN: La pantalla muestra información detallada de cada venta incluyendo serviceNumber, IMEI, totalAmount del crédito
    Entonces la pantalla muestra información detallada de cada venta incluyendo serviceNumber IMEI totalAmount del crédito

    # WHEN: Verifica que se muestre el concentrado de ventas por fuerza de venta
    Cuando verifica que se muestre el concentrado de ventas por fuerza de venta

    # THEN: El sistema presenta un resumen consolidado de ventas agrupadas por vendedor
    Entonces el sistema presenta un resumen consolidado de ventas agrupadas por vendedor

    [Teardown]    Y cierra la sesión de la pantalla 360
