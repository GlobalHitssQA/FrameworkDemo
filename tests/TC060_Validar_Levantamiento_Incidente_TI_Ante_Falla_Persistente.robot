*** Settings ***
Documentation    Caso de prueba: Validar levantamiento de incidente a TI ante falla persistente
...              Proceso: Administración de Crédito
...              Aplicación: ESB - Capa de Integración
...              Funcionalidad: Manejo de Errores y Escalamiento
...              Escenario: Verificar que se levanta un incidente a TI cuando una falla persiste
...              después de agotar los reintentos configurados en el ESB
...
...              Precondiciones:
...              - Servicio PACPagosService configurado en ESB
...              - Falla persistente simulada en BES o proveedores
...              - Configuración de reintentos agotada
...
...              Técnica ISTQB: Casos de uso
...              Requerimiento Usuario: RU Desconocido
...              Requerimiento Funcional: RF Desconocido
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Configuración de falla persistente
${NUMERO_TELEFONICO_VALIDO}           5512345678
${MAX_REINTENTOS_CONFIGURADO}         3
${TIEMPO_ENTRE_REINTENTOS}            5
${TRANSACTION_ID_EJEMPLO}             TXN-2026-ESB4-ESCALAMIENTO-001

*** Test Cases ***
Validar Levantamiento De Incidente A TI Ante Falla Persistente
    [Documentation]    Este caso de prueba verifica que se levanta un incidente a TI cuando una falla
    ...                persiste después de agotar los reintentos configurados en el ESB.
    ...
    ...                Flujo de validación:
    ...                1. Invocar el servicio PACPagosService.ConsultarPaguitos con datos válidos
    ...                2. Simular una falla persistente de tipo ESB4 (Falla de conexión) desde BES
    ...                3. Verificar que el ESB ejecuta los reintentos configurados para el error ESB4
    ...                4. Validar que después de agotar los reintentos la falla persiste
    ...                5. Confirmar que el ESB genera un mensaje de error indicando que se debe levantar incidente a TI
    ...                6. Verificar que el error final se devuelve al consumidor con instrucciones de escalamiento
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    EscalamientoTI    AdministracionCredito

    # STEP 1: Configurar reintentos automáticos en el ESB
    Dado que el ESB está configurado con parámetros de reintento automático
    ...    ${MAX_REINTENTOS_CONFIGURADO}    ${TIEMPO_ENTRE_REINTENTOS}

    # STEP 1 y 2: Invocar el servicio PACPagosService.ConsultarPaguitos con datos válidos y simular falla persistente ESB4
    Cuando se invoca el servicio PACPagosService ConsultarPaguitos con datos válidos
    ...    ${NUMERO_TELEFONICO_VALIDO}

    Y se simula una falla persistente de tipo ESB4 por falla de conexión desde BES

    # STEP 3: Verificar que el ESB ejecuta los reintentos configurados para el error ESB4
    Entonces el ESB ejecuta todos los reintentos configurados para el error ESB4
    ...    ${MAX_REINTENTOS_CONFIGURADO}

    # STEP 4: Validar que después de agotar los reintentos la falla persiste
    Y después de agotar los reintentos la falla persiste con el mismo error ESB4

    # STEP 5: Confirmar que el ESB genera un mensaje de error indicando que se debe levantar incidente a TI
    Entonces el sistema genera un mensaje indicando que se debe levantar incidente a TI para análisis

    # STEP 6: Verificar que el error final se devuelve al consumidor con instrucciones de escalamiento
    Y el error final se devuelve al consumidor con código ESB4 e instrucciones de contactar soporte DAI
