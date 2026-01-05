package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator prospectResultsList;
    private Locator prospectResultItems;
    private Locator scrollIndicator;
    private Locator resultsCounter;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.prospectResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.scrollIndicator = page.locator("[data-testid='results-scroll-indicator']");
        this.resultsCounter = page.locator("[data-testid='results-counter']");
    }

    public void enterSearchCriteria(String searchText) {
        searchInput.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        prospectResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int countVisibleProspects() {
        return prospectResultItems.count();
    }

    public boolean hasScrollIndicator() {
        return scrollIndicator.isVisible();
    }

    public boolean hasResultsCounter() {
        if (resultsCounter.count() > 0 && resultsCounter.isVisible()) {
            String counterText = resultsCounter.textContent();
            return counterText != null && counterText.matches(".*[6-9]\\d*.*|.*\\d{2,}.*");
        }
        return false;
    }
}