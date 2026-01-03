package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator prospectNameField;
    private Locator prospectEmailField;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectNameField = page.locator("[data-testid='prospect-name-field']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email-field']");
    }

    public boolean isSearchScreenVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areResultsVisible() {
        return searchResults.isVisible() && resultsList.isVisible();
    }

    public void scrollThroughResults() {
        if (resultsList.isVisible()) {
            resultsList.evaluate("element => element.scrollTop = element.scrollHeight / 2");
            page.waitForTimeout(500);
        }
    }

    public int getResultsCount() {
        return resultsList.locator(".prospect-item").count();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;
    private Locator advisorDashboardTitle;
    private String baseUrl = "https://actinver.atlassian.net";

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
        this.advisorDashboardTitle = page.locator("[data-testid='dashboard-title']");
    }

    public void navigateToDashboard() {
        page.navigate(baseUrl + "/dashboard");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible() || advisorDashboardTitle.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
        page.waitForLoadState();
    }

    public boolean isOnDashboard(String currentUrl) {
        return currentUrl.contains("dashboard") || isDashboardVisible();
    }
}