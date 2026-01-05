package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator errorMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='actinver-dashboard']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.errorMessage = page.locator("[data-testid='search-error-message']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public void enterProspectName(String prospectName) {
        prospectSearchField.fill(prospectName);
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public boolean hasSearchResults() {
        return searchResultItems.count() > 0;
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public String getFirstResultText() {
        return searchResultItems.first().textContent();
    }

    public void selectProspectByIndex(int index) {
        searchResultItems.nth(index).click();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
}