package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator loadingIndicator;
    private Locator noResultsMessage;
    private Locator prospectItem;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.loadingIndicator = page.locator("[data-testid='search-loading-spinner']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectItem = page.locator("[data-testid='prospect-list-item']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.clear();
        searchField.fill(text);
    }

    public void appendSearchText(String text) {
        searchField.pressSequentially(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areResultsDisplayed() {
        return resultsList.isVisible() && prospectItem.count() > 0;
    }

    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public boolean isSearchTriggered() {
        page.waitForTimeout(500);
        return isLoadingIndicatorVisible() || areResultsDisplayed() || isNoResultsMessageVisible();
    }

    public int getResultsCount() {
        return prospectItem.count();
    }

    public void selectProspectByIndex(int index) {
        prospectItem.nth(index).click();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }
}