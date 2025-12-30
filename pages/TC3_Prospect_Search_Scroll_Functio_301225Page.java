package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS (no se pudo acceder a la aplicación real - URL redirige a login de Atlassian)
 */
public class ProspectSearchPage {

    private Page page;

    // Dashboard locators - INFERIDOS
    private Locator dashboardContainer;
    private Locator prospectSearchButton;

    // Search functionality locators - INFERIDOS
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchResultItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator loadingIndicator;
    private Locator noResultsMessage;
    private Locator resultsCountIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Dashboard locators - INFERIDOS basados en convenciones de nomenclatura
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-btn']");

        // Search input and button - INFERIDOS
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-submit']");

        // Results container and items - INFERIDOS
        this.searchResultsContainer = page.locator("[data-testid='prospect-results-container']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");

        // Individual result data - INFERIDOS
        this.prospectNameElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-email']");

        // Loading and status indicators - INFERIDOS
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.resultsCountIndicator = page.locator("[data-testid='results-count']");
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public void clickProspectSearchButton() {
        prospectSearchButton.click();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }

    public boolean allResultsShowProspectName() {
        int resultCount = searchResultItems.count();
        int nameCount = prospectNameElements.count();
        if (resultCount == 0) return false;
        for (int i = 0; i < nameCount; i++) {
            String name = prospectNameElements.nth(i).textContent();
            if (name == null || name.trim().isEmpty()) {
                return false;
            }
        }
        return resultCount == nameCount;
    }

    public boolean allResultsShowEmail() {
        int resultCount = searchResultItems.count();
        int emailCount = prospectEmailElements.count();
        if (resultCount == 0) return false;
        for (int i = 0; i < emailCount; i++) {
            String email = prospectEmailElements.nth(i).textContent();
            if (email == null || email.trim().isEmpty()) {
                return false;
            }
        }
        return resultCount == emailCount;
    }

    public void scrollDownResultsArea() {
        searchResultsContainer.evaluate("element => element.scrollTop += 300");
        page.waitForTimeout(500);
    }

    public void scrollToEndOfResults() {
        int previousCount = 0;
        int currentCount = getVisibleResultsCount();
        int maxScrollAttempts = 20;
        int attempts = 0;

        while (previousCount != currentCount && attempts < maxScrollAttempts) {
            previousCount = currentCount;
            searchResultsContainer.evaluate("element => element.scrollTop = element.scrollHeight");
            page.waitForTimeout(500);
            currentCount = getVisibleResultsCount();
            attempts++;
        }
    }

    public boolean hasReachedEndOfResults() {
        Boolean isAtEnd = (Boolean) searchResultsContainer.evaluate(
            "element => Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 5"
        );
        return isAtEnd != null && isAtEnd;
    }

    public int getTotalResultsCount() {
        String countText = resultsCountIndicator.textContent();
        if (countText != null && !countText.isEmpty()) {
            try {
                return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
            } catch (NumberFormatException e) {
                return getAccessibleResultsCount();
            }
        }
        return getAccessibleResultsCount();
    }

    public int getAccessibleResultsCount() {
        scrollToEndOfResults();
        return searchResultItems.count();
    }

    public String getProspectName(int index) {
        return prospectNameElements.nth(index).textContent();
    }

    public String getProspectEmail(int index) {
        return prospectEmailElements.nth(index).textContent();
    }

    public void selectProspect(int index) {
        searchResultItems.nth(index).click();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }
}