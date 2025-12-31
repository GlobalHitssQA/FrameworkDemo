package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Pitchbook section of Acticenter platform.
 * Contains prospect search functionality elements.
 * 
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (requiere autenticación).
 * Los locators están basados en mejores prácticas y convenciones semánticas.
 */
public class PitchbookPage {

    private final Page page;
    
    // Search field locators (INFERIDOS)
    private final Locator prospectSearchField;
    private final Locator searchButton;
    private final Locator searchResultsContainer;
    private final Locator searchResultItems;
    private final Locator prospectNameInResults;
    private final Locator prospectEmailInResults;
    private final Locator searchLoadingIndicator;
    private final Locator noResultsMessage;
    private final Locator clearSearchButton;

    public PitchbookPage(Page page) {
        this.page = page;
        
        // LOCATORS INFERIDOS - basados en convenciones semánticas y mejores prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsContainer = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-search-result-item']");
        this.prospectNameInResults = page.locator("[data-testid='prospect-result-name']");
        this.prospectEmailInResults = page.locator("[data-testid='prospect-result-email']");
        this.searchLoadingIndicator = page.locator("[data-testid='search-loading-indicator']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
    }

    /**
     * Waits for the Pitchbook page to fully load
     */
    public void waitForPageLoad() {
        prospectSearchField.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    /**
     * Checks if the prospect search field is visible
     * @return true if the search field is visible
     */
    public boolean isProspectSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    /**
     * Checks if the prospect search field is enabled for input
     * @return true if the search field is enabled
     */
    public boolean isProspectSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    /**
     * Types text into the prospect search field
     * @param searchText the text to type
     */
    public void typeInProspectSearchField(String searchText) {
        prospectSearchField.fill(searchText);
    }

    /**
     * Appends additional characters to the existing search text
     * @param additionalText the text to append
     */
    public void appendToProspectSearchField(String additionalText) {
        prospectSearchField.press("End");
        prospectSearchField.type(additionalText);
    }

    /**
     * Clears the prospect search field
     */
    public void clearProspectSearchField() {
        if (clearSearchButton.isVisible()) {
            clearSearchButton.click();
        } else {
            prospectSearchField.clear();
        }
    }

    /**
     * Clicks the search button to trigger search manually
     */
    public void clickSearchButton() {
        searchButton.click();
    }

    /**
     * Waits for the search to be triggered (loading indicator or results)
     */
    public void waitForSearchToTrigger() {
        // Wait for either loading indicator to appear and disappear, or results to show
        page.waitForCondition(() -> 
            searchLoadingIndicator.isVisible() || 
            searchResultsContainer.isVisible(),
            new Page.WaitForConditionOptions().setTimeout(5000)
        );
        
        // If loading indicator is visible, wait for it to disappear
        if (searchLoadingIndicator.isVisible()) {
            searchLoadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(10000));
        }
    }

    /**
     * Checks if search is currently in progress
     * @return true if loading indicator is visible
     */
    public boolean isSearchInProgress() {
        return searchLoadingIndicator.isVisible();
    }

    /**
     * Checks if search results are displayed
     * @return true if results container is visible and has items
     */
    public boolean areSearchResultsDisplayed() {
        return searchResultsContainer.isVisible() && searchResultItems.count() > 0;
    }

    /**
     * Checks if prospect name is visible in the search results
     * @return true if at least one prospect name is visible
     */
    public boolean isProspectNameVisibleInResults() {
        return prospectNameInResults.first().isVisible();
    }

    /**
     * Checks if prospect email is visible in the search results
     * @return true if at least one prospect email is visible
     */
    public boolean isProspectEmailVisibleInResults() {
        return prospectEmailInResults.first().isVisible();
    }

    /**
     * Gets the count of search results
     * @return the number of search result items
     */
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    /**
     * Gets the text from a specific search result's name field
     * @param index the index of the result (0-based)
     * @return the prospect name text
     */
    public String getProspectNameAtIndex(int index) {
        return prospectNameInResults.nth(index).textContent();
    }

    /**
     * Gets the text from a specific search result's email field
     * @param index the index of the result (0-based)
     * @return the prospect email text
     */
    public String getProspectEmailAtIndex(int index) {
        return prospectEmailInResults.nth(index).textContent();
    }

    /**
     * Selects a prospect from the search results by index
     * @param index the index of the result to select (0-based)
     */
    public void selectProspectAtIndex(int index) {
        searchResultItems.nth(index).click();
    }

    /**
     * Checks if the no results message is displayed
     * @return true if no results message is visible
     */
    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }

    /**
     * Gets the current value in the search field
     * @return the current search field value
     */
    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }
}

// Additional Page Object for Acticenter Dashboard
package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for Acticenter Dashboard.
 * 
 * LOCATORS: INFERIDOS - No se pudo acceder a la aplicación real (requiere autenticación).
 */
public class ActicenterDashboardPage {

    private final Page page;
    private static final String DASHBOARD_URL = "https://acticenter.actinver.com/dashboard";
    
    // Dashboard locators (INFERIDOS)
    private final Locator dashboardContainer;
    private final Locator pitchbookMenuLink;
    private final Locator userProfileIcon;
    private final Locator advisorWelcomeMessage;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        
        // LOCATORS INFERIDOS
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.pitchbookMenuLink = page.locator("[data-testid='pitchbook-menu-link']");
        this.userProfileIcon = page.locator("[data-testid='user-profile-icon']");
        this.advisorWelcomeMessage = page.locator("[data-testid='advisor-welcome-message']");
    }

    /**
     * Navigates to the Acticenter dashboard
     */
    public void navigateToDashboard() {
        page.navigate(DASHBOARD_URL);
        dashboardContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(15000));
    }

    /**
     * Verifies that the user is logged in
     */
    public void verifyUserIsLoggedIn() {
        userProfileIcon.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    /**
     * Checks if the dashboard is displayed
     * @return true if dashboard container is visible
     */
    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    /**
     * Clicks on the Pitchbook menu link
     */
    public void clickPitchbookMenu() {
        pitchbookMenuLink.click();
    }

    /**
     * Gets the welcome message text
     * @return the welcome message
     */
    public String getWelcomeMessage() {
        return advisorWelcomeMessage.textContent();
    }
}