package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator emailKeyFields;
    private Locator prospectCards;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-results-list']");
        this.emailKeyFields = page.locator("[data-testid='prospect-email-key']");
        this.prospectCards = page.locator("[data-testid='prospect-card']");
    }

    public boolean isSearchScreenVisible() {
        return searchInput.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areResultsDisplayed() {
        return searchResults.isVisible() && prospectCards.count() > 0;
    }

    public boolean allResultsHaveEmailKey() {
        int resultCount = prospectCards.count();
        int emailKeyCount = emailKeyFields.count();
        return resultCount > 0 && resultCount == emailKeyCount;
    }

    public boolean validateNoEmptyEmailKeys() {
        List<String> emailKeys = emailKeyFields.allTextContents();
        return emailKeys.stream().noneMatch(email -> email == null || email.trim().isEmpty());
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-menu']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}