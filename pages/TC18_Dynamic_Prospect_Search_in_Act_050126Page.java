package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator firstFiveResults;
    private Locator scrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultItems = page.locator("[data-testid='search-result-item']");
        this.firstFiveResults = page.locator("[data-testid='search-result-item']:nth-child(-n+5)");
        this.scrollContainer = page.locator("[data-testid='results-scroll-container']");
    }

    public void navigateToSearchSection() {
        // Asumiendo navegación interna desde dashboard
        page.navigate("https://actinver.atlassian.net/acticenter/prospect-search");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clearAndEnterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }

    public boolean areResultsVisible() {
        return searchResults.isVisible();
    }

    public int getResultCount() {
        return resultItems.count();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public boolean isScrollContainerVisible() {
        return scrollContainer.isVisible();
    }

    public void scrollToMoreResults() {
        scrollContainer.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    public String getResultTextAtIndex(int index) {
        return resultItems.nth(index).textContent();
    }

    public void selectResultAtIndex(int index) {
        resultItems.nth(index).click();
    }
}