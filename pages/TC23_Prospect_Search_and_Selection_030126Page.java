package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo buenas prácticas
    private Locator dashboardContainer;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator highlightedText;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator selectedProspect;
    private Locator confirmButton;
    private Locator prospectDetailsPanel;
    private Locator selectedProspectName;
    private Locator selectedProspectEmail;
    private Locator selectionProcessIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Inicialización de locators inferidos con selectores semánticos
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.highlightedText = page.locator("[data-testid='search-result-item'] strong, [data-testid='search-result-item'] b");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.selectedProspect = page.locator("[data-testid='search-result-item'][data-selected='true']");
        this.confirmButton = page.locator("[data-testid='confirm-selection-button']");
        this.prospectDetailsPanel = page.locator("[data-testid='prospect-details-panel']");
        this.selectedProspectName = page.locator("[data-testid='selected-prospect-name']");
        this.selectedProspectEmail = page.locator("[data-testid='selected-prospect-email']");
        this.selectionProcessIndicator = page.locator("[data-testid='selection-process-active']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void enterSearchText(String searchText) {
        searchInput.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getResultsCount() {
        return searchResultItems.count();
    }

    public boolean hasHighlightedText() {
        return highlightedText.count() > 0;
    }

    public boolean areProspectNamesVisible() {
        return prospectNames.first().isVisible();
    }

    public boolean areProspectEmailsVisible() {
        return prospectEmails.first().isVisible();
    }

    public void selectFirstProspect() {
        searchResultItems.first().click();
        page.waitForTimeout(500);
    }

    public boolean isProspectSelected() {
        return selectedProspect.count() > 0;
    }

    public void confirmSelection() {
        confirmButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isSelectionProcessActive() {
        return selectionProcessIndicator.isVisible();
    }

    public boolean isProspectDetailsPanelVisible() {
        return prospectDetailsPanel.isVisible();
    }

    public String getSelectedProspectName() {
        return selectedProspectName.textContent();
    }

    public String getSelectedProspectEmail() {
        return selectedProspectEmail.textContent();
    }
}