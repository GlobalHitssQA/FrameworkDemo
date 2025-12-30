package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Prospect Search functionality in Acticenter
 * LOCATORS: INFERIDOS - La URL proporcionada redirige a login de Atlassian,
 * no a la aplicación Acticenter real. Los selectores están basados en
 * mejores prácticas y convenciones semánticas.
 */
public class ProspectSearchPage {
    
    private Page page;
    
    // Locators - INFERIDOS (basados en mejores prácticas)
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator resultProspectName;
    private Locator resultProspectEmail;
    private Locator highlightedText;
    private Locator scrollContainer;
    private Locator scrollBar;
    private Locator noResultsMessage;
    private Locator errorMessage;
    private Locator advisorDashboard;
    private Locator prospectSearchSection;
    private Locator loadingIndicator;
    
    private static final String BASE_URL = "https://acticenter.actinver.com";
    private static final int INITIAL_RESULTS_COUNT = 6;
    private static final int SCROLL_WAIT_TIMEOUT = 3000;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Locators inferidos usando data-testid y selectores semánticos
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.resultProspectName = page.locator("[data-testid='prospect-name']");
        this.resultProspectEmail = page.locator("[data-testid='prospect-email']");
        this.highlightedText = page.locator("[data-testid='prospect-result-item'] strong, [data-testid='prospect-result-item'] .highlight");
        this.scrollContainer = page.locator("[data-testid='prospect-results-container']");
        this.scrollBar = page.locator("[data-testid='prospect-results-container']::-webkit-scrollbar, [data-testid='prospect-results-scrollbar']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }
    
    public void navigateToActicenter() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }
    
    public boolean isAdvisorLoggedIn() {
        return advisorDashboard.isVisible();
    }
    
    public void navigateToProspectSearch() {
        prospectSearchSection.click();
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
    
    public boolean isSearchFieldAvailable() {
        return searchInput.isVisible() && searchInput.isEnabled();
    }
    
    public void enterSearchTerm(String searchTerm) {
        searchInput.clear();
        searchInput.fill(searchTerm);
        // Trigger search after typing more than 2 characters
        if (searchTerm.length() > 2) {
            searchButton.click();
        }
    }
    
    public void waitForSearchResults() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
    
    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }
    
    public boolean areMatchingCharactersHighlighted() {
        return highlightedText.count() > 0;
    }
    
    public boolean areEmailAddressesDisplayed() {
        int resultsCount = searchResultItems.count();
        int emailsCount = resultProspectEmail.count();
        return emailsCount == resultsCount && emailsCount > 0;
    }
    
    public boolean isScrollElementPresent() {
        return scrollContainer.isVisible();
    }
    
    public boolean isScrollBarVisible() {
        // Check if scroll container has scrollable content
        Object scrollHeight = scrollContainer.evaluate("el => el.scrollHeight");
        Object clientHeight = scrollContainer.evaluate("el => el.clientHeight");
        return ((Number) scrollHeight).intValue() > ((Number) clientHeight).intValue();
    }
    
    public boolean isScrollBarInteractive() {
        // Verify scroll container can be scrolled
        Object initialScrollTop = scrollContainer.evaluate("el => el.scrollTop");
        scrollContainer.evaluate("el => el.scrollTop = 10");
        Object newScrollTop = scrollContainer.evaluate("el => el.scrollTop");
        // Reset scroll position
        scrollContainer.evaluate("el => el.scrollTop = 0");
        return ((Number) newScrollTop).intValue() > ((Number) initialScrollTop).intValue();
    }
    
    public void scrollDownResults() {
        scrollContainer.evaluate("el => el.scrollTop += 200");
        page.waitForTimeout(SCROLL_WAIT_TIMEOUT);
    }
    
    public void scrollToEndOfResults() {
        int previousCount = 0;
        int currentCount = getVisibleResultsCount();
        
        while (currentCount > previousCount) {
            previousCount = currentCount;
            scrollContainer.evaluate("el => el.scrollTop = el.scrollHeight");
            page.waitForTimeout(SCROLL_WAIT_TIMEOUT);
            currentCount = getVisibleResultsCount();
        }
    }
    
    public boolean areAllResultsLoaded() {
        // Check if we've reached the end of scrollable content
        Object scrollTop = scrollContainer.evaluate("el => el.scrollTop");
        Object scrollHeight = scrollContainer.evaluate("el => el.scrollHeight");
        Object clientHeight = scrollContainer.evaluate("el => el.clientHeight");
        
        int scrollTopVal = ((Number) scrollTop).intValue();
        int scrollHeightVal = ((Number) scrollHeight).intValue();
        int clientHeightVal = ((Number) clientHeight).intValue();
        
        return (scrollTopVal + clientHeightVal) >= (scrollHeightVal - 5);
    }
    
    public void clickOutsideResults() {
        advisorDashboard.click();
    }
    
    public String getSearchInputValue() {
        return searchInput.inputValue();
    }
    
    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }
    
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible();
    }
    
    public String getErrorMessageText() {
        return errorMessage.textContent();
    }
    
    public void selectProspect(int index) {
        searchResultItems.nth(index).click();
    }
    
    public String getProspectNameAt(int index) {
        return resultProspectName.nth(index).textContent();
    }
    
    public String getProspectEmailAt(int index) {
        return resultProspectEmail.nth(index).textContent();
    }
}

// Clase adicional para el Dashboard
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for Advisor Dashboard in Acticenter
 * LOCATORS: INFERIDOS
 */
public class DashboardPage {
    
    private Page page;
    
    // Locators - INFERIDOS
    private Locator dashboardContainer;
    private Locator dashboardTitle;
    private Locator dashboardContent;
    private Locator activeProspectPanel;
    
    public DashboardPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.dashboardTitle = page.locator("[data-testid='dashboard-title']");
        this.dashboardContent = page.locator("[data-testid='dashboard-content']");
        this.activeProspectPanel = page.locator("[data-testid='active-prospect-panel']");
    }
    
    public String getCurrentDashboardState() {
        return dashboardContent.innerHTML();
    }
    
    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
    
    public String getDashboardTitle() {
        return dashboardTitle.textContent();
    }
    
    public boolean hasActiveProspect() {
        return activeProspectPanel.isVisible();
    }
}