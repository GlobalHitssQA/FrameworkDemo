package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultsList;
    private Locator noResultsMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferidos: selectores basados en buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='prospect-results-container']");
        this.resultsList = page.locator("[data-testid='prospect-results-list'] > div");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
        try {
            resultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
        } catch (Exception e) {
            // Results may be empty
        }
    }

    public boolean isProspectInResults(String prospectName) {
        int resultsCount = resultsList.count();
        if (resultsCount == 0) {
            return false;
        }
        for (int i = 0; i < resultsCount; i++) {
            String resultText = resultsList.nth(i).textContent();
            if (resultText != null && resultText.contains(prospectName)) {
                return true;
            }
        }
        return false;
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }
}