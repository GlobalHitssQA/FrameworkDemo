*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${DATOS_ESPERADOS_SUMA}    1500MB
${VIGENCIA_ESPERADA}       15 días

*** Test Cases ***
Comprobar que los paquetes funcionan como Paquetes Sin Límite en suma
    [Documentation]    ID: 32
    ...                Título: Comprobar que los paquetes funcionan como Paquetes Sin Límite en suma
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que los Paquetes Internet Amigo suman datos y mantienen vigencia del paquete mayor
    ...                igual que los Paquetes Amigo Sin Límite
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario prepago o mixto autenticado; Sistema UPC disponible;
    ...                Conocimiento del funcionamiento de Paquetes Sin Límite para comparación
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario prepago o mixto está en el módulo de Paquetes Internet Amigo
    When activa un Paquete Internet Amigo de 50 pesos con vigencia de 7 días y 500 MB
    And un día después activa un Paquete Internet Amigo de 100 pesos con vigencia de 15 días y 1000 MB
    Then el sistema suma los datos de ambos paquetes mostrando 1500 MB totales
    And actualiza la vigencia a 15 días correspondiente al paquete mayor
    And conserva los beneficios mayores del paquete de 100 pesos incluyendo redes sociales ilimitadas
    And muestra en plataformas 360 MiTelcel y Claro Pay los datos vigencia y beneficios correctamente

*** Keywords ***
El Usuario Prepago O Mixto Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Internet Amigo De 50 Pesos Con Vigencia De 7 Días Y 500 MB
    Activar Paquete Amigo 50 En Línea Prepago

Un Día Después Activa Un Paquete Internet Amigo De 100 Pesos Con Vigencia De 15 Días Y 1000 MB
    Simular Espera De Un Día
    Activar Paquete Amigo 100 En La Misma Línea

El Sistema Suma Los Datos De Ambos Paquetes Mostrando 1500 MB Totales
    Consultar Cantidad Total De Datos Disponibles
    Verificar Suma De Datos De Ambos Paquetes    ${DATOS_ESPERADOS_SUMA}

Actualiza La Vigencia A 15 Días Correspondiente Al Paquete Mayor
    Consultar Vigencia En Plataformas
    Verificar Vigencia Corresponde A Paquete Internet Amigo 100 En Todas Las Plataformas

Conserva Los Beneficios Mayores Del Paquete De 100 Pesos Incluyendo Redes Sociales Ilimitadas
    Consultar Beneficios De La Línea
    Verificar Redes Sociales Ilimitadas Disponibles

Muestra En Plataformas 360 MiTelcel Y Claro Pay Los Datos Vigencia Y Beneficios Correctamente
    Consultar Vigencia En Plataformas
    Verificar Vigencia Corresponde Al Paquete Mayor En Todas Las Plataformas    ${VIGENCIA_ESPERADA}
    Verificar Sistema Muestra Bolsa Única Con Datos Sumados
