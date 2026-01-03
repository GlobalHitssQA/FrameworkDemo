package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectNames;
    private Locator searchScreen;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.searchScreen = page.locator("[data-testid='prospect-search-screen']");
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchScreenVisible() {
        return searchScreen.isVisible();
    }

    public boolean areResultsVisible() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return searchResults.isVisible();
    }

    public boolean areProspectNamesDisplayed() {
        prospectNames.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return prospectNames.count() > 0 && prospectNames.first().isVisible();
    }

    public String getFirstProspectName() {
        return prospectNames.first().textContent();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class DashboardPage {
    private Page page;
    private Locator dashboard;
    private Locator prospectSearchLink;
    private static final String DASHBOARD_URL = "https://actinver.atlassian.net/dashboard";

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public void navigateToDashboard() {
        page.navigate(DASHBOARD_URL);
        dashboard.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}