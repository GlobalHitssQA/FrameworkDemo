package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultsList;
    private Locator noResultsMessage;
    private Locator prospectNameField;
    private Locator prospectEmailField;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectNameField = page.locator("[data-testid='prospect-name']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void pressEnterOnSearchField() {
        searchInput.press("Enter");
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchExecution() {
        page.waitForTimeout(1000);
        page.waitForLoadState();
    }

    public boolean isResultsContainerVisible() {
        return resultsContainer.isVisible();
    }

    public boolean hasSearchResults() {
        return resultsList.count() > 0;
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getResultsText() {
        if (hasSearchResults()) {
            return resultsList.textContent();
        } else if (isNoResultsMessageVisible()) {
            return noResultsMessage.textContent();
        }
        return "";
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public String getProspectName() {
        return prospectNameField.textContent();
    }

    public String getProspectEmail() {
        return prospectEmailField.textContent();
    }

    public boolean isProspectNameVisible() {
        return prospectNameField.isVisible();
    }

    public boolean isProspectEmailVisible() {
        return prospectEmailField.isVisible();
    }
}