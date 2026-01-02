package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator validationMessage;
    private Locator noResultsMessage;
    private Locator loadingSpinner;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.validationMessage = page.locator("[data-testid='search-validation-message']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.loadingSpinner = page.locator("[data-testid='search-loading-spinner']");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public void enterSearchText(String text) {
        searchInput.fill(text);
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        try {
            return searchResults.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getValidationMessage() {
        try {
            if (validationMessage.isVisible()) {
                return validationMessage.textContent();
            }
        } catch (Exception e) {
            // Validation message not present
        }
        return "";
    }

    public boolean isNoResultsMessageVisible() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void waitForSearchToComplete() {
        try {
            if (loadingSpinner.isVisible()) {
                loadingSpinner.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
            }
        } catch (Exception e) {
            // Loading spinner not present or already hidden
        }
        page.waitForTimeout(1000);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }
}