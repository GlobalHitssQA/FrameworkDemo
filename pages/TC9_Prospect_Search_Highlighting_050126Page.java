package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator highlightedText;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.highlightedText = page.locator(".highlight, [class*='highlighted'], strong, mark");
    }

    public void navigateToSearchField() {
        searchField.scrollIntoViewIfNeeded();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.clear();
        searchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isResultsListVisible() {
        return resultsList.isVisible();
    }

    public int getProspectCount() {
        return prospectItems.count();
    }

    public boolean areHighlightedElementsPresent() {
        return highlightedText.count() > 0;
    }

    public boolean verifyConsistentHighlighting(String searchQuery) {
        int prospectCount = prospectItems.count();
        if (prospectCount == 0) {
            return false;
        }

        String lowerQuery = searchQuery.toLowerCase();
        int prospectsWithHighlighting = 0;

        for (int i = 0; i < prospectCount; i++) {
            Locator prospect = prospectItems.nth(i);
            String prospectText = prospect.textContent().toLowerCase();
            
            if (prospectText.contains(lowerQuery)) {
                Locator highlightedInProspect = prospect.locator(".highlight, [class*='highlighted'], strong, mark");
                if (highlightedInProspect.count() > 0) {
                    prospectsWithHighlighting++;
                }
            }
        }

        return prospectsWithHighlighting > 0;
    }

    public List<String> getHighlightedTexts() {
        return highlightedText.allTextContents();
    }
}