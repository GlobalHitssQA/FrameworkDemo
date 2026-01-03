package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no se pudo inspeccionar URL real)
    private Locator dashboardContainer;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator firstResultName;
    private Locator firstResultEmail;
    private Locator highlightedText;
    private Locator resultsScrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos siguiendo buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.firstResultName = page.locator("[data-testid='prospect-result-item']:first-child [data-testid='prospect-name']");
        this.firstResultEmail = page.locator("[data-testid='prospect-result-item']:first-child [data-testid='prospect-email']");
        this.highlightedText = page.locator("[data-testid='prospect-result-item'] mark, [data-testid='prospect-result-item'] .highlight");
        this.resultsScrollContainer = page.locator("[data-testid='prospect-results-scroll-container']");
    }

    public boolean isDashboardLoaded() {
        return dashboardContainer.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsVisible() {
        return searchResults.isVisible();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public int getVisibleResultsCount() {
        int count = 0;
        int totalResults = resultItems.count();
        for (int i = 0; i < Math.min(totalResults, 5); i++) {
            if (resultItems.nth(i).isVisible()) {
                count++;
            }
        }
        return count;
    }

    public boolean isFirstResultNameVisible() {
        return firstResultName.isVisible();
    }

    public boolean isFirstResultEmailVisible() {
        return firstResultEmail.isVisible();
    }

    public boolean hasHighlightedText() {
        return highlightedText.count() > 0;
    }

    public boolean isScrollAvailable() {
        String overflow = (String) resultsScrollContainer.evaluate("el => window.getComputedStyle(el).overflowY");
        double scrollHeight = (double) resultsScrollContainer.evaluate("el => el.scrollHeight");
        double clientHeight = (double) resultsScrollContainer.evaluate("el => el.clientHeight");
        return (overflow.equals("auto") || overflow.equals("scroll")) && scrollHeight > clientHeight;
    }

    public String getFirstResultName() {
        return firstResultName.textContent();
    }

    public String getFirstResultEmail() {
        return firstResultEmail.textContent();
    }
}