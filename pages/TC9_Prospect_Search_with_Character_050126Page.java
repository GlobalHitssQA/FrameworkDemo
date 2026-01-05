package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator dashboardContainer;
    private Locator highlightedText;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.highlightedText = page.locator(".prospect-name-highlight, .highlight, strong, b");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net");
    }

    public boolean isDashboardLoaded() {
        return dashboardContainer.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        prospectSearchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsDisplayed() {
        return searchResultsList.isVisible() && searchResultItems.count() > 0;
    }

    public int getResultCount() {
        return searchResultItems.count();
    }

    public boolean areMatchingCharactersHighlighted(String searchTerm) {
        if (highlightedText.count() == 0) {
            return false;
        }
        
        String firstHighlightedText = highlightedText.first().textContent().toLowerCase();
        return firstHighlightedText.contains(searchTerm.toLowerCase());
    }

    public String getFirstResultName() {
        if (searchResultItems.count() > 0) {
            return searchResultItems.first().textContent();
        }
        return "";
    }

    public void selectProspectByIndex(int index) {
        if (index < searchResultItems.count()) {
            searchResultItems.nth(index).click();
        }
    }
}