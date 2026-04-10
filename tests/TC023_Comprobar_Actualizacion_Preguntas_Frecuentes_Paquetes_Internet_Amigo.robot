*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Test Cases ***
Comprobar Actualización De Preguntas Frecuentes Sobre Paquetes Internet Amigo
    [Documentation]    ID: 23
    ...                Título: Comprobar actualización de preguntas frecuentes sobre paquetes Internet Amigo
    ...                Proceso: Postventa
    ...                Aplicación: Portal de Preguntas Frecuentes
    ...                Funcionalidad: Actualización de FAQs Internet Amigo
    ...                Escenario: Verificar que las preguntas frecuentes de paquetes Internet Amigo
    ...                contengan información actualizada sobre las nuevas reglas de suma de datos y vigencias
    ...                Tipo de Prueba: Lineamiento
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Sección de preguntas frecuentes actualizada;
    ...                Acceso al portal de soporte o ayuda
    [Tags]    PruebaGeneradaIA    Postventa    PreguntasFrecuentes    Lineamiento    PaquetesInternetAmigo
    Given la sección de preguntas frecuentes de paquetes Internet Amigo está disponible
    When se busca información sobre activación de múltiples paquetes Internet Amigo
    Then la respuesta explica que los datos se suman en una sola bolsa y se mantiene la vigencia del paquete mayor
    And las preguntas frecuentes indican que se conservan los beneficios del paquete con mayores beneficios
    And la información en preguntas frecuentes es coherente con las nuevas reglas de negocio documentadas

*** Keywords ***
La Sección De Preguntas Frecuentes De Paquetes Internet Amigo Está Disponible
    Acceder A Seccion De Preguntas Frecuentes De Paquetes Internet Amigo

Se Busca Información Sobre Activación De Múltiples Paquetes Internet Amigo
    Buscar Pregunta Sobre Multiples Paquetes Internet Amigo

La Respuesta Explica Que Los Datos Se Suman En Una Sola Bolsa Y Se Mantiene La Vigencia Del Paquete Mayor
    Verificar FAQ Explica Como Funciona Suma De Datos Al Tener Multiples Paquetes

Las Preguntas Frecuentes Indican Que Se Conservan Los Beneficios Del Paquete Con Mayores Beneficios
    Verificar FAQ Indica Beneficios Del Paquete Mayor Se Mantienen

La Información En Preguntas Frecuentes Es Coherente Con Las Nuevas Reglas De Negocio Documentadas
    Validar Informacion De FAQs Es Consistente Con Terminos Y Condiciones
