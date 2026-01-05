package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectResultItems;
    private Locator prospectName;
    private Locator prospectEmail;
    private Locator firstProspectEntry;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectName = page.locator("[data-testid='prospect-name']").first();
        this.prospectEmail = page.locator("[data-testid='prospect-email']").first();
        this.firstProspectEntry = page.locator("[data-testid='prospect-result-item']").first();
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void enterProspectName(String prospectName) {
        prospectSearchField.fill(prospectName);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public boolean isProspectNameDisplayed() {
        return prospectName.isVisible();
    }

    public boolean isProspectEmailDisplayed() {
        return prospectEmail.isVisible();
    }

    public int getProspectResultCount() {
        return prospectResultItems.count();
    }

    public boolean hasUniqueProspectIdentifiers() {
        List<String> names = prospectResultItems.locator("[data-testid='prospect-name']").allTextContents();
        List<String> emails = prospectResultItems.locator("[data-testid='prospect-email']").allTextContents();
        return !names.isEmpty() && !emails.isEmpty();
    }

    public boolean isFirstProspectSelectable() {
        return firstProspectEntry.isEnabled() && firstProspectEntry.isVisible();
    }
}