package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator firstProspectEntry;
    private Locator prospectNameFields;
    private Locator prospectEmailFields;
    private Locator selectedProspectIndicator;
    private Locator processSelectionContainer;
    private Locator agas46Reference;
    private Locator agas43Reference;
    private Locator selectedProspectNameDisplay;
    private Locator selectedProspectEmailDisplay;
    private Locator confirmSelectionButton;
    private Locator processFlowIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.firstProspectEntry = page.locator("[data-testid='prospect-entry']").first();
        this.prospectNameFields = page.locator("[data-testid='prospect-name']");
        this.prospectEmailFields = page.locator("[data-testid='prospect-email']");
        this.selectedProspectIndicator = page.locator("[data-testid='selected-prospect-indicator']");
        this.processSelectionContainer = page.locator("[data-testid='process-selection-container']");
        this.agas46Reference = page.locator("[data-testid='agas-46-reference']");
        this.agas43Reference = page.locator("[data-testid='agas-43-reference']");
        this.selectedProspectNameDisplay = page.locator("[data-testid='selected-prospect-name']");
        this.selectedProspectEmailDisplay = page.locator("[data-testid='selected-prospect-email']");
        this.confirmSelectionButton = page.locator("[data-testid='confirm-selection-button']");
        this.processFlowIndicator = page.locator("[data-testid='process-flow-active']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
        page.waitForLoadState();
    }

    public void performSearch(String searchQuery) {
        searchInput.fill(searchQuery);
        searchButton.click();
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getResultsCount() {
        return page.locator("[data-testid='prospect-entry']").count();
    }

    public String getFirstProspectName() {
        return prospectNameFields.first().textContent();
    }

    public String getFirstProspectEmail() {
        return prospectEmailFields.first().textContent();
    }

    public void selectFirstProspect() {
        firstProspectEntry.click();
    }

    public boolean isProspectSelected() {
        return selectedProspectIndicator.isVisible();
    }

    public boolean isOnProcessSelectionPage() {
        return processSelectionContainer.isVisible();
    }

    public boolean hasAGAS46Reference() {
        return agas46Reference.isVisible();
    }

    public boolean hasAGAS43Reference() {
        return agas43Reference.isVisible();
    }

    public String getSelectedProspectName() {
        return selectedProspectNameDisplay.textContent();
    }

    public String getSelectedProspectEmail() {
        return selectedProspectEmailDisplay.textContent();
    }

    public void confirmSelection() {
        confirmSelectionButton.click();
    }

    public boolean isProcessFlowActive() {
        return processFlowIndicator.isVisible();
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
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
    }

    public void navigateToDashboard() {
        page.locator("[data-testid='dashboard-link']").click();
    }

    public boolean isOnDashboard() {
        return dashboardContainer.isVisible();
    }
}