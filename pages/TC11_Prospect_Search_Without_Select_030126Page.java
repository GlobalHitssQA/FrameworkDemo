package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator dashboardHeader;
    private Locator mainContent;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.dashboardHeader = page.locator("[data-testid='dashboard-header']");
        this.mainContent = page.locator("[data-testid='dashboard-main-content']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible() && dashboardHeader.isVisible();
    }

    public boolean isDashboardInOriginalState() {
        return dashboardContainer.isVisible() && mainContent.isVisible();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchResultsList;
    private Locator prospectName;
    private Locator prospectEmail;
    private Locator selectProspectButton;
    private Locator outsideClickArea;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectName = page.locator("[data-testid='prospect-name']");
        this.prospectEmail = page.locator("[data-testid='prospect-email']");
        this.selectProspectButton = page.locator("[data-testid='select-prospect-button']");
        this.outsideClickArea = page.locator("[data-testid='dashboard-main-content']");
    }

    public void enterSearchText(String text) {
        searchInput.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getSearchResultsCount() {
        return prospectName.count();
    }

    public void clickOutsideSearchArea() {
        outsideClickArea.click();
    }

    public String getProspectName(int index) {
        return prospectName.nth(index).textContent();
    }

    public String getProspectEmail(int index) {
        return prospectEmail.nth(index).textContent();
    }

    public void selectProspect(int index) {
        selectProspectButton.nth(index).click();
    }

    public void scrollToResult(int index) {
        prospectName.nth(index).scrollIntoViewIfNeeded();
    }
}