package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator processSelectionScreen;
    private Locator prospectDetailScreen;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos siguiendo buenas prácticas de Playwright y metadata del proyecto
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.processSelectionScreen = page.locator("[data-testid='process-selection-screen']");
        this.prospectDetailScreen = page.locator("[data-testid='prospect-detail-screen']");
    }

    public void enterProspectName(String name) {
        searchField.fill(name);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void verifySearchResultsAreVisible() {
        if (!searchResults.isVisible()) {
            throw new AssertionError("Search results are not visible");
        }
    }

    public void verifyResultsListIsVisible() {
        if (!resultsList.isVisible()) {
            throw new AssertionError("Results list is not visible");
        }
    }

    public void verifyProcessSelectionNotVisible() {
        if (processSelectionScreen.isVisible()) {
            throw new AssertionError("Process selection screen should not be visible");
        }
    }

    public void verifyProspectDetailNotVisible() {
        if (prospectDetailScreen.isVisible()) {
            throw new AssertionError("Prospect detail screen should not be visible");
        }
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;

    public DashboardPage(Page page) {
        this.page = page;
        // Inferido siguiendo buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='actinver-dashboard']");
    }

    public void verifyDashboardIsVisible() {
        if (!dashboardContainer.isVisible()) {
            throw new AssertionError("Dashboard is not visible");
        }
    }
}