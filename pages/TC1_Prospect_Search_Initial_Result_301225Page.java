package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS (no se pudo acceder a la aplicación real - requiere autenticación)
 */
public class ProspectSearchPage {

    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas y convenciones semánticas
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    private Locator resultsContainer;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos usando data-testid semánticos y selectores CSS estables
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-result-item'] [data-testid='prospect-email']");
        this.resultsContainer = page.locator("[data-testid='prospect-results-container']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-indicator']");
    }

    public boolean isSearchFieldDisplayed() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Wait for loading to complete
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        // Wait for results to appear
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }

    public int getTotalResultsCount() {
        return searchResultItems.count();
    }

    public boolean allResultsDisplayName() {
        int resultCount = searchResultItems.count();
        int nameCount = prospectNameElements.count();
        return resultCount == nameCount && resultCount > 0;
    }

    public boolean allResultsDisplayEmail() {
        int resultCount = searchResultItems.count();
        int emailCount = prospectEmailElements.count();
        return resultCount == emailCount && resultCount > 0;
    }

    public boolean hasMoreResultsThanVisible() {
        // Check if the container is scrollable (has more content than visible area)
        String scrollHeight = resultsContainer.evaluate("el => el.scrollHeight").toString();
        String clientHeight = resultsContainer.evaluate("el => el.clientHeight").toString();
        return Integer.parseInt(scrollHeight) > Integer.parseInt(clientHeight);
    }

    public void scrollToLoadMoreResults() {
        resultsContainer.evaluate("el => el.scrollTop = el.scrollHeight");
        page.waitForTimeout(1000); // Wait for additional results to load
    }

    public String getProspectNameAtIndex(int index) {
        return prospectNameElements.nth(index).textContent();
    }

    public String getProspectEmailAtIndex(int index) {
        return prospectEmailElements.nth(index).textContent();
    }
}

/**
 * Page Object for Acticenter Dashboard
 * LOCATORS: INFERIDOS (no se pudo acceder a la aplicación real - requiere autenticación)
 */
class ActicenterDashboardPage {

    private Page page;
    
    // Locators - INFERIDOS
    private Locator dashboardContainer;
    private Locator prospectSearchMenu;
    private Locator advisorProfileSection;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.advisorProfileSection = page.locator("[data-testid='advisor-profile-section']");
    }

    public void navigateToDashboard() {
        // URL should be configured in test configuration
        page.navigate(System.getProperty("acticenter.base.url", "https://acticenter.actinver.com"));
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public void clickProspectSearchMenu() {
        prospectSearchMenu.click();
    }

    public boolean isAdvisorProfileDisplayed() {
        return advisorProfileSection.isVisible();
    }
}