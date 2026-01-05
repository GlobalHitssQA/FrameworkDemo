package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - Inferidos basados en mejores prácticas
    private Locator prospectSearchSection;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator highlightedMatches;
    private Locator firstFiveResults;
    private Locator scrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Selectores inferidos usando data-testid y CSS estables
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button'], button[aria-label='Search'], button.search-button");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedMatches = page.locator(".highlight-match, [data-testid='highlighted-match'], mark");
        this.firstFiveResults = page.locator("[data-testid='prospect-result-item']").nth(4);
        this.scrollContainer = page.locator("[data-testid='results-scroll-container']");
    }

    public void navigateToProspectSearch() {
        prospectSearchSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.clear();
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible() && resultItems.count() > 0;
    }

    public boolean hasResultsWithSpecialCharacters() {
        if (resultItems.count() == 0) {
            return false;
        }
        String firstResultText = resultItems.first().textContent();
        return firstResultText.matches(".*[^a-zA-Z0-9\\s].*");
    }

    public boolean areMatchesHighlightedInYellow() {
        if (highlightedMatches.count() == 0) {
            return false;
        }
        String backgroundColor = highlightedMatches.first().evaluate("el => window.getComputedStyle(el).backgroundColor").toString();
        return backgroundColor.contains("rgb(255, 255") || backgroundColor.contains("yellow");
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public void scrollToMoreResults() {
        scrollContainer.evaluate("el => el.scrollTop = el.scrollHeight");
    }

    public boolean isScrollContainerVisible() {
        return scrollContainer.isVisible();
    }
}