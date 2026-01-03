package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectNameFields;
    private Locator emailKeyFields;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameFields = page.locator("[data-testid='prospect-name']");
        this.emailKeyFields = page.locator("[data-testid='prospect-email']");
    }

    public boolean isSearchScreenVisible() {
        return searchInput.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForSelector("[data-testid='prospect-result-item']", new Page.WaitForSelectorOptions().setTimeout(5000));
    }

    public int getDisplayedResultsCount() {
        return searchResults.count();
    }

    public boolean isProspectNameVisible(int index) {
        return prospectNameFields.nth(index).isVisible() && 
               !prospectNameFields.nth(index).textContent().trim().isEmpty();
    }

    public boolean isEmailKeyVisible(int index) {
        return emailKeyFields.nth(index).isVisible() && 
               !emailKeyFields.nth(index).textContent().trim().isEmpty();
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}