package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.KeyboardModifier;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator dashboard;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator resultsContainer;
    private Locator highlightedText;
    private Locator prospectNames;
    private Locator prospectEmails;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.resultsContainer = page.locator("[data-testid='prospects-results-container']");
        this.highlightedText = page.locator(".highlighted-match, [data-testid='highlighted-text']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
    }
    
    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
    }
    
    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
    
    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }
    
    public void enterSearchQuery(String query) {
        searchField.fill(query);
    }
    
    public void executeSearch() {
        searchField.press("Enter");
    }
    
    public void waitForSearchResults() {
        searchResults.waitFor();
    }
    
    public int getVisibleResultsCount() {
        return resultItems.count();
    }
    
    public boolean hasHighlightedMatches() {
        return highlightedText.count() > 0;
    }
    
    public boolean isScrollAvailable() {
        Object scrollHeight = resultsContainer.evaluate("el => el.scrollHeight");
        Object clientHeight = resultsContainer.evaluate("el => el.clientHeight");
        return ((Number) scrollHeight).doubleValue() > ((Number) clientHeight).doubleValue();
    }
    
    public void scrollToViewMoreResults() {
        resultsContainer.evaluate("el => el.scrollTo(0, el.scrollHeight)");
        page.waitForTimeout(500);
    }
    
    public int getTotalResultsCount() {
        return resultItems.count();
    }
    
    public boolean allResultsHaveNames() {
        int namesCount = prospectNames.count();
        int itemsCount = resultItems.count();
        return namesCount == itemsCount && namesCount > 0;
    }
    
    public boolean allResultsHaveEmails() {
        int emailsCount = prospectEmails.count();
        int itemsCount = resultItems.count();
        return emailsCount == itemsCount && emailsCount > 0;
    }
    
    public boolean hasConsistentFormatting() {
        for (int i = 0; i < resultItems.count(); i++) {
            Locator item = resultItems.nth(i);
            Locator name = item.locator("[data-testid='prospect-name']");
            Locator email = item.locator("[data-testid='prospect-email']");
            if (!name.isVisible() || !email.isVisible()) {
                return false;
            }
        }
        return true;
    }
}