package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {

    private Page page;
    
    // Locators - INFERIDOS (no se pudieron extraer de la aplicación real)
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator advisorDashboard;
    private Locator userProfileIndicator;
    private Locator searchResultsContainer;

    // Constants
    private static final String BASE_URL = "https://acticenter.actinver.com";
    private static final String PROSPECT_SEARCH_PATH = "/advisor/prospects/search";

    public ProspectSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Locators inferidos basados en buenas prácticas y convenciones de naming
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.userProfileIndicator = page.locator("[data-testid='user-profile-indicator']");
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
    }

    public void navigateToProspectSearch() {
        page.navigate(BASE_URL + PROSPECT_SEARCH_PATH);
        page.waitForLoadState();
    }

    public boolean isUserLoggedIn() {
        return userProfileIndicator.isVisible();
    }

    public boolean isSearchScreenDisplayed() {
        return advisorDashboard.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public boolean areSearchResultsDisplayed() {
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(3000));
            return searchResultsList.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public void pressEnterToSearch() {
        searchField.press("Enter");
        page.waitForLoadState();
    }

    public boolean areProspectNamesVisible() {
        return prospectNames.first().isVisible();
    }

    public boolean areProspectEmailsVisible() {
        return prospectEmails.first().isVisible();
    }

    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }

    public int getTotalResultsCount() {
        // This could be retrieved from a counter element or data attribute
        Locator totalCountElement = page.locator("[data-testid='total-results-count']");
        if (totalCountElement.isVisible()) {
            String countText = totalCountElement.textContent();
            try {
                return Integer.parseInt(countText.replaceAll("[^0-9]", ""));
            } catch (NumberFormatException e) {
                return searchResultItems.count();
            }
        }
        return searchResultItems.count();
    }

    public boolean isScrollEnabled() {
        // Check if the results container has scrollable content
        String overflow = searchResultsContainer.evaluate(
            "el => window.getComputedStyle(el).overflow").toString();
        boolean hasOverflow = overflow.contains("auto") || overflow.contains("scroll");
        
        // Also check if scrollHeight > clientHeight
        Boolean isScrollable = (Boolean) searchResultsContainer.evaluate(
            "el => el.scrollHeight > el.clientHeight");
        
        return hasOverflow && Boolean.TRUE.equals(isScrollable);
    }

    public String getProspectNameAtIndex(int index) {
        return prospectNames.nth(index).textContent();
    }

    public String getProspectEmailAtIndex(int index) {
        return prospectEmails.nth(index).textContent();
    }

    public void clickOnProspectAtIndex(int index) {
        prospectNames.nth(index).click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }
}