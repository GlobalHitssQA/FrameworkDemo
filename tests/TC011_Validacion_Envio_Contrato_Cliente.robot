*** Settings ***
Documentation    Caso de prueba: Validación de envío de contrato al cliente
...              Proceso: Venta
...              Aplicación: Amigo Paguitos
...              Funcionalidad: Envío de contrato
...              Escenario: Verificar el envío del contrato al cliente desde la plataforma
...              Amigo Paguitos una vez formalizada la venta y financiamiento del equipo
...
...              Precondiciones:
...              - Usuario autenticado en AP.AG
...              - Proceso de venta completado exitosamente
...              - Datos del cliente validados
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Medio de envío
${MEDIO_ENVIO_CORREO}            Correo electrónico
${MEDIO_ENVIO_SMS}               SMS
${MEDIO_ENVIO_PLATAFORMA}        Plataforma digital

*** Test Cases ***
Validación Del Envío De Contrato Al Cliente
    [Documentation]    Este caso de prueba verifica el envío del contrato al cliente desde
    ...                la plataforma Amigo Paguitos una vez formalizada la venta y financiamiento
    ...                del equipo. Valida que el sistema complete exitosamente todas las etapas
    ...                del flujo de venta, confirme la formalización de la venta y genere el
    ...                contrato correspondiente, envíe el contrato al cliente a través del medio
    ...                configurado (correo electrónico, SMS o plataforma digital), y que el cliente
    ...                reciba el contrato con la información completa del financiamiento.
    ...
    ...                Pasos:
    ...                1. Completar el proceso de venta en AP.AG (Registro, Legales, Autenticación, Evaluación, Oferta, Enrolamiento, Pago de Enganche)
    ...                2. Formalizar la venta y financiamiento del equipo desde AP.AG
    ...                3. Ejecutar la operación de envío de contrato al cliente
    ...                4. Verificar que el cliente reciba el contrato con información completa
    [Tags]    PruebaGeneradaIA

    # Precondición: Usuario autenticado y proceso de venta completado
    Cuando completo el proceso de venta en Amigo Paguitos Autogestión

    # Step 2: Formalizar la venta y financiamiento del equipo desde AP.AG
    Cuando formalizo la venta y financiamiento del equipo desde AP AG

    Entonces el sistema confirma la formalización de la venta y genera el contrato correspondiente

    # Step 3: Ejecutar la operación de envío de contrato al cliente
    Cuando ejecuto la operación de envío de contrato al cliente    ${MEDIO_ENVIO_CORREO}

    Entonces el sistema envía el contrato al cliente a través del medio configurado

    # Step 4: Verificar que el cliente reciba el contrato con información completa del financiamiento
    Entonces el contrato recibido contiene toda la información del financiamiento

    [Teardown]    Entonces cerrar la sesión del navegador
