*** Settings ***
Documentation    TC071: Validación de retorno de información de plan de cuotas
...
...              PROCESO: Administración de Crédito
...              APLICACIÓN: BES
...              FUNCIONALIDAD: Consulta de plan de cuotas de financiamiento
...
...              ESCENARIO: Verificar el retorno de información del plan de cuotas desde BES
...              cuando se consulta un financiamiento activo de Amigo Paguitos
...
...              PRECONDICIONES:
...              - Usuario autenticado en el sistema
...              - Número telefónico con financiamiento activo en Amigo Paguitos
...              - Conexión a servicios BES disponible
...
...              TÉCNICA ISTQB: Particiones de equivalencia
...              COMPLEJIDAD: Media

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA

*** Variables ***
${NUMERO_TELEFONICO_CON_FINANCIAMIENTO}    5512345678
${TOTAL_CYCLE_ESPERADO}                     12

*** Test Cases ***
Validación de retorno de información de plan de cuotas
    [Documentation]    Verifica el retorno de información del plan de cuotas desde BES
    ...                cuando se consulta un financiamiento activo de Amigo Paguitos
    ...
    ...                STEP 1: Enviar petición SOAP con número telefónico con financiamiento activo
    ...                STEP 2: Verificar que Capa de Integración consume BCService.QueryInstallment de BES
    ...                STEP 3: Validar que la respuesta contiene todos los campos del plan de cuotas
    ...                STEP 4: Verificar que totalCycle corresponde al plan de financiamiento
    ...                STEP 5: Confirmar que totalAmount refleja el monto total del financiamiento
    [Tags]    PruebaGeneradaIA    AmigoPaguitos    PlanCuotas    Financiamiento    ParticionesEquivalencia

    # STEP 1: Enviar petición SOAP al servicio ConsultarPaguitos con un número telefónico válido que tenga un financiamiento activo
    Cuando se envía petición al servicio ConsultarPaguitos con financiamiento activo
    ...    ${NUMERO_TELEFONICO_CON_FINANCIAMIENTO}

    # STEP 2: Capa de Integración consume el servicio BCService.QueryInstallment de BES enviando CustID e installmentPlanInstId
    Entonces la Capa de Integración consume BCService QueryInstallment de BES
    Y BES retorna la información del plan de cuotas completa

    # STEP 3: Validar que la respuesta contenga todos los campos del plan de cuotas especificados en el mapeo de datos
    Y la respuesta incluye totalCycle totalAmount cycleSequence initialAmount amount cycleClass status cycleDueDate shortName

    # STEP 4: Verificar que el campo totalCycle corresponda al número total de parcialidades configuradas para el financiamiento
    Y el totalCycle corresponde al número total de parcialidades del financiamiento
    ...    ${TOTAL_CYCLE_ESPERADO}

    # STEP 5: Confirmar que el totalAmount sea la suma de todas las parcialidades del plan
    Y el totalAmount refleja correctamente el monto total del equipo financiado más intereses
