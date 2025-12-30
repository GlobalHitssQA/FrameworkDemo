package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS - No se pudo acceder a la URL real (requiere autenticación)
 */
public class ProspectSearchPage {

    private Page page;
    
    // Base URL - inferida para Acticenter
    private static final String BASE_URL = "https://acticenter.actinver.com";
    
    // Locators - INFERIDOS basados en buenas prácticas y convenciones de nombrado
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchResultItems;
    private Locator prospectNameLabel;
    private Locator prospectEmailLabel;
    private Locator dashboardContainer;
    private Locator userProfileIcon;
    private Locator loadingIndicator;
    private Locator noResultsMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Campo de búsqueda de prospectos - INFERIDO
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        
        // Botón de búsqueda/lupa - INFERIDO
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Contenedor de resultados de búsqueda - INFERIDO
        this.searchResultsContainer = page.locator("[data-testid='prospect-search-results']");
        
        // Items individuales de resultados - INFERIDO
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        
        // Nombre del prospecto en resultados - INFERIDO
        this.prospectNameLabel = page.locator("[data-testid='prospect-name']");
        
        // Email del prospecto en resultados - INFERIDO
        this.prospectEmailLabel = page.locator("[data-testid='prospect-email']");
        
        // Dashboard del asesor - INFERIDO
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        
        // Icono de perfil de usuario (para verificar login) - INFERIDO
        this.userProfileIcon = page.locator("[data-testid='user-profile-icon']");
        
        // Indicador de carga - INFERIDO
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        
        // Mensaje de sin resultados - INFERIDO
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
    }

    // Métodos de navegación
    public void navigateToActicenter() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToDashboard() {
        page.locator("[data-testid='nav-dashboard']").click();
        dashboardContainer.waitFor();
    }

    // Métodos de verificación de estado
    public boolean isUserLoggedIn() {
        return userProfileIcon.isVisible();
    }

    public boolean isProspectSearchEnabled() {
        return searchField.isVisible() && searchField.isEnabled();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }

    public boolean areSearchResultsVisible() {
        return searchResultsContainer.isVisible() && searchResultItems.count() > 0;
    }

    public boolean isSearchTriggered() {
        return searchResultsContainer.isVisible() || loadingIndicator.isVisible();
    }

    public boolean isProspectNameDisplayed() {
        return prospectNameLabel.first().isVisible();
    }

    public boolean isProspectEmailDisplayed() {
        return prospectEmailLabel.first().isVisible();
    }

    // Métodos de interacción
    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    // Métodos de espera
    public void waitForSearchToTrigger() {
        page.waitForTimeout(500); // Espera para trigger automático
        searchResultsContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(5000));
    }

    public void waitForSearchResultsToUpdate() {
        page.waitForTimeout(300); // Espera para actualización dinámica
        page.waitForLoadState();
    }

    // Métodos de obtención de datos
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public String getFirstProspectName() {
        return prospectNameLabel.first().textContent();
    }

    public String getFirstProspectEmail() {
        return prospectEmailLabel.first().textContent();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }
}