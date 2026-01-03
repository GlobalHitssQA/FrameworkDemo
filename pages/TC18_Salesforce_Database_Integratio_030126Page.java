package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator firstResultName;
    private Locator firstResultEmail;
    private Locator firstResultAssignment;
    private Locator errorMessage;
    private Locator connectionStatusIndicator;
    private Locator clearSearchButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospects-list']");
        this.firstResultName = page.locator("[data-testid='prospect-name']").first();
        this.firstResultEmail = page.locator("[data-testid='prospect-email']").first();
        this.firstResultAssignment = page.locator("[data-testid='prospect-assignment']").first();
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.connectionStatusIndicator = page.locator("[data-testid='salesforce-connection-status']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public void enterSearchQuery(String query) {
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getSearchResultCount() {
        return resultsList.locator("[data-testid='prospect-item']").count();
    }

    public String getFirstResultName() {
        return firstResultName.textContent().trim();
    }

    public String getFirstResultEmail() {
        return firstResultEmail.textContent().trim();
    }

    public String getFirstResultAssignment() {
        return firstResultAssignment.textContent().trim();
    }

    public boolean isSalesforceConnectionActive() {
        if (!connectionStatusIndicator.isVisible()) {
            return true; // Assume connected if no indicator present
        }
        String status = connectionStatusIndicator.getAttribute("data-status");
        return "active".equalsIgnoreCase(status) || "connected".equalsIgnoreCase(status);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}