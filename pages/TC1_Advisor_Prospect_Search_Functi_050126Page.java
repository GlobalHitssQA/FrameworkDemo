package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - Inferidos siguiendo mejores prácticas
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator selectProspectButton;
    private Locator loadingIndicator;
    private Locator errorMessage;
    private Locator scrollContainer;
    private Locator noResultsMessage;
    private Locator prospectOwnershipLabel;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.selectProspectButton = page.locator("[data-testid='select-prospect-button']");
        this.loadingIndicator = page.locator("[data-testid='loading-spinner']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.scrollContainer = page.locator("[data-testid='results-scroll-container']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectOwnershipLabel = page.locator("[data-testid='prospect-owner-label']");
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterProspectSearchTerm(String searchTerm) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Esperar a que desaparezca el loading indicator
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        
        // Esperar a que aparezcan los resultados o el mensaje de no resultados
        page.waitForSelector("[data-testid='prospect-results-list'], [data-testid='no-results-message']", 
            new Page.WaitForSelectorOptions().setTimeout(5000));
    }

    public boolean areResultsDisplayed() {
        return searchResultsList.isVisible() && searchResultItems.count() > 0;
    }

    public int getResultsCount() {
        if (!searchResultsList.isVisible()) {
            return 0;
        }
        return searchResultItems.count();
    }

    public void selectProspectByIndex(int index) {
        if (index < 0 || index >= getResultsCount()) {
            throw new IndexOutOfBoundsException("Invalid prospect index: " + index);
        }
        searchResultItems.nth(index).locator("[data-testid='select-prospect-button']").click();
    }

    public void scrollToLoadMoreResults() {
        scrollContainer.evaluate("element => element.scrollTop = element.scrollHeight");
        page.waitForTimeout(1000); // Esperar a que carguen más resultados
    }

    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public boolean validateProspectsOwnership() {
        // Verificar que todos los prospectos mostrados tienen el label de ownership
        int totalResults = getResultsCount();
        if (totalResults == 0) {
            return false;
        }
        
        for (int i = 0; i < totalResults; i++) {
            Locator prospectItem = searchResultItems.nth(i);
            Locator ownerLabel = prospectItem.locator("[data-testid='prospect-owner-label']");
            
            if (!ownerLabel.isVisible()) {
                return false;
            }
            
            String ownerText = ownerLabel.textContent();
            if (!ownerText.contains("Own") && !ownerText.contains("Assigned")) {
                return false;
            }
        }
        
        return true;
    }

    public String getProspectNameByIndex(int index) {
        return searchResultItems.nth(index).locator("[data-testid='prospect-name']").textContent();
    }

    public String getProspectEmailByIndex(int index) {
        return searchResultItems.nth(index).locator("[data-testid='prospect-email']").textContent();
    }

    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }
}