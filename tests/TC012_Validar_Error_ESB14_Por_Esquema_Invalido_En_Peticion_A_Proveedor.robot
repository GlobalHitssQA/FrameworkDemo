*** Settings ***
Documentation    Caso de prueba: Validar error ESB14 por esquema inválido en petición a proveedor
...              Proceso: Administración de Crédito
...              Aplicación: BES (Billing and Enterprise System)
...              Funcionalidad: Validación de esquemas XML en peticiones a proveedores internos
...              Escenario: Verificar que el ESB detecte y reporte el error ESB14 cuando internamente
...              genere una petición con esquema inválido hacia los proveedores BES durante la
...              orquestación del servicio PACPagosService
...
...              Precondiciones:
...              - Servicio PACPagosService desplegado con configuración incorrecta en transformaciones
...              - Servicios de BES disponibles
...              - Usuario autenticado con permisos para consumir el servicio
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido para consulta
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Error ESB14 Por Esquema Inválido En Petición A Proveedor
    [Documentation]    Este caso de prueba verifica que el ESB detecte y reporte el error ESB14 cuando
    ...                internamente genere una petición con esquema inválido hacia los proveedores BES
    ...                durante la orquestación del servicio PACPagosService.
    ...
    ...                Flujo de validación:
    ...                1. Configurar el servicio PACPagosService en el ESB con una transformación incorrecta
    ...                   que genere XML mal formado o con valores que no cumplan el esquema esperado por BES
    ...                2. Enviar una petición válida desde el consumidor al servicio PACPagosService con número telefónico correcto
    ...                3. Permitir que el ESB procese la petición e intente construir la petición hacia los servicios de BES
    ...                4. Validar que el ESB detecte internamente que el REQUEST generado no corresponde con la especificación del proveedor
    ...                5. Verificar que el sistema genere el código de error ESB14 con la descripción 'Esquema NO valido: petición a proveedor'
    ...                6. Validar que el error indique que se debe levantar incidente a TI para realizar análisis
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionEsquemas    IntegracionBES

    # STEP 1: Configurar el servicio PACPagosService en el ESB con una transformación incorrecta
    Dado que el servicio PACPagosService está configurado con transformación incorrecta hacia BES

    # STEP 2: Enviar una petición válida desde el consumidor al servicio PACPagosService con número telefónico correcto
    Cuando se envía una petición válida desde el consumidor con número telefónico correcto
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 2 (validación): El ESB recibe la petición con formato correcto desde el consumidor
    Entonces el ESB procesa la petición e intenta construir la petición hacia BES con configuración defectuosa

    # STEP 3: Permitir que el ESB procese la petición e intente construir la petición hacia los servicios de BES
    Y el ESB genera internamente una petición con formato incorrecto hacia BES

    # STEP 4: Validar que el ESB detecte internamente que el REQUEST generado no corresponde sintácticamente con la especificación del proveedor
    Entonces el ESB detecta internamente que la petición no corresponde con la especificación del proveedor

    # STEP 5: Verificar que el sistema genere el código de error ESB14 con la descripción 'Esquema NO valido: petición a proveedor'
    Y el sistema genera el código de error ESB14 indicando esquema inválido en petición a proveedor

    # STEP 6: Validar que el error indique que se debe levantar incidente a TI para realizar análisis e identificar el origen de la falla en la configuración
    Entonces el error indica que se debe levantar incidente a TI para análisis e identificación del origen de la falla

    # VALIDACIÓN ADICIONAL: Verificar que el ESB no envió la petición inválida a BES
    Y valida que el ESB no envió la petición inválida a BES
