package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator noResultsMessage;
    private Locator dashboardContainer;
    private Locator resultsList;
    private Locator createProspectButton;
    
    private static final String DASHBOARD_URL = "https://actinver.atlassian.net/dashboard";
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.createProspectButton = page.locator("[data-testid='create-prospect-button']");
    }
    
    public void navigateToDashboard() {
        page.navigate(DASHBOARD_URL);
        page.waitForLoadState();
    }
    
    public boolean isDashboardLoaded() {
        try {
            dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return dashboardContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }
    
    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }
    
    public void enterSearchTerm(String searchTerm) {
        searchField.clear();
        searchField.fill(searchTerm);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }
    
    public void waitForSearchResults() {
        try {
            page.waitForTimeout(2000);
        } catch (Exception e) {
            // Continue if wait fails
        }
    }
    
    public boolean isNoResultsMessageVisible() {
        try {
            noResultsMessage.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getNoResultsMessageText() {
        if (isNoResultsMessageVisible()) {
            return noResultsMessage.textContent();
        }
        return "";
    }
    
    public boolean isResultsListEmpty() {
        try {
            return resultsList.count() == 0;
        } catch (Exception e) {
            return true;
        }
    }
}