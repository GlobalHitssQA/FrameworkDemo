package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators (inferidos - basados en mejores prácticas)
    private Locator dashboardContainer;
    private Locator searchField;
    private Locator searchResultsContainer;
    private Locator searchResultItems;
    private Locator resultNames;
    private Locator resultEmails;
    private Locator highlightedText;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Dashboard elements
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        
        // Search field - usando múltiples estrategias para robustez
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        
        // Search results container
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        
        // Result items (máximo 5)
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        
        // Result details
        this.resultNames = page.locator("[data-testid='prospect-name']");
        this.resultEmails = page.locator("[data-testid='prospect-email']");
        
        // Highlighted matching text
        this.highlightedText = page.locator("[data-testid='prospect-name'] mark, [data-testid='prospect-name'] .highlight");
    }

    // Wait methods
    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setTimeout(10000));
    }

    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setTimeout(5000));
    }

    // Getter methods for locators
    public Locator getDashboardContainer() {
        return dashboardContainer;
    }

    public Locator getSearchField() {
        return searchField;
    }

    public Locator getSearchResultsContainer() {
        return searchResultsContainer;
    }

    // Interaction methods
    public void enterSearchQuery(String query) {
        searchField.fill(query);
    }

    public void pressEnterOnSearchField() {
        searchField.press("Enter");
    }

    public void clickSearchButton() {
        page.locator("[data-testid='search-button']").click();
    }

    // Validation methods
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean allResultsContainNameAndEmail() {
        int resultsCount = searchResultItems.count();
        int namesCount = resultNames.count();
        int emailsCount = resultEmails.count();
        
        return resultsCount == namesCount && resultsCount == emailsCount && resultsCount > 0;
    }

    public boolean resultsMatchSearchQuery(String searchQuery) {
        int resultsCount = searchResultItems.count();
        String lowerQuery = searchQuery.toLowerCase();
        
        for (int i = 0; i < resultsCount; i++) {
            String name = resultNames.nth(i).textContent().toLowerCase();
            String email = resultEmails.nth(i).textContent().toLowerCase();
            
            if (!name.contains(lowerQuery) && !email.contains(lowerQuery)) {
                return false;
            }
        }
        return true;
    }

    public boolean hasHighlightedMatchingText() {
        return highlightedText.count() > 0;
    }

    public String getResultNameByIndex(int index) {
        return resultNames.nth(index).textContent();
    }

    public String getResultEmailByIndex(int index) {
        return resultEmails.nth(index).textContent();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }
}