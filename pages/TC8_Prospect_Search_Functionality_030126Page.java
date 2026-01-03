package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchIcon;
    private Locator searchResults;
    private Locator prospectSearchSection;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='prospect-search-icon']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
    }

    public void navigateToProspectSearch() {
        prospectSearchSection.click();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchIconVisible() {
        return searchIcon.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchIcon() {
        searchIcon.click();
        page.waitForTimeout(1000); // Wait for results to load
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void pressEnterOnSearchField() {
        searchField.press("Enter");
        page.waitForTimeout(1000); // Wait for results to load
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getSearchResultsCount() {
        return searchResults.locator("[data-testid='prospect-result-item']").count();
    }
}