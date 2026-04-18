*** Settings ***
Documentation     TC032 - Validación de oferta primaria exclusiva Amigo Paguitos con tarifa cero
...               Verifica que la oferta primaria exclusiva de Amigo Paguitos tenga tarifa 0 de renta
...               sin unidades libres ni ofertas suplementarias adicionales
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validación de oferta primaria exclusiva Amigo Paguitos con tarifa cero
    [Documentation]    Verifica que la oferta primaria exclusiva de Amigo Paguitos tenga:
    ...                - Tarifa de renta en 0
    ...                - Sin unidades libres configuradas
    ...                - Sin ofertas suplementarias adicionales
    [Tags]    PruebaGeneradaIA    Ofertas    AmigoPaguitos    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Cuando accede al módulo de configuración de ofertas primarias
    Y busca la oferta primaria exclusiva para Amigo Paguitos
    Entonces la tarifa de renta debe ser cero
    Y no deben existir unidades libres configuradas
    Y no deben existir ofertas suplementarias adicionales
