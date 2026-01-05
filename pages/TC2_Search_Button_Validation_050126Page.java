package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class SearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private String baseUrl = "https://github.com";

    public SearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("input[data-testid='search-input']");
        this.searchButton = page.locator("button[data-testid='search-button']");
    }

    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean hasSearchIcon() {
        Locator icon = searchButton.locator("svg, i, [class*='search'], [class*='magnify']");
        return icon.count() > 0 || searchButton.getAttribute("aria-label").toLowerCase().contains("search");
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public boolean isSearchButtonClickable() {
        try {
            searchButton.hover();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void enterSearchText(String text) {
        searchInput.fill(text);
    }
}