*** Settings ***
Documentation    Caso de prueba: Verificación de generación de oferta de financiamiento
...              Proceso: Gestión de Crédito
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Generación de Oferta
...              Escenario: Verificar que el sistema genere correctamente la oferta de
...              financiamiento después de una evaluación crediticia aprobada con plazos
...              de 3, 6, 9 y 12 meses
...
...              Precondiciones:
...              - Evaluación crediticia aprobada
...              - Datos del cliente validados
...              - Reglas de negocio de financiamiento configuradas
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Oferta
${PLAZO_SELECCIONADO}         12
${CICLO_SELECCIONADO}         Mensual

*** Test Cases ***
Verificación De Generación De Oferta De Financiamiento
    [Documentation]    Este caso de prueba verifica que el sistema genere correctamente
    ...                la oferta de financiamiento después de una evaluación crediticia
    ...                aprobada con plazos de 3, 6, 9 y 12 meses, validando que el sistema
    ...                muestre las opciones de plazo y ciclo de pago configurables, calcule
    ...                y genere la oferta con el desglose de pagos según la selección, y
    ...                muestre la oferta completa con monto total, enganche y parcialidades.
    ...
    ...                Pasos:
    ...                1. Recibir resultado aprobado de evaluación crediticia
    ...                2. Consultar las opciones de plazo disponibles (3, 6, 9 y 12 meses)
    ...                3. Consultar los ciclos de pago disponibles (semanal, quincenal, mensual)
    ...                4. Seleccionar un plazo y ciclo de pago específico
    ...                5. Verificar que la oferta incluya monto total, enganche y parcialidades
    [Tags]    PruebaGeneradaIA

    # Precondición: Evaluación crediticia aprobada
    Dado que la evaluación crediticia fue aprobada

    # Step 1: Recibir resultado aprobado de evaluación crediticia
    Cuando el sistema avanza a la etapa de Oferta

    Entonces el resultado aprobado permite generar oferta de financiamiento

    # Step 2: Consultar las opciones de plazo disponibles (3, 6, 9 y 12 meses)
    Cuando consulto las opciones de plazo disponibles

    Entonces el sistema muestra los plazos configurables según validación del usuario

    # Step 3: Consultar los ciclos de pago disponibles (semanal, quincenal, mensual)
    Cuando consulto los ciclos de pago disponibles

    Entonces el sistema muestra los ciclos de pago configurables

    # Step 4: Seleccionar un plazo y ciclo de pago específico
    Cuando selecciono un plazo y ciclo de pago específico    ${PLAZO_SELECCIONADO}    ${CICLO_SELECCIONADO}

    Entonces el sistema calcula y genera la oferta de financiamiento con desglose de pagos

    # Step 5: Verificar que la oferta incluya monto total, enganche y parcialidades
    Entonces el sistema muestra la oferta completa con todos los detalles del financiamiento

    [Teardown]    Entonces cerrar la sesión del navegador
