*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_CONTROL}      5512345001
${NUMERO_LINEA_PREPAGO}      5512345002
${DATOS_ESPERADOS_SUMA}      3GB

*** Test Cases ***
Verificar Homologación Con Funcionamiento De Paquetes Amigo Sin Límite
    [Documentation]    ID: 34
    ...                Título: Verificar homologación con funcionamiento de Paquetes Amigo Sin Límite
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que los Paquetes Internet Amigo funcionan exactamente igual que los Paquetes Amigo Sin Límite
    ...                en términos de suma y vigencia
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario prepago y usuario con Paquete Sin Límite disponibles;
    ...                Sistema UPC disponible; Conocimiento de reglas actuales de Paquetes Sin Límite
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    Homologacion
    Given el usuario de control tiene una línea con Paquetes Amigo Sin Límite disponibles
    When activa dos Paquetes Amigo Sin Límite de diferentes montos en la línea de control
    And registra el comportamiento de suma de datos y vigencia de Paquetes Sin Límite
    And el usuario prepago tiene una línea con Paquetes Internet Amigo disponibles
    And activa dos Paquetes Internet Amigo de diferentes montos en la línea prepago
    And registra el comportamiento de suma de datos y vigencia de Paquetes Internet Amigo
    Then el comportamiento de suma de datos es idéntico entre ambos tipos de paquetes
    And el comportamiento de vigencia es idéntico entre ambos tipos de paquetes
    And el comportamiento de conservación de beneficios es idéntico entre ambos tipos de paquetes
    And se confirma la homologación completa entre Paquetes Internet Amigo y Paquetes Sin Límite

*** Keywords ***
El Usuario De Control Tiene Una Línea Con Paquetes Amigo Sin Límite Disponibles
    Acceder A Módulo De Paquetes Amigo Sin Límite
    Buscar Línea De Control Para Paquetes Sin Límite    ${NUMERO_LINEA_CONTROL}
    Verificar Paquetes Amigo Sin Límite Disponibles

Activa Dos Paquetes Amigo Sin Límite De Diferentes Montos En La Línea De Control
    Activar Paquete Amigo Sin Límite 1GB En Línea Control
    Verificar Activación Exitosa De Paquete Sin Límite
    Sleep    2s
    Activar Paquete Amigo Sin Límite 2GB En Línea Control
    Verificar Activación Exitosa De Paquete Sin Límite

Registra El Comportamiento De Suma De Datos Y Vigencia De Paquetes Sin Límite
    Actualizar Consulta De Vigencia
    Registrar Suma De Datos De Paquetes Sin Límite
    Registrar Vigencia Resultante De Paquetes Sin Límite
    Registrar Beneficios Resultantes De Paquetes Sin Límite

El Usuario Prepago Tiene Una Línea Con Paquetes Internet Amigo Disponibles
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Dos Paquetes Internet Amigo De Diferentes Montos En La Línea Prepago
    Activar Paquete Internet Amigo 1GB En Línea Prepago
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Activar Paquete Internet Amigo 2GB En Línea Prepago
    Verificar Mensaje De Activación Exitosa

Registra El Comportamiento De Suma De Datos Y Vigencia De Paquetes Internet Amigo
    Actualizar Consulta De Vigencia
    Registrar Suma De Datos De Paquetes Internet Amigo
    Registrar Vigencia Resultante De Paquetes Internet Amigo
    Registrar Beneficios Resultantes De Paquetes Internet Amigo

El Comportamiento De Suma De Datos Es Idéntico Entre Ambos Tipos De Paquetes
    Comparar Comportamiento Suma De Datos Entre Paquetes
    Verificar Suma De Datos Idéntica En Ambos Tipos

El Comportamiento De Vigencia Es Idéntico Entre Ambos Tipos De Paquetes
    Comparar Comportamiento Vigencia Entre Paquetes
    Verificar Vigencia Idéntica En Ambos Tipos

El Comportamiento De Conservación De Beneficios Es Idéntico Entre Ambos Tipos De Paquetes
    Comparar Comportamiento Beneficios Entre Paquetes
    Verificar Beneficios Idénticos En Ambos Tipos

Se Confirma La Homologación Completa Entre Paquetes Internet Amigo Y Paquetes Sin Límite
    Verificar Homologación Completa De Comportamientos
    Log    La homologación entre Paquetes Internet Amigo y Paquetes Sin Límite ha sido verificada exitosamente
