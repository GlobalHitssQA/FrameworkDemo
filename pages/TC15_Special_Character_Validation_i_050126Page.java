package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator validationMessage;
    private Locator searchResultsList;
    private Locator prospectItem;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.validationMessage = page.locator("[data-testid='validation-message']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.prospectItem = page.locator("[data-testid='prospect-item']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public boolean isValidationMessageVisible() {
        try {
            validationMessage.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(5000));
            return validationMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getValidationMessageText() {
        return validationMessage.textContent();
    }

    public boolean isSearchResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getSearchResultsCount() {
        return prospectItem.count();
    }

    public void selectProspectByIndex(int index) {
        prospectItem.nth(index).click();
    }
}