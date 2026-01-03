package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchIcon;
    private Locator searchInterface;
    private Locator resultsContainer;
    private Locator resultsList;
    private Locator noResultsMessage;
    private Locator prospectName;
    private Locator prospectEmail;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='search-icon-button']");
        this.searchInterface = page.locator("[data-testid='prospect-search-interface']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospects-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectName = page.locator("[data-testid='prospect-name']");
        this.prospectEmail = page.locator("[data-testid='prospect-email']");
    }

    public void navigateToSearchScreen() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchInterfaceVisible() {
        return searchInterface.isVisible();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchIconVisible() {
        return searchIcon.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchIcon() {
        searchIcon.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
        page.waitForSelector("[data-testid='search-results-container'], [data-testid='no-results-message']", 
            new Page.WaitForSelectorOptions().setTimeout(10000));
    }

    public boolean isResultsContainerVisible() {
        return resultsContainer.isVisible();
    }

    public boolean hasSearchResults() {
        try {
            return resultsList.isVisible() && resultsList.locator("[data-testid='prospect-item']").count() > 0;
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

    public String getProspectName(int index) {
        return prospectName.nth(index).textContent();
    }

    public String getProspectEmail(int index) {
        return prospectEmail.nth(index).textContent();
    }
}