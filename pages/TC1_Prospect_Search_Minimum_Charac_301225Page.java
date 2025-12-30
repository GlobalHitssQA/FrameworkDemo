package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real debido a autenticación requerida
 */
public class ProspectSearchPage {

    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas y convenciones semánticas
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator resultsContainer;
    private Locator noResultsMessage;
    private Locator minimumCharactersMessage;
    private Locator prospectSearchSection;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Campo de búsqueda de prospectos
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        
        // Botón/lupa de búsqueda
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        
        // Contenedor de resultados
        this.resultsContainer = page.locator("[data-testid='prospect-results-container']");
        
        // Lista de resultados
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        
        // Items individuales de resultados
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        
        // Elementos de nombre de prospecto dentro de resultados
        this.prospectNameElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-name']");
        
        // Elementos de email de prospecto dentro de resultados
        this.prospectEmailElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-email']");
        
        // Mensaje de sin resultados
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        
        // Mensaje de mínimo de caracteres requeridos
        this.minimumCharactersMessage = page.locator("[data-testid='minimum-characters-message']");
        
        // Sección de búsqueda de prospectos
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        
        // Indicador de carga
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
    }

    public void navigateToProspectSearch() {
        page.locator("[data-testid='nav-prospect-search']").click();
        prospectSearchSection.waitFor();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public boolean isSearchFieldActive() {
        return prospectSearchField.evaluate("el => el === document.activeElement").equals(true);
    }

    public void enterSearchText(String text) {
        prospectSearchField.clear();
        prospectSearchField.fill(text);
    }

    public void appendSearchText(String text) {
        prospectSearchField.press("End");
        prospectSearchField.type(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void pressEnterToSearch() {
        prospectSearchField.press("Enter");
    }

    public boolean isSearchExecuted() {
        return loadingIndicator.isVisible() || resultsContainer.isVisible();
    }

    public boolean isSearchEnabled() {
        return searchButton.isEnabled();
    }

    public boolean areResultsDisplayed() {
        return searchResultItems.count() > 0;
    }

    public void waitForSearchResults() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        resultsContainer.waitFor();
    }

    public boolean resultsContainProspectName() {
        return prospectNameElements.count() > 0 && !prospectNameElements.first().textContent().isEmpty();
    }

    public boolean resultsContainEmailAddress() {
        return prospectEmailElements.count() > 0 && !prospectEmailElements.first().textContent().isEmpty();
    }

    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }

    public int getTotalResultsCount() {
        String countText = page.locator("[data-testid='total-results-count']").textContent();
        return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
    }

    public boolean isScrollableResultsList() {
        return (Boolean) searchResultsList.evaluate(
            "el => el.scrollHeight > el.clientHeight"
        );
    }

    public void scrollToBottomOfResults() {
        searchResultsList.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public String getMinimumCharactersMessage() {
        if (minimumCharactersMessage.isVisible()) {
            return minimumCharactersMessage.textContent();
        }
        return "";
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public void selectProspectByIndex(int index) {
        searchResultItems.nth(index).click();
    }

    public String getProspectNameByIndex(int index) {
        return prospectNameElements.nth(index).textContent();
    }

    public String getProspectEmailByIndex(int index) {
        return prospectEmailElements.nth(index).textContent();
    }
}