package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class AdvisorDashboardPage {
    private Page page;
    
    // Locators - INFERIDOS (no se pudo acceder a la URL real)
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectResultItems;
    private Locator dashboardContainer;
    private Locator processSelectionScreen;
    private Locator prospectDetailScreen;
    private Locator outsideClickArea;

    public AdvisorDashboardPage(Page page) {
        this.page = page;
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.processSelectionScreen = page.locator("[data-testid='process-selection-screen']");
        this.prospectDetailScreen = page.locator("[data-testid='prospect-detail-screen']");
        this.outsideClickArea = page.locator("[data-testid='dashboard-header']");
    }

    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void enterProspectSearchText(String searchText) {
        prospectSearchInput.click();
        prospectSearchInput.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        try {
            return searchResultsList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getProspectResultsCount() {
        return prospectResultItems.count();
    }

    public void scrollThroughResults() {
        if (prospectResultItems.count() > 0) {
            prospectResultItems.last().scrollIntoViewIfNeeded();
            page.waitForTimeout(500);
        }
    }

    public void clickOutsideSearchArea() {
        outsideClickArea.click();
        page.waitForTimeout(300);
    }

    public boolean isDashboardVisible() {
        try {
            return dashboardContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProcessSelectionVisible() {
        try {
            return processSelectionScreen.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProspectDetailVisible() {
        try {
            return prospectDetailScreen.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}