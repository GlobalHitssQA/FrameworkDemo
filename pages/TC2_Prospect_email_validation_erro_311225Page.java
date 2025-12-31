package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Acticenter Prospect Search functionality
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (URL redirige a login de Atlassian)
 */
public class ActicenterProspectSearchPage {

    private final Page page;
    
    // Base URL - debe ser reemplazada con la URL real de Acticenter
    private static final String ACTICENTER_BASE_URL = "https://acticenter.actinver.com";
    
    // Locators - INFERIDOS basados en mejores prácticas y convenciones comunes
    private final Locator advisorDashboard;
    private final Locator pitchbookSection;
    private final Locator prospectSearchField;
    private final Locator searchButton;
    private final Locator searchResultsList;
    private final Locator searchResultItems;
    private final Locator emailErrorMessage;
    private final Locator proceedButton;
    private final Locator errorValidationContainer;

    public ActicenterProspectSearchPage(Page page) {
        this.page = page;
        
        // Dashboard del asesor
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        
        // Sección de Pitchbook
        this.pitchbookSection = page.locator("[data-testid='pitchbook-section']");
        
        // Campo de búsqueda de prospectos
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        
        // Botón de búsqueda/lupa
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Lista de resultados de búsqueda
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        
        // Items individuales de resultados
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        
        // Mensaje de error de email faltante
        this.emailErrorMessage = page.locator("[data-testid='email-missing-error']");
        
        // Botón para continuar/proceder
        this.proceedButton = page.locator("[data-testid='proceed-pitchbook-button']");
        
        // Contenedor de validación de errores
        this.errorValidationContainer = page.locator("[data-testid='validation-error-container']");
    }

    /**
     * Navega a la plataforma Acticenter
     */
    public void navigateToActicenter() {
        page.navigate(ACTICENTER_BASE_URL);
        page.waitForLoadState();
    }

    /**
     * Verifica si el dashboard del asesor está visible
     */
    public boolean isDashboardDisplayed() {
        return advisorDashboard.isVisible();
    }

    /**
     * Navega a la sección de Pitchbook
     */
    public void navigateToPitchbookSection() {
        pitchbookSection.click();
        page.waitForLoadState();
    }

    /**
     * Verifica si el campo de búsqueda de prospectos está visible
     */
    public boolean isProspectSearchFieldDisplayed() {
        return prospectSearchField.isVisible() && prospectSearchField.isEnabled();
    }

    /**
     * Busca un prospecto por nombre o correo
     */
    public void searchForProspect(String searchTerm) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchTerm);
        // Esperar a que se active la búsqueda (más de 2 caracteres)
        if (searchTerm.length() > 2) {
            searchButton.click();
            page.waitForSelector("[data-testid='prospect-search-results']", 
                new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE));
        }
    }

    /**
     * Verifica si los resultados de búsqueda están visibles
     */
    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible();
    }

    /**
     * Selecciona un prospecto de la lista de resultados por índice
     */
    public void selectProspectFromResults(int index) {
        searchResultItems.nth(index).click();
        page.waitForLoadState();
    }

    /**
     * Verifica si el mensaje de error por email faltante está visible
     */
    public boolean isEmailErrorMessageDisplayed() {
        return emailErrorMessage.isVisible() || errorValidationContainer.isVisible();
    }

    /**
     * Obtiene el texto del mensaje de error
     */
    public String getEmailErrorMessageText() {
        if (emailErrorMessage.isVisible()) {
            return emailErrorMessage.textContent();
        } else if (errorValidationContainer.isVisible()) {
            return errorValidationContainer.textContent();
        }
        return "";
    }

    /**
     * Verifica si el botón de proceder está habilitado
     */
    public boolean isProceedButtonEnabled() {
        return proceedButton.isEnabled();
    }

    /**
     * Obtiene la cantidad de resultados de búsqueda
     */
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    /**
     * Hace scroll en la lista de resultados
     */
    public void scrollSearchResults() {
        searchResultsList.evaluate("element => element.scrollTop += 100");
    }
}