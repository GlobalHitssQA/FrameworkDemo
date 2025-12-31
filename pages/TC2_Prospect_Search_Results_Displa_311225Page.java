package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * Note: Locators are INFERRED based on common UI patterns and best practices
 * These should be updated with real locators once access to the application is available
 */
public class ProspectSearchPage {

    private Page page;
    
    // Locators - INFERIDOS (no se pudo acceder a la aplicación real)
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator prospectItems;
    private Locator scrollableResultsList;
    private Locator totalResultsIndicator;
    private Locator loadingIndicator;

    // URL for prospect search screen - INFERRED
    private static final String PROSPECT_SEARCH_URL = "/acticenter/prospect-search";
    private static final int DEFAULT_TIMEOUT = 10000;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators INFERIDOS basados en buenas prácticas y patrones comunes de UI
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='prospect-results-container']");
        this.prospectItems = page.locator("[data-testid='prospect-result-item']");
        this.scrollableResultsList = page.locator("[data-testid='prospect-results-list']");
        this.totalResultsIndicator = page.locator("[data-testid='total-results-count']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
    }

    public void navigateToProspectSearchScreen() {
        page.navigate(page.url().split("/acticenter")[0] + PROSPECT_SEARCH_URL);
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchField.clear();
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Wait for loading indicator to disappear
        loadingIndicator.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.HIDDEN)
            .setTimeout(DEFAULT_TIMEOUT));
        // Wait for results container to be visible
        resultsContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(DEFAULT_TIMEOUT));
    }

    public boolean areSearchResultsDisplayed() {
        return resultsContainer.isVisible() && prospectItems.count() > 0;
    }

    public int getVisibleProspectsCount() {
        return prospectItems.count();
    }

    public int getTotalResultsCount() {
        String totalText = totalResultsIndicator.textContent();
        // Extract number from text like "15 results found"
        return Integer.parseInt(totalText.replaceAll("[^0-9]", ""));
    }

    public boolean isScrollableResultsListVisible() {
        // Check if the results list has scroll capability
        return scrollableResultsList.isVisible() && 
               (Boolean) page.evaluate("element => element.scrollHeight > element.clientHeight", 
                   scrollableResultsList.elementHandle());
    }

    public void scrollDownResultsList() {
        // Scroll the results list container
        page.evaluate("element => element.scrollTop += 300", 
            scrollableResultsList.elementHandle());
        // Wait for potential lazy loading
        page.waitForTimeout(500);
    }

    public boolean hasNewProspectsLoaded() {
        // Check if new prospects have been loaded after scrolling
        int currentCount = prospectItems.count();
        return currentCount > 5;
    }

    public String getProspectNameByIndex(int index) {
        Locator prospectName = prospectItems.nth(index).locator("[data-testid='prospect-name']");
        return prospectName.textContent();
    }

    public String getProspectEmailByIndex(int index) {
        Locator prospectEmail = prospectItems.nth(index).locator("[data-testid='prospect-email']");
        return prospectEmail.textContent();
    }

    public void selectProspectByIndex(int index) {
        prospectItems.nth(index).click();
    }

    public boolean isErrorMessageDisplayed() {
        Locator errorMessage = page.locator("[data-testid='search-error-message']");
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        Locator errorMessage = page.locator("[data-testid='search-error-message']");
        return errorMessage.textContent();
    }
}