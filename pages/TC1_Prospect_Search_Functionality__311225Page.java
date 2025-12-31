package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Actinver Advisor Platform
 * LOCATORS: INFERIDOS (inferred) - URL requires authentication, locators based on best practices
 */
public class ProspectSearchPage {

    private Page page;
    
    // Base URL
    private static final String BASE_URL = "https://actinver.atlassian.net";
    
    // Dashboard Locators (INFERIDOS)
    private Locator dashboardContainer;
    private Locator prospectSearchSection;
    
    // Search Field Locators (INFERIDOS)
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchMagnifyingGlassIcon;
    
    // Search Results Locators (INFERIDOS)
    private Locator searchResultsContainer;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameInResults;
    private Locator prospectEmailInResults;
    
    // Last Searches Locators (INFERIDOS)
    private Locator lastSearchesSection;
    private Locator lastSearchesItems;
    
    // Scroll Container (INFERIDOS)
    private Locator resultsScrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Dashboard Locators - INFERIDOS based on semantic naming conventions
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        
        // Search Field Locators - INFERIDOS with fallback selectors
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input'], #prospect-search-field, input[name='prospectSearch']");
        this.searchButton = page.locator("[data-testid='prospect-search-button'], #btn-search-prospect, button[aria-label='Search prospects']");
        this.searchMagnifyingGlassIcon = page.locator("[data-testid='search-icon'], .search-icon, svg[aria-label='search']");
        
        // Search Results Locators - INFERIDOS
        this.searchResultsContainer = page.locator("[data-testid='search-results-container'], #prospect-search-results, .prospect-results-wrapper");
        this.searchResultsList = page.locator("[data-testid='search-results-list'], ul.prospect-results, .results-list");
        this.searchResultItems = page.locator("[data-testid='search-result-item'], li.prospect-item, .result-item");
        this.prospectNameInResults = page.locator("[data-testid='prospect-name'], .prospect-name, span.name");
        this.prospectEmailInResults = page.locator("[data-testid='prospect-email'], .prospect-email, span.email");
        
        // Last Searches Locators - INFERIDOS
        this.lastSearchesSection = page.locator("[data-testid='last-searches-section'], #last-searches, .recent-searches-container");
        this.lastSearchesItems = page.locator("[data-testid='last-search-item'], .last-search-item, li.recent-search");
        
        // Scroll Container - INFERIDOS
        this.resultsScrollContainer = page.locator("[data-testid='results-scroll-container'], .results-scroll, .scroll-container");
    }

    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isProspectSearchSectionAvailable() {
        return prospectSearchSection.isVisible();
    }

    public void focusOnSearchField() {
        prospectSearchField.click();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterSearchText(String text) {
        prospectSearchField.clear();
        prospectSearchField.fill(text);
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible() || searchMagnifyingGlassIcon.isVisible();
    }

    public void clickSearchButton() {
        if (searchButton.isVisible()) {
            searchButton.click();
        } else {
            // Fallback: press Enter if button not visible
            prospectSearchField.press("Enter");
        }
        page.waitForLoadState();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsContainer.isVisible() && searchResultItems.count() > 0;
    }

    public boolean isLastSearchesSectionVisible() {
        return lastSearchesSection.isVisible();
    }

    public int getLastSearchesCount() {
        return lastSearchesItems.count();
    }

    public int getVisibleMatchingResultsCount() {
        return searchResultItems.count();
    }

    public boolean isScrollAvailableForMoreResults() {
        // Check if scroll container has scrollable content
        if (resultsScrollContainer.isVisible()) {
            String scrollHeight = resultsScrollContainer.evaluate("el => el.scrollHeight").toString();
            String clientHeight = resultsScrollContainer.evaluate("el => el.clientHeight").toString();
            return Integer.parseInt(scrollHeight) > Integer.parseInt(clientHeight);
        }
        return false;
    }

    public String getProspectNameFromResult(int index) {
        return prospectNameInResults.nth(index).textContent();
    }

    public String getProspectEmailFromResult(int index) {
        return prospectEmailInResults.nth(index).textContent();
    }

    public void selectProspectFromResults(int index) {
        searchResultItems.nth(index).click();
    }

    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}