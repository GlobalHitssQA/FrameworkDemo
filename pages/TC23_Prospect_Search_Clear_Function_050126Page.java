package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS siguiendo buenas prácticas
    private Locator dashboardContainer;
    private Locator prospectSearchMenu;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator clearSearchButton;
    private Locator newProspectButton;
    private Locator processSelectionScreen;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos con selectores robustos
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
        this.newProspectButton = page.locator("[data-testid='new-prospect-button']");
        this.processSelectionScreen = page.locator("[data-testid='process-selection-screen']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void clickProspectSearchMenu() {
        prospectSearchMenu.click();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000); // Esperar resultados
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public void clearSearchField() {
        searchField.clear();
        // Alternativamente si hay botón de limpiar:
        // clearSearchButton.click();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public boolean isNewProspectButtonVisible() {
        return newProspectButton.isVisible();
    }

    public boolean isProcessSelectionScreenVisible() {
        return processSelectionScreen.isVisible();
    }
}