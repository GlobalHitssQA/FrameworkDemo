package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator firstProspectResult;
    private Locator prospectNameField;
    private Locator prospectEmailField;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.firstProspectResult = page.locator("[data-testid='prospect-result-item']").first();
        this.prospectNameField = page.locator("[data-testid='prospect-name']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email']");
    }

    public boolean isSearchScreenDisplayed() {
        return searchInput.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsDisplayed() {
        return searchResults.isVisible() && prospectNameField.isVisible() && prospectEmailField.isVisible();
    }

    public void selectFirstProspect() {
        firstProspectResult.click();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSelectionPage {
    private Page page;
    private Locator selectedProspectIndicator;
    private Locator selectionProcessContainer;
    private Locator agas43FlowIndicator;
    private Locator agas46RedirectIndicator;

    public ProspectSelectionPage(Page page) {
        this.page = page;
        this.selectedProspectIndicator = page.locator("[data-testid='prospect-selected']");
        this.selectionProcessContainer = page.locator("[data-testid='selection-process-active']");
        this.agas43FlowIndicator = page.locator("[data-testid='agas-43-flow']");
        this.agas46RedirectIndicator = page.locator("[data-testid='agas-46-redirect']");
    }

    public boolean isProspectSelected() {
        return selectedProspectIndicator.isVisible();
    }

    public boolean isSelectionProcessActive() {
        return selectionProcessContainer.isVisible();
    }

    public boolean isAGAS43FlowActive() {
        return agas43FlowIndicator.isVisible() || page.url().contains("AGAS-43");
    }

    public void waitForRedirection() {
        page.waitForTimeout(2000);
        page.waitForURL(url -> url.contains("AGAS-46"), new Page.WaitForURLOptions().setTimeout(10000));
    }
}