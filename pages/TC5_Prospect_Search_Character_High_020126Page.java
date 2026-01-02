package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator highlightedText;
    private Locator dashboardMenu;
    private Locator prospectSearchOption;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-search-result-item']");
        this.highlightedText = page.locator("strong, b, .highlight, [data-testid='highlighted-text']");
        this.dashboardMenu = page.locator("[data-testid='dashboard-menu']");
        this.prospectSearchOption = page.locator("[data-testid='prospect-search-menu-option']");
    }

    public void navigateToProspectSearch() {
        if (dashboardMenu.isVisible()) {
            dashboardMenu.click();
        }
        if (prospectSearchOption.isVisible()) {
            prospectSearchOption.click();
        }
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void typeInSearchField(String searchText) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchText);
        // Esperar un momento para que se dispare la búsqueda automática
        page.waitForTimeout(500);
    }

    public void clearSearchField() {
        prospectSearchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean areSearchResultsVisible() {
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return searchResultsList.isVisible() && searchResultItems.count() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean areCharactersHighlightedInBold(String searchChars, String prospectName) {
        Locator prospectResult = page.locator(String.format("[data-testid='prospect-search-result-item']:has-text('%s')", prospectName));
        if (!prospectResult.isVisible()) {
            return false;
        }
        
        Locator boldText = prospectResult.locator("strong, b, .highlight");
        if (boldText.count() == 0) {
            return false;
        }
        
        String highlightedContent = boldText.first().textContent();
        return highlightedContent != null && highlightedContent.toLowerCase().contains(searchChars.toLowerCase());
    }

    public boolean areCharactersHighlightedInResults() {
        if (!areSearchResultsVisible()) {
            return false;
        }
        
        // Verificar que al menos un resultado tenga texto resaltado
        int resultsCount = searchResultItems.count();
        for (int i = 0; i < resultsCount; i++) {
            Locator resultItem = searchResultItems.nth(i);
            Locator boldElements = resultItem.locator("strong, b, .highlight");
            if (boldElements.count() > 0) {
                return true;
            }
        }
        return false;
    }

    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }
}