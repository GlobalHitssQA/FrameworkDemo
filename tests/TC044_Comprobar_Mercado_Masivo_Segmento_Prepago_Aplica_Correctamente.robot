*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_MASIVO_PREPAGO}    5512345678

*** Test Cases ***
Comprobar Que El Mercado Masivo Segmento Prepago Aplica Correctamente
    [Documentation]    ID: 44
    ...                Título: Comprobar que el mercado Masivo segmento Prepago aplica correctamente
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el ajuste de reglas de negocio para Paquetes Internet Amigo
    ...                aplica correctamente en el mercado Masivo segmento Prepago
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondiciones: Usuario del mercado Masivo segmento Prepago autenticado;
    ...                Sistema UPC operativo con nuevas reglas implementadas;
    ...                Paquetes Internet Amigo de 50 y 100 pesos disponibles
    [Tags]    PruebaGeneradaIA    Provisión    PaquetesInternetAmigo    UPC    Funcional    MercadoMasivo    SegmentoPrepago
    Given se identifica usuario del mercado Masivo con segmento Prepago en el sistema
    When se activa Paquete Internet Amigo de 50 pesos al usuario Prepago del mercado Masivo
    And se activa segundo Paquete Internet Amigo de 100 pesos al mismo usuario Prepago del mercado Masivo
    Then el sistema muestra una sola bolsa de datos para navegación libre y otra para redes sociales incluidas
    And se mantienen los beneficios del paquete con mayores beneficios que es el de 100 pesos
    And el comportamiento es idéntico al de los Paquetes Amigo Sin Límite en el segmento Prepago

*** Keywords ***
Se Identifica Usuario Del Mercado Masivo Con Segmento Prepago En El Sistema
    Identificar Usuario Mercado Masivo Segmento Prepago    ${NUMERO_LINEA_MASIVO_PREPAGO}

Se Activa Paquete Internet Amigo De 50 Pesos Al Usuario Prepago Del Mercado Masivo
    Activar Paquete Internet Amigo 50 En Usuario Masivo Prepago

Se Activa Segundo Paquete Internet Amigo De 100 Pesos Al Mismo Usuario Prepago Del Mercado Masivo
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 100 En Usuario Masivo Prepago

El Sistema Muestra Una Sola Bolsa De Datos Para Navegación Libre Y Otra Para Redes Sociales Incluidas
    Verificar Sistema Consolida Bolsas De Datos En Mercado Masivo Prepago

Se Mantienen Los Beneficios Del Paquete Con Mayores Beneficios Que Es El De 100 Pesos
    Verificar Beneficios Del Paquete De 100 Pesos En Mercado Masivo Prepago

El Comportamiento Es Idéntico Al De Los Paquetes Amigo Sin Límite En El Segmento Prepago
    Verificar Comportamiento Idéntico A Paquetes Sin Límite Para Prepago
