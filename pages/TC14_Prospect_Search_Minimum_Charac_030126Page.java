package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    private Locator dashboardContainer;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectNameField = page.locator("[data-testid='prospect-name']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email']");
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
    }
    
    public void navigateToSearchScreen() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }
    
    public boolean isSearchScreenVisible() {
        return dashboardContainer.isVisible();
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public void enterSearchText(String text) {
        searchInput.fill(text);
    }
    
    public void appendSearchText(String text) {
        searchInput.type(text);
    }
    
    public String getSearchInputValue() {
        return searchInput.inputValue();
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
    
    public boolean isNoResultsMessageVisible() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public void waitForSearchToExecute() {
        page.waitForTimeout(1000);
        try {
            page.waitForSelector("[data-testid='search-results-list'], [data-testid='no-results-message']", 
                new Page.WaitForSelectorOptions().setTimeout(5000));
        } catch (Exception e) {
            // Search may have completed without results
        }
    }
    
    public boolean hasSearchExecuted() {
        return areSearchResultsVisible() || isNoResultsMessageVisible();
    }
    
    public String getFirstProspectName() {
        if (areSearchResultsVisible()) {
            return prospectNameField.first().textContent();
        }
        return null;
    }
    
    public String getFirstProspectEmail() {
        if (areSearchResultsVisible()) {
            return prospectEmailField.first().textContent();
        }
        return null;
    }
}