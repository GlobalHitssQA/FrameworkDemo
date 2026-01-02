package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.ScrollBehavior;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchResultsList;
    private Locator closeButton;
    private Locator searchDialog;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.closeButton = page.locator("[data-testid='search-close-button']");
        this.searchDialog = page.locator("[data-testid='prospect-search-dialog']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible() && searchResultsList.count() > 0;
    }

    public void scrollThroughResults() {
        if (searchResultsList.count() > 0) {
            searchResultsList.first().scrollIntoViewIfNeeded();
            page.waitForTimeout(500);
        }
    }

    public void closeSearchResults() {
        if (closeButton.isVisible()) {
            closeButton.click();
        } else {
            page.keyboard().press("Escape");
        }
        page.waitForTimeout(500);
    }

    public boolean isSearchDialogClosed() {
        return !searchDialog.isVisible();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchButton;
    private Locator advisorDashboardTitle;

    public DashboardPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-btn']");
        this.advisorDashboardTitle = page.locator("h1:has-text('Dashboard')");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible() || advisorDashboardTitle.isVisible();
    }

    public void clickProspectSearchButton() {
        prospectSearchButton.click();
        page.waitForTimeout(500);
    }

    public String getDashboardTitle() {
        return advisorDashboardTitle.textContent();
    }
}