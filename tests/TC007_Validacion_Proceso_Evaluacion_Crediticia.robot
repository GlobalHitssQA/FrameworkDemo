*** Settings ***
Documentation    Caso de prueba: Validación del proceso de evaluación crediticia
...              Proceso: Evaluación Crediticia
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Evaluación de Crédito
...              Escenario: Verificar que el sistema ejecute correctamente la etapa de
...              Evaluación crediticia en el flujo de venta cuando el cliente ha sido autenticado
...
...              Precondiciones:
...              - Cliente autenticado en el sistema
...              - Datos del cliente completos
...              - Servicios de evaluación crediticia disponibles
...
...              Técnica ISTQB: Tabla de decisión
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Test Cases ***
Validación Del Proceso De Evaluación Crediticia
    [Documentation]    Este caso de prueba verifica que el sistema ejecute correctamente
    ...                la etapa de Evaluación crediticia en el flujo de venta cuando el
    ...                cliente ha sido autenticado, validando que el sistema procese los
    ...                datos del cliente, ejecute el análisis crediticio, devuelva el
    ...                resultado de aprobación o rechazo, y permita avanzar a la etapa de
    ...                Oferta si el crédito es aprobado.
    ...
    ...                Pasos:
    ...                1. Iniciar la etapa de Evaluación después de completar la Autenticación
    ...                2. Enviar la información del cliente para evaluación crediticia
    ...                3. Obtener el resultado de la evaluación crediticia
    ...                4. Si es aprobado, avanzar a la etapa de Oferta
    [Tags]    PruebaGeneradaIA

    # Precondición: Cliente autenticado
    Dado que el cliente fue autenticado exitosamente

    # Step 1: Iniciar la etapa de Evaluación después de completar la Autenticación
    Cuando inicio la etapa de Evaluación crediticia

    # Step 2: Enviar la información del cliente para evaluación crediticia
    Cuando envío la información del cliente para evaluación crediticia

    Entonces el sistema procesa los datos y ejecuta el análisis crediticio

    # Step 3: Obtener el resultado de la evaluación crediticia
    Cuando obtengo el resultado de la evaluación crediticia

    Entonces el sistema devuelve aprobación del crédito

    # Step 4: Si es aprobado, avanzar a la etapa de Oferta
    Cuando el crédito es aprobado avanzo a la etapa de Oferta

    [Teardown]    Entonces cerrar la sesión del navegador
