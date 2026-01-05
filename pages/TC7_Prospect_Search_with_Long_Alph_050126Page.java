package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - Inferidos basados en buenas prácticas
    private Locator prospectMenuLink;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator errorMessage;
    private Locator firstResultItem;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos siguiendo convenciones de naming semánticas
        this.prospectMenuLink = page.locator("[data-testid='prospect-menu-link']");
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-alert, [role='alert'][class*='error']");
        this.firstResultItem = page.locator("[data-testid='prospect-result-item']").first();
        this.loadingIndicator = page.locator("[data-testid='search-loading'], .spinner, [aria-busy='true']");
    }

    public void navigateToProspectSearch() {
        prospectMenuLink.click();
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
        // Esperar a que desaparezca el indicador de carga si existe
        if (loadingIndicator.count() > 0) {
            loadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(10000));
        }
    }

    public boolean isSearchExecuted() {
        // Verificar que la búsqueda se ejecutó esperando resultados o mensaje
        try {
            page.waitForTimeout(1000); // Esperar procesamiento
            return searchResultsList.isVisible() || noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasSearchResults() {
        return searchResultsList.isVisible() && firstResultItem.count() > 0;
    }

    public boolean hasNoResultsMessage() {
        return noResultsMessage.isVisible();
    }

    public boolean hasErrorMessage() {
        return errorMessage.count() > 0 && errorMessage.isVisible();
    }

    public int getResultsCount() {
        if (!hasSearchResults()) {
            return 0;
        }
        return page.locator("[data-testid='prospect-result-item']").count();
    }

    public String getFirstResultText() {
        if (hasSearchResults()) {
            return firstResultItem.textContent();
        }
        return "";
    }
}