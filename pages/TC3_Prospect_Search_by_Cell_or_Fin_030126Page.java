package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsList;
    private Locator resultsContainer;
    private Locator cellInfoDisplay;
    private Locator prospectCards;
    private Locator nameField;
    private Locator emailField;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.resultsList = page.locator("[data-testid='results-list']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.cellInfoDisplay = page.locator("[data-testid='cell-financial-center-info']");
        this.prospectCards = page.locator("[data-testid='prospect-card']");
        this.nameField = page.locator("[data-testid='prospect-name']");
        this.emailField = page.locator("[data-testid='prospect-email']");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner']");
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForResults() {
        loadingSpinner.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        resultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean areResultsDisplayed() {
        return resultsList.isVisible() && prospectCards.count() > 0;
    }

    public boolean validateProspectsScope() {
        return prospectCards.count() > 0 && cellInfoDisplay.isVisible();
    }

    public String getCellOrFinancialCenterInfo() {
        if (cellInfoDisplay.isVisible()) {
            return cellInfoDisplay.textContent();
        }
        return null;
    }

    public int getProspectCount() {
        return prospectCards.count();
    }

    public String getProspectName(int index) {
        return prospectCards.nth(index).locator("[data-testid='prospect-name']").textContent();
    }

    public String getProspectEmail(int index) {
        return prospectCards.nth(index).locator("[data-testid='prospect-email']").textContent();
    }

    public void scrollToProspect(int index) {
        prospectCards.nth(index).scrollIntoViewIfNeeded();
    }
}