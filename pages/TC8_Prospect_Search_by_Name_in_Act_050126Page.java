package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;
import java.util.ArrayList;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo buenas prácticas
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectResultItems;
    private Locator highlightedNameText;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas de naming
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedNameText = page.locator(".prospect-name-highlight, [data-testid='highlighted-text']");
        this.loadingIndicator = page.locator(".loading-spinner, [data-testid='loading-indicator']");
    }

    public void navigateToSearchField() {
        prospectSearchField.scrollIntoViewIfNeeded();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void enterProspectName(String name) {
        prospectSearchField.clear();
        prospectSearchField.fill(name);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        // Wait for loading to disappear if present
        if (loadingIndicator.count() > 0) {
            loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        }
        // Wait for results to appear
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areResultsVisible() {
        return searchResultsList.isVisible();
    }

    public int getResultCount() {
        return prospectResultItems.count();
    }

    public List<String> getAllProspectNames() {
        List<String> names = new ArrayList<>();
        int count = prospectResultItems.count();
        
        for (int i = 0; i < count; i++) {
            Locator nameLocator = prospectResultItems.nth(i).locator(".prospect-name, [data-testid='prospect-name']");
            if (nameLocator.count() > 0) {
                names.add(nameLocator.textContent().trim());
            }
        }
        
        return names;
    }

    public boolean isNameHighlighted() {
        return highlightedNameText.count() > 0 && highlightedNameText.first().isVisible();
    }

    public void selectProspectByName(String name) {
        Locator prospectItem = page.locator(
            String.format("[data-testid='prospect-result-item']:has-text('%s')", name)
        );
        prospectItem.click();
    }

    public void scrollToResult(int index) {
        if (index < getResultCount()) {
            prospectResultItems.nth(index).scrollIntoViewIfNeeded();
        }
    }
}