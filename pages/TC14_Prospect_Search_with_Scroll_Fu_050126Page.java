package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.ScrollBehavior;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultItems;
    private Locator dashboard;
    private Locator scrollIndicator;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='prospect-results-container']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.dashboard = page.locator("[data-testid='actinver-dashboard']");
        this.scrollIndicator = page.locator("[data-testid='results-scroll-indicator']");
    }
    
    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/dashboard");
        page.waitForLoadState();
    }
    
    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
    
    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public void waitForResults() {
        resultsContainer.waitFor();
    }
    
    public int getVisibleResultsCount() {
        return resultItems.count();
    }
    
    public boolean isScrollAvailable() {
        return resultsContainer.evaluate("element => element.scrollHeight > element.clientHeight").toString().equals("true") 
            || scrollIndicator.isVisible();
    }
    
    public void scrollResults() {
        resultsContainer.evaluate("element => element.scrollTop = element.scrollHeight");
        page.waitForTimeout(1000);
    }
    
    public int getTotalResultsCount() {
        return resultItems.count();
    }
    
    public boolean isResultVisible(int index) {
        Locator nthResult = resultItems.nth(index - 1);
        return nthResult.isVisible();
    }
}