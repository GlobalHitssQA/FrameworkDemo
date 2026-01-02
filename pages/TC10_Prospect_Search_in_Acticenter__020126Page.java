package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos siguiendo mejores prácticas
    private Locator searchFunctionality;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator highlightedMatches;
    private Locator selectedProspect;
    private Locator workflowContinuation;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos con selectores robustos
        this.searchFunctionality = page.locator("[data-testid='prospect-search-section']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedMatches = page.locator(".highlighted-match, [data-testid='highlighted-text']");
        this.selectedProspect = page.locator("[data-testid='prospect-result-item'].selected, [data-testid='prospect-result-item'][aria-selected='true']");
        this.workflowContinuation = page.locator("[data-testid='workflow-agas-43'], [data-workflow='AGAS-43']");
    }

    public void accessSearchFunctionality() {
        searchFunctionality.click();
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldAvailable() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.clear();
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean areSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public int getResultsCount() {
        return resultItems.count();
    }

    public int getDisplayedResultsCount() {
        int count = 0;
        for (int i = 0; i < resultItems.count() && i < 5; i++) {
            if (resultItems.nth(i).isVisible()) {
                count++;
            }
        }
        return count;
    }

    public boolean areMatchesHighlighted() {
        return highlightedMatches.count() > 0 && highlightedMatches.first().isVisible();
    }

    public void selectFirstProspect() {
        resultItems.first().click();
    }

    public void selectProspectByIndex(int index) {
        resultItems.nth(index).click();
    }

    public boolean isProspectSelected() {
        return selectedProspect.isVisible();
    }

    public boolean isWorkflowContinued() {
        try {
            workflowContinuation.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(5000));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getSelectedProspectName() {
        return selectedProspect.locator("[data-testid='prospect-name']").textContent();
    }

    public String getSelectedProspectEmail() {
        return selectedProspect.locator("[data-testid='prospect-email']").textContent();
    }
}