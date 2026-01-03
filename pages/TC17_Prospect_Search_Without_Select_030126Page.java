package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectResults;
    private Locator selectedProspect;
    private Locator cancelButton;
    private Locator backButton;
    private Locator closeButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResults = page.locator("[data-testid='prospect-result-item']");
        this.selectedProspect = page.locator("[data-testid='prospect-result-item'].selected");
        this.cancelButton = page.locator("[data-testid='cancel-button']");
        this.backButton = page.locator("[data-testid='back-button']");
        this.closeButton = page.locator("[data-testid='close-search-button']");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isResultsListVisible() {
        return resultsList.isVisible();
    }

    public int getResultsCount() {
        return prospectResults.count();
    }

    public void scrollThroughResults() {
        if (resultsList.isVisible()) {
            resultsList.evaluate("element => element.scrollBy(0, 200)");
            page.waitForTimeout(500);
            resultsList.evaluate("element => element.scrollBy(0, -100)");
        }
    }

    public boolean isAnyProspectSelected() {
        return selectedProspect.count() > 0;
    }

    public void clickCancelOrBackButton() {
        if (cancelButton.isVisible()) {
            cancelButton.click();
        } else if (backButton.isVisible()) {
            backButton.click();
        } else if (closeButton.isVisible()) {
            closeButton.click();
        }
        page.waitForTimeout(500);
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboard;
    private Locator prospectSearchOption;
    private Locator menuOptions;
    private Locator prospectDataSection;
    private String baseUrl = "https://actinver.atlassian.net";

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboard = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchOption = page.locator("[data-testid='prospect-search-menu-option']");
        this.menuOptions = page.locator("[data-testid='dashboard-menu-options']");
        this.prospectDataSection = page.locator("[data-testid='prospect-data-display']");
    }

    public void navigateToDashboard() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }

    public void clickProspectSearchOption() {
        prospectSearchOption.click();
        page.waitForTimeout(500);
    }

    public boolean areMenuOptionsVisible() {
        return menuOptions.isVisible();
    }

    public boolean isProspectDataDisplayed() {
        return prospectDataSection.isVisible();
    }

    public boolean isInInitialState() {
        return isDashboardVisible() && areMenuOptionsVisible() && !isProspectDataDisplayed();
    }
}